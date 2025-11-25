
import React, { useState, useCallback, useMemo } from 'react';
import { User, Venue, Match, ChatMessage } from './types';
import { USERS, VENUES, COUPONS } from './constants';
import { getInteraction, getChatReply } from './services/geminiService';
import VenueSelector from './components/VenueSelector';
import MatchRadar from './components/MatchRadar';
import Header from './components/Header';
import MatchNotification from './components/MatchNotification';
import MatchedList from './components/MatchedList';
import SelfieCheckin from './components/SelfieCheckin';
import PreferenceQuestionnaire from './components/PreferenceQuestionnaire';
import ChatInterface from './components/ChatInterface';
import Introduction from './components/Introduction';
import { GlobalStylesInjector } from './components/Icons';

type CheckinState = 'onboarding' | 'selectingVenue' | 'takingSelfie' | 'answeringQuestions' | 'inVenue';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]);
  const [currentVenue, setCurrentVenue] = useState<Venue | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [checkinState, setCheckinState] = useState<CheckinState>('onboarding');
  
  const [swipedIds, setSwipedIds] = useState<Set<number>>(new Set());
  const [blockedIds, setBlockedIds] = useState<Set<number>>(new Set());
  const [matches, setMatches] = useState<Match[]>([]);
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  
  // Chat State
  const [activeMatchId, setActiveMatchId] = useState<number | null>(null);
  const [isLoadingInteraction, setIsLoadingInteraction] = useState(false);
  const [isGhostMode, setIsGhostMode] = useState(false);
  const [showMatchedList, setShowMatchedList] = useState(false);

  const potentialMatches = useMemo(() => {
    if (!currentVenue) return [];
    
    const candidates = USERS.filter(
      (user) =>
        user.currentVenueId === currentVenue.id &&
        user.id !== currentUser.id &&
        !swipedIds.has(user.id) &&
        !blockedIds.has(user.id)
    );

    // Sort candidates: users with more shared tags come first
    return candidates.sort((a, b) => {
        const aShared = a.tags?.filter(t => currentUser.tags?.includes(t)).length || 0;
        const bShared = b.tags?.filter(t => currentUser.tags?.includes(t)).length || 0;
        return bShared - aShared;
    });
  }, [currentVenue, currentUser.id, swipedIds, blockedIds, currentUser.tags]);

  const activeMatch = useMemo(() => 
    matches.find(m => m.user.id === activeMatchId) || null
  , [matches, activeMatchId]);

  const handleOnboardingComplete = (data: { name: string; age: number; bio: string }) => {
    setCurrentUser(prev => ({
      ...prev,
      name: data.name,
      age: data.age,
      bio: data.bio,
      // Keep default image until selfie
    }));
    setCheckinState('selectingVenue');
  };

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setCheckinState('takingSelfie');
  };

  const handleSelfieConfirm = (imageDataUrl: string) => {
    setCurrentUser(prevUser => ({ ...prevUser, liveImageUrl: imageDataUrl }));
    setCheckinState('answeringQuestions');
  };

  const handleQuestionsComplete = (tags: string[]) => {
    const validTags = tags.filter(t => t !== "Skipped");
    setCurrentUser(prevUser => ({ ...prevUser, tags: validTags }));
    setCurrentVenue(selectedVenue);
    setCheckinState('inVenue');
    setSwipedIds(new Set());
    setBlockedIds(new Set());
    setMatches([]);
    setShowMatchedList(false);
  };
  
  const handleSelfieCancel = () => {
      setSelectedVenue(null);
      setCheckinState('selectingVenue');
  }

  const handleSwipe = useCallback(async (swipedUser: User, action: 'like' | 'pass') => {
    setSwipedIds((prev) => new Set(prev).add(swipedUser.id));

    if (action === 'like') {
      if (Math.random() > 0.5) {
        setIsLoadingInteraction(true);
        const interaction = await getInteraction();
        const coupon = COUPONS[Math.floor(Math.random() * COUPONS.length)];
        const newMatch: Match = { 
          user: swipedUser, 
          interaction, 
          coupon,
          timestamp: new Date(),
          messages: [] 
        };
        setMatches((prev) => [newMatch, ...prev]);
        setLastMatch(newMatch);
        setIsLoadingInteraction(false);
      }
    }
  }, []);

  const handleRefreshInteraction = async (match: Match) => {
      try {
          const newInteraction = await getInteraction();
          const updatedMatch = { ...match, interaction: newInteraction };
          
          setMatches(prev => prev.map(m => m.user.id === match.user.id ? updatedMatch : m));
          
          if (lastMatch?.user.id === match.user.id) {
              setLastMatch(updatedMatch);
          }
      } catch (error) {
          console.error("Failed to refresh interaction", error);
      }
  };

  const handleGoBack = () => {
    setCurrentVenue(null);
    setSelectedVenue(null);
    setCheckinState('selectingVenue');
    // Keep user data, but reset venue specific stuff if needed
  };
  
  const handleToggleMatchedList = () => {
    setShowMatchedList(prev => !prev);
  }

  const handleSelectMatch = (match: Match) => {
      setActiveMatchId(match.user.id);
      setShowMatchedList(false); // Close the list as chat opens
  };

  const handleBlockUser = (userId: number) => {
    if (window.confirm("Are you sure you want to block this user? You won't see them again.")) {
      setBlockedIds(prev => new Set(prev).add(userId));
      setMatches(prev => prev.filter(m => m.user.id !== userId));
      
      // If we are blocking the person we are currently chatting with
      if (activeMatchId === userId) {
          setActiveMatchId(null);
          // Return the user to the matches list so they aren't left stranded
          setShowMatchedList(true);
      }

      if (lastMatch?.user.id === userId) {
          setLastMatch(null);
      }
    }
  };

  const handleReportUser = (userId: number) => {
    const reason = window.prompt("What is the reason for reporting this user?");
    if (reason) {
      alert("Report submitted. Thank you for helping keep MatchSpot safe.");
      // In a real app, this would send an API request.
    }
  };

  const handleSendMessage = async (text: string) => {
      if (!activeMatchId) return;

      const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: text,
          timestamp: new Date(),
          isSelf: true
      };

      // Update UI immediately with user message
      setMatches(prevMatches => prevMatches.map(m => 
          m.user.id === activeMatchId 
            ? { ...m, messages: [...m.messages, newMessage] }
            : m
      ));

      // Simulate AI response
      try {
        const targetMatch = matches.find(m => m.user.id === activeMatchId);
        if (targetMatch) {
            // Small delay for realism
            setTimeout(async () => {
                const replyText = await getChatReply(targetMatch.user, text);
                const replyMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    text: replyText,
                    timestamp: new Date(),
                    isSelf: false
                };
                
                setMatches(prevMatches => prevMatches.map(m => 
                    m.user.id === activeMatchId 
                        ? { ...m, messages: [...m.messages, replyMessage] }
                        : m
                ));
            }, 1500 + Math.random() * 1000);
        }
      } catch (e) {
          console.error("Failed to get AI reply");
      }
  };
  
  const renderContent = () => {
    switch (checkinState) {
        case 'onboarding':
            return <Introduction onComplete={handleOnboardingComplete} />;
        case 'selectingVenue':
            return <VenueSelector venues={VENUES} onSelect={handleVenueSelect} />;
        case 'takingSelfie':
            return <SelfieCheckin 
                        venueName={selectedVenue!.name}
                        onConfirm={handleSelfieConfirm} 
                        onCancel={handleSelfieCancel}
                    />;
        case 'answeringQuestions':
            return <PreferenceQuestionnaire onComplete={handleQuestionsComplete} />;
        case 'inVenue':
             return (
                <>
                    <MatchRadar
                        users={potentialMatches}
                        onSwipe={handleSwipe}
                        isLoadingInteraction={isLoadingInteraction}
                        currentUserTags={currentUser.tags}
                        onBlock={handleBlockUser}
                        onReport={handleReportUser}
                    />
                    <MatchedList 
                        matches={matches} 
                        isOpen={showMatchedList}
                        onClose={() => setShowMatchedList(false)}
                        onSelectMatch={handleSelectMatch}
                    />
                    {activeMatch && (
                        <ChatInterface 
                            match={activeMatch}
                            onClose={() => setActiveMatchId(null)}
                            onSendMessage={handleSendMessage}
                            onRefreshInteraction={() => handleRefreshInteraction(activeMatch)}
                            onBlock={() => handleBlockUser(activeMatch.user.id)}
                            onReport={() => handleReportUser(activeMatch.user.id)}
                        />
                    )}
                </>
            );
        default:
            return <Introduction onComplete={handleOnboardingComplete} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <GlobalStylesInjector />
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/40 via-gray-900 to-pink-900/30"></div>
      <div className="relative z-10 flex flex-col h-screen">
        {checkinState !== 'onboarding' && (
            <Header 
              user={currentUser} 
              venue={currentVenue}
              onBack={currentVenue && !activeMatch ? handleGoBack : undefined}
              isGhostMode={isGhostMode}
              onToggleGhostMode={() => setIsGhostMode(prev => !prev)}
              matchCount={matches.length}
              onShowMatches={handleToggleMatchedList}
            />
        )}
        <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
            {renderContent()}
        </main>
      </div>

      {lastMatch && (
        <MatchNotification
          match={lastMatch}
          currentUser={currentUser}
          onClose={() => setLastMatch(null)}
          onViewMatches={() => {
            setLastMatch(null);
            setShowMatchedList(true);
          }}
          onRefreshInteraction={() => handleRefreshInteraction(lastMatch)}
        />
      )}
    </div>
  );
};

export default App;

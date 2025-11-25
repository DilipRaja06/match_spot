
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import UserProfileCard from './UserProfileCard';
import { PassIcon, LikeIcon, SparklesIcon } from './Icons';

interface MatchRadarProps {
  users: User[];
  onSwipe: (user: User, action: 'like' | 'pass') => void;
  isLoadingInteraction: boolean;
  currentUserTags?: string[];
  onBlock: (userId: number) => void;
  onReport: (userId: number) => void;
}

const MatchRadar: React.FC<MatchRadarProps> = ({ users, onSwipe, isLoadingInteraction, currentUserTags, onBlock, onReport }) => {
  // Removed currentIndex state as users list is dynamically filtered by parent
  const [swipeAction, setSwipeAction] = useState<'like' | 'pass' | null>(null);

  // Since parent filters swiped/blocked users, users[0] is always the current card
  const activeUsers = users;

  const handleSwipeAction = (action: 'like' | 'pass') => {
    if (activeUsers.length === 0) return;
    setSwipeAction(action);
    setTimeout(() => {
      onSwipe(activeUsers[0], action);
      // Removed setCurrentIndex increment
      setSwipeAction(null);
    }, 500); // Increased duration to match new elastic animation
  };

  const swipeClass = useMemo(() => {
    if (!swipeAction) return '';
    if (swipeAction === 'like') return 'animate-swipe-out-right';
    return 'animate-swipe-out-left';
  }, [swipeAction]);

  if (isLoadingInteraction) {
    return (
      <div className="text-center p-8 bg-gray-800/50 rounded-lg shadow-xl animate-pulse">
        <SparklesIcon className="w-16 h-16 text-pink-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold">Creating a spark...</h3>
        <p className="text-gray-300">Generating a unique interaction!</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-sm flex flex-col items-center justify-center relative">
      <div className="relative w-full aspect-[3/5] mb-6">
        {activeUsers.length > 0 ? (
          activeUsers.map((user, index) => (
            <div
              key={user.id}
              className={`absolute top-0 left-0 w-full h-full transition-elastic duration-500 ${index === 0 ? swipeClass : ''}`}
              style={{
                transform: `translateY(${Math.min(index * 12, 24)}px) scale(${1 - Math.min(index * 0.05, 0.1)})`,
                zIndex: activeUsers.length - index,
                opacity: 1 - Math.min(index * 0.15, 0.3),
              }}
            >
              <UserProfileCard 
                user={user} 
                isActive={index === 0} 
                highlightTags={currentUserTags}
                onBlock={() => onBlock(user.id)}
                onReport={() => onReport(user.id)}
              />
            </div>
          )).slice(0, 3).reverse() // Show up to 3 cards stacked
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800/50 rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">That's everyone for now!</h3>
            <p className="text-gray-300">More people might check in soon. Why not grab a drink or try the dance floor?</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => handleSwipeAction('pass')}
          disabled={activeUsers.length === 0 || !!swipeAction}
          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-red-400 hover:bg-red-400/30 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:transform-none"
        >
          <PassIcon />
        </button>
        <button
          onClick={() => handleSwipeAction('like')}
          disabled={activeUsers.length === 0 || !!swipeAction}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:transform-none"
        >
          <LikeIcon />
        </button>
      </div>
    </div>
  );
};

export default MatchRadar;

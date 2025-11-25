
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { InfoIcon, ChevronDownIcon, BlockIcon, FlagIcon, CheckIcon } from './Icons';

interface UserProfileCardProps {
  user: User;
  isActive?: boolean;
  highlightTags?: string[];
  onBlock: () => void;
  onReport: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, isActive = false, highlightTags, onBlock, onReport }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScoreGuide, setShowScoreGuide] = useState(false);
  
  // Calculate match count just for checking if we should show a "Match" badge
  const sharedTagsCount = highlightTags ? (user.tags?.filter(t => highlightTags.includes(t)).length || 0) : 0;

  // Calculate Profile Completeness Score logic
  const scoreBreakdown = useMemo(() => {
    return {
      basic: { points: 20, met: !!(user.name && user.age) },
      bio: { points: 30, met: !!(user.bio && user.bio.length > 10) },
      tags: { points: 30, met: !!(user.tags && user.tags.length > 0) },
      photo: { 
        points: user.liveImageUrl ? 20 : (user.imageUrl ? 10 : 0), 
        met: !!user.imageUrl,
        isLive: !!user.liveImageUrl
      }
    };
  }, [user]);

  const completenessScore = useMemo(() => {
    let score = 0;
    if (scoreBreakdown.basic.met) score += scoreBreakdown.basic.points;
    if (scoreBreakdown.bio.met) score += scoreBreakdown.bio.points;
    if (scoreBreakdown.tags.met) score += scoreBreakdown.tags.points;
    score += scoreBreakdown.photo.points;
    return Math.min(score, 100);
  }, [scoreBreakdown]);

  const getProgressColor = (score: number) => {
      if (score < 50) return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      if (score < 80) return 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]';
      return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
  };

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl relative select-none bg-gray-900 border border-gray-800 group ${isActive ? 'animate-rubber-band-entry' : ''}`}>
      {/* Image Container */}
      <div className="w-full h-full overflow-hidden bg-black">
        <img
          src={user.liveImageUrl || user.imageUrl}
          alt={user.name}
          className={`w-full h-full object-cover transition-all duration-700 will-change-transform ${
            isActive && !isExpanded ? 'animate-subtle-zoom' : 'scale-100'
          } ${isExpanded ? 'scale-110 blur-md brightness-50' : ''}`}
        />
      </div>
      
      {/* Overlay Gradient / Background */}
      <div className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
        isExpanded ? 'bg-black/60' : 'bg-gradient-to-t from-black/90 via-black/50 to-transparent'
      }`}></div>
      
      {/* Shared Interests Badge */}
      {sharedTagsCount > 0 && isActive && !isExpanded && (
          <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pop-in z-20">
              {sharedTagsCount} Shared {sharedTagsCount === 1 ? 'Vibe' : 'Vibes'}
          </div>
      )}

      {/* Action Buttons (Block & Report) */}
      {isActive && (
          <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onBlock();
                }}
                className="p-2 rounded-full bg-black/40 hover:bg-red-500/80 text-white/70 hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-110"
                title="Block User"
            >
                <BlockIcon className="w-5 h-5" />
            </button>
             <button
                onClick={(e) => {
                    e.stopPropagation();
                    onReport();
                }}
                className="p-2 rounded-full bg-black/40 hover:bg-yellow-500/80 text-white/70 hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-110"
                title="Report User"
            >
                <FlagIcon className="w-5 h-5" />
            </button>
          </div>
      )}

      {/* Content Container */}
      <div
        className={`absolute w-full transition-all duration-500 ease-out flex flex-col justify-end z-10 ${
          isExpanded ? 'inset-0 p-8 overflow-y-auto' : 'bottom-0 left-0 p-6 translate-y-0'
        } ${
          !isActive && !isExpanded ? 'translate-y-8 opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`${isExpanded ? 'h-full flex flex-col justify-center' : ''}`}>
            <h2 className="text-3xl font-bold drop-shadow-lg text-white">
                {user.name}, {user.age}
            </h2>
            
            {/* Tags / Preferences Section */}
            {user.tags && user.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 mb-2">
                    {user.tags.map((tag, idx) => {
                        const isShared = highlightTags?.includes(tag);
                        return (
                            <span 
                                key={idx} 
                                className={`px-2 py-1 rounded-full text-xs font-semibold text-white border border-white/10 transition-colors ${
                                    isShared 
                                        ? 'bg-pink-500 border-pink-500 shadow-sm shadow-pink-500/50' 
                                        : 'bg-white/20 backdrop-blur-md'
                                }`}
                            >
                                {tag}
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Bio and Details */}
            <div className={`relative transition-all duration-500 ${isExpanded ? 'mt-4' : 'mt-1'}`}>
                <p className={`text-md text-gray-200 drop-shadow-md leading-relaxed transition-all ${
                    isExpanded ? '' : 'line-clamp-2'
                }`}>
                    {user.bio}
                </p>

                {/* Extended Details (Visible when expanded) */}
                {isExpanded && (
                    <div className="mt-6 space-y-5 animate-fade-in">
                        
                        {/* Profile Strength Indicator */}
                        <div className="bg-gray-800/40 p-3 rounded-xl border border-gray-700/50">
                             <div 
                                className="flex justify-between items-end mb-2 cursor-pointer group"
                                onClick={() => setShowScoreGuide(!showScoreGuide)}
                             >
                                <h4 className="text-pink-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                                    Profile Strength 
                                    <InfoIcon className="w-3 h-3 text-gray-500 group-hover:text-pink-400 transition-colors" />
                                </h4>
                                <span className={`text-xs font-bold ${completenessScore >= 80 ? 'text-green-400' : 'text-gray-400'}`}>
                                    {completenessScore}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                                <div 
                                    className={`h-full rounded-full ${getProgressColor(completenessScore)} transition-all duration-1000 ease-out`} 
                                    style={{ width: `${isExpanded ? completenessScore : 0}%` }}
                                ></div>
                            </div>
                            
                            {/* Detailed Score Breakdown Guide */}
                            {showScoreGuide && (
                                <div className="mt-3 space-y-2 animate-fade-in border-t border-gray-700/50 pt-2">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">How it's calculated:</p>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-300 flex items-center gap-1">
                                                {scoreBreakdown.basic.met ? <CheckIcon className="w-3 h-3 text-green-500"/> : <span className="w-3 h-3 block border border-gray-600 rounded-sm"></span>}
                                                Basic Info
                                            </span>
                                            <span className={scoreBreakdown.basic.met ? "text-green-400 font-bold" : "text-gray-500"}>+20</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-300 flex items-center gap-1">
                                                 {scoreBreakdown.bio.met ? <CheckIcon className="w-3 h-3 text-green-500"/> : <span className="w-3 h-3 block border border-gray-600 rounded-sm"></span>}
                                                Meaningful Bio
                                            </span>
                                            <span className={scoreBreakdown.bio.met ? "text-green-400 font-bold" : "text-gray-500"}>+30</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-300 flex items-center gap-1">
                                                 {scoreBreakdown.tags.met ? <CheckIcon className="w-3 h-3 text-green-500"/> : <span className="w-3 h-3 block border border-gray-600 rounded-sm"></span>}
                                                Vibe Tags
                                            </span>
                                            <span className={scoreBreakdown.tags.met ? "text-green-400 font-bold" : "text-gray-500"}>+30</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-300 flex items-center gap-1">
                                                 {scoreBreakdown.photo.isLive ? <CheckIcon className="w-3 h-3 text-green-500"/> : (scoreBreakdown.photo.met ? <CheckIcon className="w-3 h-3 text-yellow-500"/> : <span className="w-3 h-3 block border border-gray-600 rounded-sm"></span>)}
                                                {scoreBreakdown.photo.isLive ? 'Live Verified Photo' : 'Profile Photo'}
                                            </span>
                                            <span className={scoreBreakdown.photo.points > 0 ? "text-green-400 font-bold" : "text-gray-500"}>+{scoreBreakdown.photo.points}</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 italic mt-2 text-center">
                                        Tap title to hide details
                                    </p>
                                </div>
                            )}

                            {!showScoreGuide && (
                                <p className="text-[10px] text-gray-500 mt-1.5 italic text-right cursor-pointer hover:text-pink-400 transition-colors" onClick={() => setShowScoreGuide(true)}>
                                    {user.liveImageUrl ? "Live verified at venue." : "Standard profile."} <span className="underline ml-1">Why?</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <h4 className="text-pink-400 font-bold text-sm uppercase tracking-wider mb-1">Current Vibe</h4>
                            <p className="text-white">{user.tags?.join(' • ') || 'Just chillin'}</p>
                        </div>
                         <div>
                            <h4 className="text-pink-400 font-bold text-sm uppercase tracking-wider mb-1">Looking For</h4>
                            <p className="text-white">Someone to connect with at this venue.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* View Details Toggle Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                className="mt-3 flex items-center gap-2 text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors focus:outline-none self-start"
            >
                {isExpanded ? (
                    <>
                        <ChevronDownIcon className="w-4 h-4" /> Show Less
                    </>
                ) : (
                    <>
                        <InfoIcon className="w-4 h-4" /> View Details
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;

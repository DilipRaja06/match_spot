
import React, { useState, useEffect, useRef } from 'react';
import { Match, User } from '../types';
import { SparklesIcon, GiftIcon, BulbIcon, LightningIcon, RefreshIcon } from './Icons';

interface MatchNotificationProps {
  match: Match;
  currentUser: User;
  onClose: () => void;
  onViewMatches: () => void;
  onRefreshInteraction: () => Promise<void>;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({ match, currentUser, onClose, onViewMatches, onRefreshInteraction }) => {
  const [torchSupported, setTorchSupported] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const trackRef = useRef<MediaStreamTrack | null>(null);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    // Check for torch support
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.enumerateDevices().then(devices => {
            const videoInput = devices.find(device => device.kind === 'videoinput');
            if (videoInput) {
                navigator.mediaDevices.getUserMedia({
                    video: { deviceId: videoInput.deviceId }
                }).then(stream => {
                    const [track] = stream.getVideoTracks();
                    const capabilities = track.getCapabilities();
                    if ('torch' in capabilities) {
                        setTorchSupported(true);
                    }
                    track.stop(); // Stop the track immediately after checking
                }).catch(() => {}); // Fail silently
            }
        });
    }

    return () => { // Cleanup on unmount
        if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
        turnOffTorch();
    };
  }, []);

  const turnOffTorch = () => {
      if (trackRef.current && trackRef.current.readyState === 'live') {
          // FIX: Cast to 'any' to bypass TypeScript error as 'torch' is not in the standard MediaTrackConstraintSet type.
          trackRef.current.applyConstraints({ advanced: [{ torch: false }] } as any);
          trackRef.current.stop();
          trackRef.current = null;
      }
  }

  const handleBlinkLights = async () => {
    if (!torchSupported || isBlinking) return;

    setIsBlinking(true);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const [track] = stream.getVideoTracks();
        trackRef.current = track;

        // Blink 5 times
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(() => {
                // FIX: Cast to 'any' to bypass TypeScript error for the 'torch' property which is not in standard MediaTrackConstraintSet.
                track.applyConstraints({ advanced: [{ torch: true }] } as any);
                resolve(null);
            }, 300));
            await new Promise(resolve => setTimeout(() => {
                // FIX: Cast to 'any' to bypass TypeScript error for the 'torch' property which is not in standard MediaTrackConstraintSet.
                track.applyConstraints({ advanced: [{ torch: false }] } as any);
                resolve(null);
            }, 300));
        }
        
        blinkTimeoutRef.current = setTimeout(() => {
            turnOffTorch();
            setIsBlinking(false);
        }, 500);

    } catch (err) {
        console.error('Could not access camera for torch:', err);
        setIsBlinking(false);
    }
  };

  const handleRefresh = async () => {
      if (isRefreshing) return;
      setIsRefreshing(true);
      await onRefreshInteraction();
      setIsRefreshing(false);
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in overflow-y-auto py-10">
      <div className="bg-gray-800 border border-pink-500 rounded-2xl shadow-2xl w-full max-w-sm m-4 text-center p-6 transform animate-pop-in relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl">&times;</button>
        
        <div className="flex justify-center items-center relative -mt-12">
            <img src={currentUser.liveImageUrl || currentUser.imageUrl} alt={currentUser.name} className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg -mr-8 z-10 object-cover"/>
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-full z-20 shadow-lg">
                <SparklesIcon className="w-8 h-8 text-white"/>
            </div>
            <img src={match.user.liveImageUrl || match.user.imageUrl} alt={match.user.name} className="w-24 h-24 rounded-full border-4 border-pink-500 shadow-lg -ml-8 z-10 object-cover"/>
        </div>

        <h2 className="text-3xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          It's a Match!
        </h2>
        <p className="text-lg text-gray-200 mt-1">
          You and {match.user.name} can now connect.
        </p>
        
        {/* Refresh Button Area */}
        <div className="flex justify-end mt-2">
            <button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors disabled:opacity-50"
            >
                <RefreshIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                New Suggestions
            </button>
        </div>

        {/* Bold Move Section - Introvert Guide */}
        {match.interaction.bold_move && (
            <div className="mt-2 p-4 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-xl border border-indigo-500/50 shadow-lg relative overflow-hidden">
                {isRefreshing && <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10 backdrop-blur-sm"><span className="text-white text-sm font-bold animate-pulse">Loading...</span></div>}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <LightningIcon className="text-yellow-400 w-5 h-5" />
                    <h4 className="font-bold text-indigo-200 uppercase text-sm tracking-wide">Your Bold Move</h4>
                </div>
                <p className="text-white text-lg font-medium leading-tight">
                    "{match.interaction.bold_move}"
                </p>
            </div>
        )}

        <div className="my-4 p-3 bg-gray-900/50 rounded-lg relative overflow-hidden">
            {isRefreshing && <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10 backdrop-blur-sm"></div>}
            <h4 className="font-semibold text-pink-400 capitalize text-sm mb-1">Conversation Starter</h4>
            <p className="text-white italic text-sm">"{match.interaction.content}"</p>
        </div>

        <div className="my-4 p-3 bg-gradient-to-br from-green-500/20 to-gray-900 rounded-lg border border-green-500 flex items-center gap-3 text-left">
             <div className="bg-green-500/20 p-2 rounded-full">
                <GiftIcon className="w-6 h-6 text-green-400" />
             </div>
             <div>
                <p className="text-white font-bold leading-tight">{match.coupon.title}</p>
                <p className="text-gray-400 text-xs">{match.coupon.description}</p>
             </div>
        </div>
        
        <div className="mt-5 flex flex-col gap-3">
             <button
                onClick={handleBlinkLights}
                disabled={!torchSupported || isBlinking}
                className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                <BulbIcon /> {isBlinking ? 'Blinking...' : 'Signal Location (Blink)'}
            </button>
            <button
                onClick={onViewMatches}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
            >
                View Matches
            </button>
        </div>
      </div>
    </div>
  );
};

export default MatchNotification;

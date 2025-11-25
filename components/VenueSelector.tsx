
import React from 'react';
import { Venue } from '../types';
import { LocationIcon, UserGroupIcon, MusicNoteIcon } from './Icons';

interface VenueSelectorProps {
  venues: Venue[];
  onSelect: (venue: Venue) => void;
}

const VenueSelector: React.FC<VenueSelectorProps> = ({ venues, onSelect }) => {
    
  const getCrowdLabel = (level: number) => {
      if (level < 30) return "Chill";
      if (level < 60) return "Moderate";
      if (level < 85) return "Busy";
      return "Packed";
  };

  const getCrowdColor = (level: number) => {
      if (level < 30) return "bg-green-500";
      if (level < 60) return "bg-yellow-500";
      if (level < 85) return "bg-orange-500";
      return "bg-pink-500";
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white animate-fade-in-down">Welcome to MatchSpot</h2>
      <p className="text-lg text-gray-300 mb-8 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
        Check in to a venue to find your match in real time!
      </p>
      <div className="space-y-4">
        {venues.map((venue, index) => (
          <button
            key={venue.id}
            onClick={() => onSelect(venue)}
            className="w-full bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-4 flex items-start gap-4 text-left hover:bg-pink-500/20 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 animate-fade-in-up group"
            style={{ animationDelay: `${400 + index * 100}ms` }}
          >
            <div className="relative">
                <img src={venue.imageUrl} alt={venue.name} className="w-24 h-24 rounded-md object-cover" />
                <div className="absolute top-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1 backdrop-blur-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${getCrowdColor(venue.crowdLevel)} animate-pulse`}></span>
                    LIVE
                </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors">{venue.name}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-1 mb-2"><LocationIcon /> {venue.address}</p>
              
              <div className="flex flex-col gap-1.5">
                   <div className="flex items-center gap-2 text-xs text-gray-300">
                        <UserGroupIcon className="w-3.5 h-3.5 text-gray-500" />
                        <div className="flex-1 flex items-center gap-2">
                           <span className="w-12 font-medium">{getCrowdLabel(venue.crowdLevel)}</span>
                           <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${getCrowdColor(venue.crowdLevel)}`} style={{ width: `${venue.crowdLevel}%` }}></div>
                           </div>
                        </div>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-gray-300">
                        <MusicNoteIcon className="w-3.5 h-3.5 text-pink-400" />
                        <span className="truncate text-gray-300 italic">{venue.currentSong}</span>
                   </div>
              </div>
              
              <div className="mt-2 inline-block bg-indigo-500/30 text-indigo-200 text-[10px] font-medium px-2 py-0.5 rounded-full border border-indigo-500/50">
                  {venue.musicType}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VenueSelector;

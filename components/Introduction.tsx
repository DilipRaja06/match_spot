
import React, { useState } from 'react';
import { LogoIcon, SparklesIcon, ChevronDownIcon } from './Icons';

interface IntroductionProps {
  onComplete: (data: { name: string; age: number; bio: string }) => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'form'>('welcome');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: ''
  });
  const [error, setError] = useState('');

  const handleStart = () => {
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.bio) {
      setError('Please fill in all fields to continue.');
      return;
    }
    
    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 18) {
        setError('You must be 18+ to use this app.');
        return;
    }

    onComplete({
      name: formData.name,
      age: ageNum,
      bio: formData.bio
    });
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative z-20">
      
      {step === 'welcome' && (
        <div className="animate-fade-in space-y-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-pink-500 blur-xl opacity-40 rounded-full animate-pulse"></div>
            <LogoIcon width={80} height={80} className="relative text-white drop-shadow-lg" />
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              MatchSpot <span className="text-pink-500">.</span>
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Real-time dating for the <br/> nightlife generation.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 rounded-xl flex items-center gap-3 text-left">
               <div className="bg-pink-500/20 p-2 rounded-lg">
                  <SparklesIcon className="text-pink-400 w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-bold text-white">Live Connections</h3>
                  <p className="text-xs text-gray-400">Match with people actually at the same venue.</p>
               </div>
            </div>
             <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 rounded-xl flex items-center gap-3 text-left">
               <div className="bg-purple-500/20 p-2 rounded-lg">
                  <ChevronDownIcon className="text-purple-400 w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-bold text-white">Instant Icebreakers</h3>
                  <p className="text-xs text-gray-400">AI-powered prompts to skip the awkward talk.</p>
               </div>
            </div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg py-4 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transform hover:scale-105 transition-all duration-300 mt-8"
          >
            Get Started
          </button>
        </div>
      )}

      {step === 'form' && (
        <div className="animate-fade-in-up w-full">
           <div className="mb-8 text-left">
              <h2 className="text-3xl font-bold text-white">Who are you?</h2>
              <p className="text-gray-400">Let's set up your profile so matches can find you.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Jordan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Quick Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                  placeholder="What brings you out tonight?"
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{formData.bio.length}/100</p>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-900/50">{error}</p>
              )}

              <button 
                type="submit"
                className="w-full bg-pink-500 text-white font-bold text-lg py-4 rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 mt-4"
              >
                Find Venues Nearby
              </button>
           </form>
        </div>
      )}
    </div>
  );
};

export default Introduction;

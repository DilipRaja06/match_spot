
import React, { useState } from 'react';
import { CheckIcon } from './Icons';

interface PreferenceQuestionnaireProps {
  onComplete: (tags: string[]) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: "What's your vibe tonight?",
    options: ["Here to Dance 💃", "Find a Date 💘", "Make Friends 👯‍♀️", "Just Chill 🧊"]
  },
  {
    id: 2,
    question: "What are you drinking?",
    options: ["Cocktails 🍸", "Beer 🍺", "Shots 🥃", "Mocktails 🥤"]
  },
  {
    id: 3,
    question: "Who are you here with?",
    options: ["Riding Solo 🐺", "With the Crew 🤘", "Third Wheeling 🚲", "It's Complicated 🤷‍♂️"]
  }
];

const PreferenceQuestionnaire: React.FC<PreferenceQuestionnaireProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelect = (option: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSelectedOption(option);
    
    // Small delay for visual feedback
    setTimeout(() => {
      const newAnswers = [...answers, option];
      if (step < QUESTIONS.length - 1) {
        setAnswers(newAnswers);
        setStep(prev => prev + 1);
        setSelectedOption(null);
        setIsProcessing(false);
      } else {
        onComplete(newAnswers);
        // No need to reset processing as component will unmount/change state
      }
    }, 300);
  };

  const currentQuestion = QUESTIONS[step];

  // Guard clause to prevent crashes if step goes out of bounds
  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-md mx-auto p-6 text-center animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-center gap-2 mb-4">
            {QUESTIONS.map((_, idx) => (
                <div key={idx} className={`h-1 flex-1 rounded-full transition-all duration-300 ${idx <= step ? 'bg-pink-500' : 'bg-gray-700'}`}></div>
            ))}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in-down" key={`h-${step}`}>
            {currentQuestion.question}
        </h2>
        <p className="text-gray-400 text-sm">Help us find your crowd.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={isProcessing}
            className={`p-4 rounded-xl border transition-all duration-200 transform hover:scale-102 flex items-center justify-between group disabled:opacity-80 disabled:cursor-not-allowed
              ${selectedOption === option 
                ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/30' 
                : 'bg-gray-800/50 border-gray-700 text-gray-200 hover:border-pink-400 hover:bg-gray-800'
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="font-medium text-lg">{option}</span>
            {selectedOption === option && <CheckIcon className="w-6 h-6 animate-pop-in" />}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => handleSelect("Skipped")}
        disabled={isProcessing}
        className="mt-8 text-gray-500 text-sm hover:text-white underline transition-colors disabled:opacity-50"
      >
        Skip this question
      </button>
    </div>
  );
};

export default PreferenceQuestionnaire;

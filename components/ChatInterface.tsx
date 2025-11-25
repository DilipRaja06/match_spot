
import React, { useState, useEffect, useRef } from 'react';
import { Match } from '../types';
import { BackIcon, SendIcon, RefreshIcon, BlockIcon, FlagIcon } from './Icons';

interface ChatInterfaceProps {
  match: Match;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onRefreshInteraction: () => Promise<void>;
  onBlock: () => void;
  onReport: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ match, onClose, onSendMessage, onRefreshInteraction, onBlock, onReport }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [match.messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleRefresh = async () => {
      if (isRefreshing) return;
      setIsRefreshing(true);
      await onRefreshInteraction();
      setIsRefreshing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-[60] flex flex-col animate-fade-in">
      {/* Header */}
      <header className="p-4 bg-gray-800/90 backdrop-blur-sm flex items-center gap-3 border-b border-gray-700 shadow-md">
        <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
          <BackIcon />
        </button>
        <img 
            src={match.user.liveImageUrl || match.user.imageUrl} 
            alt={match.user.name} 
            className="w-10 h-10 rounded-full border border-pink-500 object-cover" 
        />
        <div className="flex-1">
            <h3 className="font-bold text-white leading-tight">{match.user.name}</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online now
            </p>
        </div>
        
         <button 
            onClick={onReport} 
            className="text-gray-400 hover:text-yellow-500 transition-colors p-2" 
            title="Report User"
        >
            <FlagIcon width={20} height={20} />
        </button>
        <button 
            onClick={onBlock} 
            className="text-gray-400 hover:text-red-500 transition-colors p-2" 
            title="Block User"
        >
            <BlockIcon width={20} height={20} />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
        <div className="text-center my-4">
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                Matched {new Date(match.timestamp).toLocaleDateString()}
            </span>
        </div>
        
        {/* Initial Interaction Prompt */}
        <div className="flex justify-center mb-6">
            <div className="relative bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-pink-500/30 rounded-xl p-3 text-center max-w-xs w-full group">
                <p className="text-xs text-pink-300 font-bold uppercase mb-1 flex items-center justify-center gap-2">
                    Ice Breaker 
                    <button onClick={handleRefresh} disabled={isRefreshing} className="text-pink-400 hover:text-white transition-colors">
                        <RefreshIcon className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                </p>
                <p className={`text-sm text-gray-200 italic transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
                    "{match.interaction.content}"
                </p>
            </div>
        </div>

        {match.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.isSelf ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.isSelf
                  ? 'bg-pink-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-gray-800 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Say something nice..."
          className="flex-1 bg-gray-700 text-white rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;

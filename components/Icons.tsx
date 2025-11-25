
import React from 'react';

// Using a generic props type for SVG icons to allow className and other standard props
type SVGIconProps = React.SVGProps<SVGSVGElement>;

export const LogoIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
    </svg>
);

export const BackIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const GhostIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5a2 2 0 0 1-1.6-.8L14 2.5a2 2 0 0 0-3.2 0L9.1 5.2a2 2 0 0 1-1.6.8H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h.5a2 2 0 0 1 1.6.8l1.4 2.5a2 2 0 0 0 3.2 0l1.4-2.5a2 2 0 0 1 1.6-.8H20z"></path>
        <circle cx="12" cy="13" r="1"></circle>
        <path d="M9.5 16a2.5 2.5 0 0 1 5 0"></path>
    </svg>
);

export const SparklesIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3L9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z"></path>
  </svg>
);

export const LocationIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block" {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export const PassIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const LikeIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

export const MessageIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const GiftIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 12 20 22 4 22 4 12"></polyline>
        <rect x="2" y="7" width="20" height="5"></rect>
        <line x1="12" y1="22" x2="12" y2="7"></line>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
);

export const BulbIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 18h6"></path>
        <path d="M10 22h4"></path>
        <path d="M12 14a6 6 0 0 0-3.33 10.43 3.5 3.5 0 0 0 6.66 0A6 6 0 0 0 12 14z"></path>
        <path d="M12 2a4.5 4.5 0 0 0-2.5 8.13"></path>
        <path d="M12 2a4.5 4.5 0 0 1 2.5 8.13"></path>
    </svg>
);

export const CameraIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
    </svg>
);

export const CheckIcon: React.FC<SVGIconProps> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export const LightningIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export const SendIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const UserGroupIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

export const MusicNoteIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
    </svg>
);

export const InfoIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

export const ChevronDownIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export const RefreshIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M23 4v6h-6"></path>
        <path d="M1 20v-6h6"></path>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
);

export const BlockIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    </svg>
);

export const FlagIcon: React.FC<SVGIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
    </svg>
);


// Add custom keyframes for animations in index.html or a style tag
const globalStyles = `
  @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes pop-in { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
  
  /* Elastic swipe animations */
  @keyframes swipe-out-right { 
    0% { transform: translateX(0) rotate(0); opacity: 1; } 
    20% { transform: translateX(-20px) rotate(-5deg) scale(0.95); opacity: 1; } /* Wind up */
    100% { transform: translateX(150%) rotate(25deg) scale(1.1); opacity: 0; } /* Release */
  }
  @keyframes swipe-out-left { 
    0% { transform: translateX(0) rotate(0); opacity: 1; } 
    20% { transform: translateX(20px) rotate(5deg) scale(0.95); opacity: 1; } /* Wind up */
    100% { transform: translateX(-150%) rotate(-25deg) scale(1.1); opacity: 0; } /* Release */
  }
  
  /* Rubber band entry for card settling */
  @keyframes rubber-band-entry {
    0% { transform: scale(0.95); }
    40% { transform: scale(1.02); }
    60% { transform: scale(0.98); }
    80% { transform: scale(1.01); }
    100% { transform: scale(1); }
  }

  @keyframes subtle-zoom { 
    0% { transform: scale(1) translate(0,0); } 
    100% { transform: scale(1.15) translate(-2%, -2%); } 
  }
  @keyframes spin { 100% { transform: rotate(360deg); } }
  
  .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; opacity: 0; }
  .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
  .animate-pop-in { animation: pop-in 0.3s ease-out forwards; }
  .animate-swipe-out-right { animation: swipe-out-right 0.5s ease-in forwards; }
  .animate-swipe-out-left { animation: swipe-out-left 0.5s ease-in forwards; }
  .animate-rubber-band-entry { animation: rubber-band-entry 0.6s ease-out forwards; }
  .animate-subtle-zoom { animation: subtle-zoom 8s ease-out forwards; }
  .animate-spin { animation: spin 1s linear infinite; }
  
  /* Custom elastic transition for card stack movement */
  .transition-elastic {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* Elastic ease out */
  }
`;

// It's a bit of a hack to inject global styles from a component, but necessary without a CSS file.
export const GlobalStylesInjector = () => <style>{globalStyles}</style>;

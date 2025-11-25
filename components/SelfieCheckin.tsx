import React, { useState, useRef, useEffect } from 'react';
import { CameraIcon, CheckIcon } from './Icons';

interface SelfieCheckinProps {
  venueName: string;
  onConfirm: (imageDataUrl: string) => void;
  onCancel: () => void;
}

const SelfieCheckin: React.FC<SelfieCheckinProps> = ({ venueName, onConfirm, onCancel }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ageConsent, setAgeConsent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setCapturedImage(null);
    setAgeConsent(false);
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access the camera. Please check your browser permissions.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  if (error) {
    return (
        <div className="w-full max-w-sm text-center bg-red-900/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-300">Camera Error</h3>
            <p className="text-red-200 mt-2">{error}</p>
            <button onClick={onCancel} className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                Back to Venues
            </button>
        </div>
    );
  }

  return (
    <div className="w-full max-w-sm text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold">Live Look</h2>
        <p className="text-md text-gray-300 mb-4">Show your current look at <span className="font-bold text-pink-400">{venueName}</span> so matches can find you!</p>
        
        <div className="w-full aspect-square rounded-full overflow-hidden bg-gray-800 border-4 border-pink-500 shadow-lg mb-6 flex items-center justify-center">
            {capturedImage ? (
                 <img src={capturedImage} alt="Your selfie" className="w-full h-full object-cover" />
            ) : (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
            )}
        </div>

        {capturedImage ? (
            <div className="flex flex-col items-center gap-4 animate-fade-in">
                 <div className="flex items-start justify-center gap-3 max-w-xs px-2 text-left">
                    <input
                        type="checkbox"
                        id="age-consent"
                        checked={ageConsent}
                        onChange={(e) => setAgeConsent(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 text-pink-500 focus:ring-pink-500 focus:ring-offset-gray-900 cursor-pointer accent-pink-500"
                    />
                    <label htmlFor="age-consent" className="text-sm text-gray-300 cursor-pointer select-none leading-tight">
                        I confirm that I am 18+ years old and consent to sharing my live photo within this venue.
                    </label>
                </div>

                <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                        onClick={startCamera}
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-yellow-400 hover:bg-yellow-400/30 transition-all duration-300 transform hover:scale-110"
                    >
                        Retake
                    </button>
                    <button
                        onClick={() => onConfirm(capturedImage)}
                        disabled={!ageConsent}
                        className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform ${ageConsent ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed grayscale'}`}
                    >
                        <CheckIcon />
                    </button>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={handleCapture}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                    disabled={!stream}
                >
                    <CameraIcon />
                </button>
                <button onClick={onCancel} className="text-gray-400 hover:text-white">Cancel</button>
            </div>
        )}
    </div>
  );
};

export default SelfieCheckin;
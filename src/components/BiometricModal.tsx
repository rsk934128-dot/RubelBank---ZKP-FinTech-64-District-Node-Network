import React, { useState } from 'react';
import { Fingerprint, CheckCircle2, X } from 'lucide-react';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionTitle?: string;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  actionTitle = "Authenticate BDT Transfer"
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleScanFinger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onSuccess();
      }, 700);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative space-y-6 text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-slate-100">
            Biometric Authorization
          </h3>
          <p className="text-xs text-slate-400">
            {actionTitle}
          </p>
        </div>

        {/* Fingerprint Scanner Target */}
        <div 
          onClick={handleScanFinger}
          className="relative mx-auto w-24 h-24 rounded-full bg-slate-950 border-2 border-emerald-500/30 flex items-center justify-center cursor-pointer group hover:border-emerald-500 transition-all shadow-inner"
        >
          {isScanning && (
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
          )}

          {isDone ? (
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
          ) : (
            <Fingerprint className={`w-12 h-12 transition-colors ${
              isScanning ? 'text-emerald-400 animate-pulse' : 'text-slate-400 group-hover:text-emerald-400'
            }`} />
          )}
        </div>

        <div className="text-xs font-mono text-slate-400">
          {isScanning 
            ? 'Scanning fingerprint hardware sensor...' 
            : isDone 
            ? 'Biometric Hardware Key Matched!' 
            : 'Touch the sensor icon above to confirm identity'}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { HealthProfessional, HealthFacility } from '../types/clinical';
import { Lock, KeyRound, AlertCircle, LogOut } from 'lucide-react';

interface SessionLockModalProps {
  isOpen: boolean;
  facility: HealthFacility;
  professional: HealthProfessional;
  onUnlock: () => void;
  onLogout: () => void;
}

export const SessionLockModal: React.FC<SessionLockModalProps> = ({
  isOpen,
  facility,
  professional,
  onUnlock,
  onLogout
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === professional.passcode || pin === '1234') {
      setError(false);
      setPin('');
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-slate-100 shadow-2xl space-y-5 text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30">
          <Lock className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">Station Locked</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {professional.fullName} · {facility.name}
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            PIN: {professional.registrationPin}
          </p>
        </div>

        <form onSubmit={handleUnlockAttempt} className="space-y-3">
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="password"
              autoFocus
              maxLength={8}
              value={pin}
              onChange={e => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter PIN (demo: 1234)"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-600 rounded-xl text-white font-mono tracking-widest text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-400 font-medium flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN. (Demo default: 1234)
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Unlock Station
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 flex justify-center">
          <button
            type="button"
            onClick={onLogout}
            className="text-[11px] text-slate-400 hover:text-red-400 transition flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch User / Log Out</span>
          </button>
        </div>

      </div>
    </div>
  );
};

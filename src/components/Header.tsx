import React from 'react';
import { 
  Stethoscope, 
  WifiOff, 
  Building2, 
  User, 
  Lock, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';
import { HealthFacility, HealthProfessional } from '../types/clinical';

interface HeaderProps {
  activeTab: 'consultation' | 'register' | 'formulary';
  setActiveTab: (tab: 'consultation' | 'register' | 'formulary') => void;
  savedCount: number;
  facility: HealthFacility;
  professional: HealthProfessional;
  onLockSession: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  facility,
  professional,
  onLockSession,
  onLogout,
  onOpenSettings
}) => {
  return (
    <header className="bg-emerald-800 text-white shadow-sm border-b border-emerald-900 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Wordmark & Facility Info */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-700 border border-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">RuralRx</span>
                <span className="text-emerald-300 text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-900/60 border border-emerald-700/50">
                  {facility.accreditationCode || 'STATION'}
                </span>
              </div>
              <p className="text-xs text-emerald-200 truncate max-w-[180px] sm:max-w-xs font-medium">
                {facility.name} · {facility.district}
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('consultation')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'consultation'
                  ? 'bg-emerald-900/80 text-white shadow-inner font-semibold'
                  : 'text-emerald-100 hover:bg-emerald-700/50 hover:text-white'
              }`}
            >
              Consultation
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-emerald-900/80 text-white shadow-inner font-semibold'
                  : 'text-emerald-100 hover:bg-emerald-700/50 hover:text-white'
              }`}
            >
              <span>Patient Log</span>
              {savedCount > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('formulary')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'formulary'
                  ? 'bg-emerald-900/80 text-white shadow-inner font-semibold'
                  : 'text-emerald-100 hover:bg-emerald-700/50 hover:text-white'
              }`}
            >
              Dosing Guide
            </button>
          </nav>

          {/* Right Zone: Practitioner Badge, Lock & Sign Out */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Authenticated Practitioner Lockup */}
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg border border-emerald-600 transition-colors"
              title="View / Edit Station Credentials"
            >
              <User className="w-3.5 h-3.5 text-emerald-200" />
              <div className="text-left hidden md:block">
                <span className="block font-bold leading-none truncate max-w-[130px]">{professional.fullName}</span>
                <span className="text-[10px] text-emerald-200 font-mono leading-none">PIN: {professional.registrationPin}</span>
              </div>
            </button>

            {/* Quick Station Lock button */}
            <button
              onClick={onLockSession}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium bg-emerald-900/70 hover:bg-emerald-900 text-emerald-200 hover:text-white rounded-lg border border-emerald-700/60 transition flex items-center gap-1"
              title="Lock Workstation Desk"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline text-[11px]">Lock Desk</span>
            </button>

            {/* Logout / Switch User */}
            <button
              onClick={onLogout}
              className="p-1.5 sm:px-2 sm:py-1.5 text-xs font-medium bg-emerald-900/50 hover:bg-red-900/80 hover:text-red-100 text-emerald-200 rounded-lg border border-emerald-700/60 transition flex items-center gap-1"
              title="Sign Out / Switch Station"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Logout</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

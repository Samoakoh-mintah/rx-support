import React, { useState } from 'react';
import { 
  HealthFacility, 
  HealthProfessional 
} from '../types/clinical';
import { 
  PRESET_FACILITIES, 
  PRESET_PROFESSIONALS 
} from '../data/clinicalGuidelines';
import { 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  Stethoscope, 
  ArrowRight, 
  AlertCircle,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (facility: HealthFacility, professional: HealthProfessional) => void;
  savedFacility?: HealthFacility;
  savedProfessional?: HealthProfessional;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  savedFacility,
  savedProfessional
}) => {
  // Facility state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(
    savedFacility?.id || PRESET_FACILITIES[0].id
  );
  const [isCustomFacility, setIsCustomFacility] = useState(false);
  const [customFacility, setCustomFacility] = useState<HealthFacility>({
    id: `FAC-CUSTOM-${Date.now()}`,
    name: '',
    facilityType: 'CHPS Zone / Post',
    district: '',
    region: 'Eastern Region',
    accreditationCode: 'FAC-GH-' + Math.floor(10000 + Math.random() * 90000)
  });

  // Professional state
  const [selectedProfId, setSelectedProfId] = useState<string>(
    savedProfessional?.id || PRESET_PROFESSIONALS[0].id
  );
  const [isCustomProf, setIsCustomProf] = useState(false);
  const [customProf, setCustomProf] = useState<HealthProfessional>({
    id: `PROF-CUSTOM-${Date.now()}`,
    fullName: '',
    cadre: 'Community Health Nurse (CHN) / Registered General Nurse',
    registrationPin: '',
    passcode: '1234',
    facilityId: ''
  });

  // Passcode verification
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [rememberStation, setRememberStation] = useState(true);

  // Quick 1-click preset login
  const handleQuickLogin = (prof: HealthProfessional, fac: HealthFacility) => {
    onLoginSuccess(fac, prof);
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Determine facility
    let facility: HealthFacility;
    if (isCustomFacility) {
      if (!customFacility.name.trim() || !customFacility.district.trim()) {
        setAuthError('Please provide facility name and district.');
        return;
      }
      facility = customFacility;
    } else {
      const found = PRESET_FACILITIES.find(f => f.id === selectedFacilityId);
      if (!found) {
        setAuthError('Please select a valid health facility.');
        return;
      }
      facility = found;
    }

    // Determine professional
    let professional: HealthProfessional;
    if (isCustomProf) {
      if (!customProf.fullName.trim() || !customProf.registrationPin.trim()) {
        setAuthError('Please enter practitioner name and regulatory PIN.');
        return;
      }
      professional = {
        ...customProf,
        facilityId: facility.id
      };
    } else {
      const found = PRESET_PROFESSIONALS.find(p => p.id === selectedProfId);
      if (!found) {
        setAuthError('Please select a healthcare professional profile.');
        return;
      }
      professional = found;
    }

    // Passcode check (allow 1234 or matching passcode)
    if (enteredPasscode.trim() && enteredPasscode !== professional.passcode && enteredPasscode !== '1234') {
      setAuthError('Invalid passcode. (Demo default passcode is 1234)');
      return;
    }

    onLoginSuccess(facility, professional);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500 selection:text-white">
      
      {/* Container */}
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600 text-white shadow-lg ring-4 ring-emerald-500/20 mb-2">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            RuralRx Primary Health Station
          </h1>
          <p className="text-sm text-emerald-200/90 max-w-xl mx-auto font-medium">
            Clinical Prescription Decision Support & Patient Triage System for Rural CHPS Compounds & Health Centres
          </p>
        </div>

        {/* Quick Demo Login Grid */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              1-Click Practitioner Station Sign-in (Demo Fast-Pass)
            </span>
            <span className="text-[11px] text-slate-400">Passcode pre-authenticated</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {PRESET_PROFESSIONALS.slice(0, 3).map(prof => {
              const fac = PRESET_FACILITIES.find(f => f.id === prof.facilityId) || PRESET_FACILITIES[0];
              return (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => handleQuickLogin(prof, fac)}
                  className="text-left p-3 rounded-xl bg-slate-900/70 hover:bg-emerald-950/40 border border-slate-700 hover:border-emerald-500/50 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition">
                        {prof.fullName}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium mt-0.5">{prof.cadre}</p>
                    <p className="text-[10px] text-slate-400 mt-1 truncate">
                      {fac.name} · {fac.district}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>PIN: {prof.registrationPin}</span>
                    <span className="text-emerald-400 font-semibold">Sign In</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Login Form Box */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8">
          
          <form onSubmit={handleStandardLogin} className="space-y-6">
            
            {/* Step A: Health Facility Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  1. Health Facility Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCustomFacility(!isCustomFacility)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  {isCustomFacility ? 'Select from standard facilities' : '+ Enter custom facility'}
                </button>
              </div>

              {!isCustomFacility ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Select Rural Health Facility / CHPS Zone
                  </label>
                  <select
                    value={selectedFacilityId}
                    onChange={e => setSelectedFacilityId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {PRESET_FACILITIES.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.name} — {f.district} ({f.facilityType})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-700">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Facility Name</label>
                    <input
                      type="text"
                      required
                      value={customFacility.name}
                      onChange={e => setCustomFacility({ ...customFacility, name: e.target.value })}
                      placeholder="e.g. Asuoyeboah Community Health Post"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">District / Region</label>
                    <input
                      type="text"
                      required
                      value={customFacility.district}
                      onChange={e => setCustomFacility({ ...customFacility, district: e.target.value })}
                      placeholder="e.g. Kwabre East District"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Facility Type</label>
                    <select
                      value={customFacility.facilityType}
                      onChange={e => setCustomFacility({ ...customFacility, facilityType: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="CHPS Zone / Post">CHPS Zone / Post</option>
                      <option value="Health Centre (Rural)">Health Centre (Rural)</option>
                      <option value="Sub-District Clinic">Sub-District Clinic</option>
                      <option value="Maternity & Child Post">Maternity & Child Post</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Step B: Health Professional Practitioner Profile */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  2. Healthcare Practitioner
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCustomProf(!isCustomProf)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  {isCustomProf ? 'Select standard practitioner' : '+ Enter custom practitioner'}
                </button>
              </div>

              {!isCustomProf ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Select Practitioner Account
                  </label>
                  <select
                    value={selectedProfId}
                    onChange={e => setSelectedProfId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {PRESET_PROFESSIONALS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} — {p.cadre} (PIN: {p.registrationPin})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-700">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Practitioner Full Name</label>
                    <input
                      type="text"
                      required
                      value={customProf.fullName}
                      onChange={e => setCustomProf({ ...customProf, fullName: e.target.value })}
                      placeholder="e.g. John Mensah, RGN"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Professional PIN</label>
                    <input
                      type="text"
                      required
                      value={customProf.registrationPin}
                      onChange={e => setCustomProf({ ...customProf, registrationPin: e.target.value })}
                      placeholder="e.g. NMC-GH-78421"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-lg text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Cadre</label>
                    <select
                      value={customProf.cadre}
                      onChange={e => setCustomProf({ ...customProf, cadre: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="Community Health Officer (CHO)">Community Health Officer (CHO)</option>
                      <option value="Community Health Nurse (CHN) / Registered General Nurse">Community Health Nurse (CHN) / RGN</option>
                      <option value="Staff Midwife (Maternal & Reproductive Care)">Staff Midwife (RM)</option>
                      <option value="Physician Assistant (Medical)">Physician Assistant (PA)</option>
                      <option value="Medicine Counter Assistant / Dispensing Technician">Medicine Counter Assistant / Dispenser</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Step C: Station Passcode Security */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                  Station Passcode
                </label>
                <span className="text-[11px] text-slate-400">Default PIN: <code className="text-emerald-400 font-mono">1234</code></span>
              </div>
              <input
                type="password"
                maxLength={8}
                value={enteredPasscode}
                onChange={e => setEnteredPasscode(e.target.value)}
                placeholder="Enter 4-digit station passcode (or leave blank to use default 1234)"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest"
              />
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition duration-150 shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize & Open Clinical Station</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Offline compliance note */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Offline-First Security: Authentication & records are encrypted and stored locally on this machine.
              </p>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

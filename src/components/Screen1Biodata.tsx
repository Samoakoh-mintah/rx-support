import React from 'react';
import { PatientBiodata } from '../types/clinical';
import { COMMON_ALLERGIES, SAMPLE_PATIENTS } from '../data/clinicalGuidelines';
import { 
  User, 
  Baby, 
  HeartHandshake, 
  Sparkles, 
  Thermometer, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';

interface Screen1BiodataProps {
  patient: PatientBiodata;
  setPatient: React.Dispatch<React.SetStateAction<PatientBiodata>>;
  onNext: () => void;
  onApplyPreset: (sample: PatientBiodata) => void;
}

export const Screen1Biodata: React.FC<Screen1BiodataProps> = ({
  patient,
  setPatient,
  onNext,
  onApplyPreset
}) => {
  const isChild = patient.age !== null && patient.age < 12;
  const isAdult = patient.age !== null && patient.age >= 12;

  const handleAgeChange = (valStr: string) => {
    if (valStr === '') {
      setPatient(prev => ({ ...prev, age: null, cohort: 'adult' }));
      return;
    }
    const val = parseFloat(valStr);
    const cohort = val < 12 ? 'child' : 'adult';
    setPatient(prev => ({
      ...prev,
      age: isNaN(val) ? null : val,
      cohort,
      // Reset pregnancy if switched to child under 12
      isPregnant: val < 12 ? false : prev.isPregnant
    }));
  };

  const handleAllergyToggle = (allergy: string) => {
    setPatient(prev => {
      const exists = prev.knownAllergies.includes(allergy);
      return {
        ...prev,
        knownAllergies: exists
          ? prev.knownAllergies.filter(a => a !== allergy)
          : [...prev.knownAllergies, allergy]
      };
    });
  };

  const canProceed = Boolean(patient.fullName.trim() && patient.age !== null && patient.age >= 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Banner & Quick Presets */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-700" />
              Patient Registration & Demographics
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Input patient vitals and age to automatically initialize pediatric or adult decision rules.
            </p>
          </div>

          {/* Quick preset selector for instant demonstration */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Demo Archetypes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PATIENTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplyPreset(sample.data)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded-md font-medium text-slate-700 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Biodata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Column 1 & 2: Primary Patient Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
              1. Basic Identification
            </h3>

            {/* Name & Health ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={patient.fullName}
                  onChange={e => setPatient({ ...patient, fullName: e.target.value })}
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  National Health ID / OPD Card #
                </label>
                <input
                  type="text"
                  value={patient.healthId}
                  onChange={e => setPatient({ ...patient, healthId: e.target.value })}
                  placeholder="e.g. 88392015"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Age, Gender & Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="120"
                    step="0.5"
                    value={patient.age === null ? '' : patient.age}
                    onChange={e => handleAgeChange(e.target.value)}
                    placeholder="e.g. 7"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition font-semibold"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">Yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Biological Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={patient.gender}
                  onChange={e => {
                    const g = e.target.value as 'Male' | 'Female';
                    setPatient(prev => ({
                      ...prev,
                      gender: g,
                      isPregnant: g === 'Male' ? false : prev.isPregnant
                    }));
                  }}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (kg) <span className="text-slate-400 text-[10px] font-normal">(recommended for kids)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="250"
                    step="0.5"
                    value={patient.weightKg === null ? '' : patient.weightKg}
                    onChange={e => {
                      const w = e.target.value === '' ? null : parseFloat(e.target.value);
                      setPatient({ ...patient, weightKg: isNaN(w as number) ? null : w });
                    }}
                    placeholder="e.g. 18"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">kg</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC AGE COHORT CLASSIFIER BANNER (Core Requirement) */}
            {patient.age !== null && (
              <div
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isChild
                    ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                    : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isChild ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isChild ? <Baby className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {isChild ? 'Pediatric Cohort Activated' : 'Adult Cohort Activated'}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                          isChild ? 'bg-blue-200/80 text-blue-900' : 'bg-indigo-200/80 text-indigo-900'
                        }`}
                      >
                        {isChild ? `Age: ${patient.age} Yrs (< 12)` : `Age: ${patient.age} Yrs (≥ 12)`}
                      </span>
                    </div>

                    <p className="text-xs mt-1 leading-relaxed text-slate-700">
                      {isChild
                        ? 'Pediatric formulation rules enforce syrups, oral suspensions, or dispersible tablets. Doses will calculate automatically by weight/age bracket to avoid solid pill aspiration risks.'
                        : 'Standard adult oral formulations (solid tablets and capsules) are selected. Standard adult therapeutic dosages apply.'}
                    </p>

                    {isChild && patient.weightKg && (
                      <p className="text-[11px] font-medium text-blue-800 mt-1 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5" />
                        Patient weight ({patient.weightKg}kg) locked in for precise mg/kg fluid and antipyretic dosing.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Female Reproductive Health Screening */}
            {patient.gender === 'Female' && isAdult && (
              <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                  <HeartHandshake className="w-4 h-4 text-amber-700" />
                  Maternal & Reproductive Screening
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patient.isPregnant}
                      onChange={e => setPatient({ ...patient, isPregnant: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-amber-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Patient is currently pregnant
                    </span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patient.isLactating}
                      onChange={e => setPatient({ ...patient, isLactating: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-amber-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Breastfeeding / Lactating
                    </span>
                  </label>
                </div>
                {patient.isPregnant && (
                  <p className="text-[11px] text-amber-800 font-medium">
                    Pregnancy safety filter activated: Teratogenic drugs (Ciprofloxacin, Doxycycline, NSAIDs) will be automatically blocked. Safe alternatives (Oral Quinine 1st trimester, Amox-Clav) will be recommended.
                  </p>
                )}
              </div>
            )}

            {/* Documented Drug Allergies */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-slate-700">
                Known Drug Allergies & Hypersensitivities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMMON_ALLERGIES.map((allergy, i) => {
                  const isSelected = patient.knownAllergies.includes(allergy);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAllergyToggle(allergy)}
                      className={`text-left px-3 py-2 rounded-lg border text-xs font-medium transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-red-50 border-red-300 text-red-800 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate pr-1">{allergy}</span>
                      {isSelected ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      ) : (
                        <span className="text-slate-400 text-[10px]">+ Add</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {patient.knownAllergies.length > 0 && (
                <div className="p-2.5 bg-red-50/70 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    <strong>Flagged Allergies:</strong> {patient.knownAllergies.join(', ')}. The decision engine will automatically substitute safe non-cross-reacting medicines.
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Column 3: Vital Signs & Clinic Metadata */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-emerald-700" />
              2. Clinical Vitals
            </h3>

            {/* Body Temperature */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Temperature (°C)</label>
                {patient.vitals.temperatureC && (
                  <span
                    className={`text-[11px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      patient.vitals.temperatureC >= 38.5
                        ? 'bg-red-100 text-red-800'
                        : patient.vitals.temperatureC >= 37.5
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {patient.vitals.temperatureC >= 38.5
                      ? 'High Fever'
                      : patient.vitals.temperatureC >= 37.5
                      ? 'Low-grade Fever'
                      : 'Normothermic'}
                  </span>
                )}
              </div>
              <input
                type="number"
                step="0.1"
                value={patient.vitals.temperatureC || ''}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                  setPatient(prev => ({
                    ...prev,
                    vitals: { ...prev.vitals, temperatureC: val }
                  }));
                }}
                placeholder="e.g. 38.2"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            {/* Blood Pressure (for adults) */}
            {isAdult && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Pressure (mmHg)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={patient.vitals.systolicBp || ''}
                    onChange={e => {
                      const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                      setPatient(prev => ({
                        ...prev,
                        vitals: { ...prev.vitals, systolicBp: val }
                      }));
                    }}
                    placeholder="Sys (120)"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                  <input
                    type="number"
                    value={patient.vitals.diastolicBp || ''}
                    onChange={e => {
                      const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                      setPatient(prev => ({
                        ...prev,
                        vitals: { ...prev.vitals, diastolicBp: val }
                      }));
                    }}
                    placeholder="Dia (80)"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* Pulse Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pulse / Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={patient.vitals.pulseBpm || ''}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                  setPatient(prev => ({
                    ...prev,
                    vitals: { ...prev.vitals, pulseBpm: val }
                  }));
                }}
                placeholder="e.g. 84"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            {/* Respiratory Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Respiratory Rate (breaths/min)
              </label>
              <input
                type="number"
                value={patient.vitals.respiratoryRate || ''}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                  setPatient(prev => ({
                    ...prev,
                    vitals: { ...prev.vitals, respiratoryRate: val }
                  }));
                }}
                placeholder="e.g. 20"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            {/* Community or Sub-district */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Community / Village Zone
              </label>
              <input
                type="text"
                value={patient.communityLocation || ''}
                onChange={e => setPatient({ ...patient, communityLocation: e.target.value })}
                placeholder="e.g. Aburi Central"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Quick Guide Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Info className="w-4 h-4 text-emerald-700" />
              Primary Care Dosing Policy
            </div>
            <p>
              • Children under 12 years are never given adult tablets to split without compounding support.
            </p>
            <p>
              • Dispersible tablets or oral syrups are mandated for optimal GI absorption.
            </p>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          {!canProceed && (
            <span className="text-amber-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please provide patient Full Name and Age to continue.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
            canProceed
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer hover:shadow'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Clinical Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

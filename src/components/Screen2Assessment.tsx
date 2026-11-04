import React from 'react';
import { ClinicalAssessment, PatientBiodata } from '../types/clinical';
import { CONDITIONS_DATABASE, IMCI_DANGER_SIGNS } from '../data/clinicalGuidelines';
import { 
  Activity, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Baby, 
  Check, 
  CheckCircle2, 
  Flame, 
  HeartPulse, 
  ShieldAlert, 
  Stethoscope, 
  User 
} from 'lucide-react';

interface Screen2AssessmentProps {
  patient: PatientBiodata;
  assessment: ClinicalAssessment;
  setAssessment: React.Dispatch<React.SetStateAction<ClinicalAssessment>>;
  onNext: () => void;
  onBack: () => void;
}

export const Screen2Assessment: React.FC<Screen2AssessmentProps> = ({
  patient,
  assessment,
  setAssessment,
  onNext,
  onBack
}) => {
  const isChild = patient.age !== null && patient.age < 12;
  const selectedCondition = CONDITIONS_DATABASE.find(c => c.id === assessment.diagnosisId);

  const handleConditionSelect = (id: string) => {
    const cond = CONDITIONS_DATABASE.find(c => c.id === id);
    setAssessment(prev => ({
      ...prev,
      diagnosisId: id,
      // Default common symptoms
      symptoms: cond ? cond.commonSymptoms.slice(0, 3) : []
    }));
  };

  const handleToggleSymptom = (sym: string) => {
    setAssessment(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(sym)
        ? prev.symptoms.filter(s => s !== sym)
        : [...prev.symptoms, sym]
    }));
  };

  const handleToggleDangerSign = (id: string) => {
    setAssessment(prev => ({
      ...prev,
      dangerSigns: prev.dangerSigns.includes(id)
        ? prev.dangerSigns.filter(d => d !== id)
        : [...prev.dangerSigns, id]
    }));
  };

  const hasDangerSigns = assessment.dangerSigns.length > 0;
  const canProceed = Boolean(assessment.diagnosisId);

  const [condSearch, setCondSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = [
    'All',
    'Infectious & Fevers',
    'Respiratory',
    'Gastrointestinal',
    'Dermatology & Skin',
    'Sensory (Eye, Ear & Oral)',
    'Genitourinary & Maternal',
    'Chronic & Non-Communicable Diseases (NCDs)'
  ];

  const filteredConditions = CONDITIONS_DATABASE.filter(cond => {
    const matchesSearch = 
      cond.title.toLowerCase().includes(condSearch.toLowerCase()) ||
      cond.description.toLowerCase().includes(condSearch.toLowerCase()) ||
      cond.icdCode.toLowerCase().includes(condSearch.toLowerCase()) ||
      cond.commonSymptoms.some(s => s.toLowerCase().includes(condSearch.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || cond.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Patient Header Summary Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isChild ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
            }`}
          >
            {isChild ? <Baby className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold">{patient.fullName || 'Unnamed Patient'}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-mono font-semibold ${
                  isChild ? 'bg-blue-500/30 text-blue-200' : 'bg-emerald-500/30 text-emerald-200'
                }`}
              >
                {isChild ? `CHILD (${patient.age} yrs)` : `ADULT (${patient.age} yrs)`}
              </span>
              {patient.isPregnant && (
                <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-amber-500/30 text-amber-200">
                  Pregnant
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              ID: {patient.healthId || 'N/A'} · Gender: {patient.gender} · Weight: {patient.weightKg ? `${patient.weightKg} kg` : 'Not recorded'}
              {patient.vitals.temperatureC && ` · Temp: ${patient.vitals.temperatureC}°C`}
            </p>
          </div>
        </div>

        {patient.knownAllergies.length > 0 ? (
          <div className="flex items-center gap-1.5 text-xs bg-red-950/80 text-red-200 px-3 py-1.5 rounded-lg border border-red-800">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>Allergy: {patient.knownAllergies.join(', ')}</span>
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            No known drug allergies
          </div>
        )}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column (2 spans): Diagnosis & Symptom Profile */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-emerald-700" />
                  1. Clinical Diagnosis (STG Database: {CONDITIONS_DATABASE.length} Conditions)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filter by clinical domain or search symptoms to trigger decision rules.
                </p>
              </div>

              {/* Quick condition search */}
              <div className="w-full sm:w-52">
                <input
                  type="text"
                  value={condSearch}
                  onChange={e => setCondSearch(e.target.value)}
                  placeholder="Filter conditions / symptoms..."
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Diagnosis Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredConditions.map(cond => {
                const isSelected = assessment.diagnosisId === cond.id;
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => handleConditionSelect(cond.id)}
                    className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-slate-900 leading-tight">
                        {cond.title}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600 shrink-0 ml-1">
                        {cond.icdCode}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                      {cond.description}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">{cond.category}</span>
                      {isSelected ? (
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      ) : (
                        <span className="text-slate-400">Select</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Additional Diagnostic Details for Selected Condition */}
            {selectedCondition && (
              <div className="pt-3 border-t border-slate-100 space-y-4">
                
                {/* Malaria RDT Rapid Test Result */}
                {selectedCondition.id === 'MALARIA' && (
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3.5">
                    <label className="block text-xs font-bold text-emerald-900 mb-1.5">
                      Malaria Rapid Diagnostic Test (mRDT)
                    </label>
                    <div className="flex gap-2">
                      {(['Positive', 'Negative', 'Not Done'] as const).map(res => (
                        <button
                          key={res}
                          type="button"
                          onClick={() => setAssessment({ ...assessment, malariaRdtResult: res })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            assessment.malariaRdtResult === res
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100/50'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Duration & Symptoms */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Illness Duration
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={assessment.symptomDurationDays || ''}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 1;
                          setAssessment({ ...assessment, symptomDurationDays: val });
                        }}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">Days</span>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Observed Clinical Symptoms
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCondition.commonSymptoms.map((sym, idx) => {
                        const isChecked = assessment.symptoms.includes(sym);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleToggleSymptom(sym)}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                              isChecked
                                ? 'bg-emerald-700 text-white font-semibold'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {isChecked ? `✓ ${sym}` : `+ ${sym}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinical Examination Notes / Context
                  </label>
                  <textarea
                    rows={2}
                    value={assessment.clinicalObservations}
                    onChange={e => setAssessment({ ...assessment, clinicalObservations: e.target.value })}
                    placeholder="Enter physical findings (e.g. chest clear, throat mildly erythematous, abdomen soft)..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Right Column: Danger Signs Screening (Crucial Rural Safety Gate) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                2. Danger Signs Triage
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check any WHO / IMCI emergency signs. Immediate referral is mandatory if present.
              </p>
            </div>

            {/* Checklist of Danger Signs */}
            <div className="space-y-2">
              {IMCI_DANGER_SIGNS.map(ds => {
                const isChecked = assessment.dangerSigns.includes(ds.id);
                return (
                  <label
                    key={ds.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                      isChecked
                        ? 'bg-red-50 border-red-400 text-red-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleDangerSign(ds.id)}
                      className="w-4 h-4 mt-0.5 text-red-600 rounded border-slate-300 focus:ring-red-500 shrink-0"
                    />
                    <div>
                      <p className="leading-tight">{ds.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-normal">{ds.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Danger Sign Alert Callout */}
            {hasDangerSigns ? (
              <div className="p-3.5 bg-red-100 border border-red-300 rounded-xl text-red-900 space-y-2 animate-pulse">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <ShieldAlert className="w-4 h-4 text-red-700" />
                  EMERGENCY RED FLAG ACTIVE
                </div>
                <p className="text-xs leading-relaxed">
                  <strong>{assessment.dangerSigns.length} danger sign(s) detected.</strong> Routine oral medicines will be withheld. The next interface will guide pre-referral stabilization and urgent transfer.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No red-flag emergency signs reported. Eligible for primary outpatient dispensing.</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Biodata</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition shadow-sm ${
            canProceed
              ? hasDangerSigns
                ? 'bg-red-700 hover:bg-red-800 text-white cursor-pointer'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer hover:shadow'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>
            {hasDangerSigns ? 'View Emergency Referral Protocol' : 'Generate Prescription Protocol'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  ClinicalAssessment, 
  DangerSignAlert, 
  PatientBiodata, 
  PrescriptionItem 
} from '../types/clinical';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Ambulance, 
  ArrowLeft, 
  ArrowRight, 
  Baby, 
  Check, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  FileText, 
  HelpCircle, 
  Info, 
  Pill, 
  Plus, 
  HeartPulse,
  ShieldAlert, 
  ShieldCheck, 
  Trash2, 
  User, 
  Volume2 
} from 'lucide-react';

interface Screen3PrescriptionProps {
  patient: PatientBiodata;
  assessment: ClinicalAssessment;
  prescriptions: PrescriptionItem[];
  setPrescriptions: React.Dispatch<React.SetStateAction<PrescriptionItem[]>>;
  dangerAlert: DangerSignAlert;
  counseling: string[];
  clinicalRationale: string[];
  onNext: () => void;
  onBack: () => void;
}

export const Screen3Prescription: React.FC<Screen3PrescriptionProps> = ({
  patient,
  assessment,
  prescriptions,
  setPrescriptions,
  dangerAlert,
  counseling,
  clinicalRationale,
  onNext,
  onBack
}) => {
  const isChild = patient.age !== null && patient.age < 12;
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customDrug, setCustomDrug] = useState({
    drugName: '',
    formulation: isChild ? 'Pediatric Syrup' : 'Tablets',
    dosage: '',
    frequency: 'TDS (Every 8 hours)',
    duration: '5 days',
    totalQuantity: '1 unit',
    instructions: 'Take as directed by health worker'
  });

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDrug.drugName.trim()) return;

    const newItem: PrescriptionItem = {
      id: `custom-${Date.now()}`,
      drugName: customDrug.drugName,
      genericName: customDrug.drugName,
      formulation: customDrug.formulation,
      route: 'Oral',
      dosage: customDrug.dosage || 'As directed',
      frequency: customDrug.frequency,
      duration: customDrug.duration,
      totalQuantity: customDrug.totalQuantity,
      instructions: customDrug.instructions,
      guidelineTier: 'Clinician Adjusted Item',
      type: 'supportive'
    };

    setPrescriptions([...prescriptions, newItem]);
    setCustomDrug({
      drugName: '',
      formulation: isChild ? 'Pediatric Syrup' : 'Tablets',
      dosage: '',
      frequency: 'TDS (Every 8 hours)',
      duration: '5 days',
      totalQuantity: '1 unit',
      instructions: 'Take as directed'
    });
    setShowAddCustom(false);
  };

  const handleRemoveItem = (id: string) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  // IF CRITICAL DANGER SIGNS DETECTED: Show the Emergency Referral Interface
  if (dangerAlert.isTriggered) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Urgent Referral Banner */}
        <div className="bg-red-700 text-white rounded-2xl p-6 shadow-md border border-red-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-800 border border-red-600 flex items-center justify-center shrink-0">
              <Ambulance className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-red-900/80 px-2 py-0.5 rounded text-red-200">
                Primary Healthcare Emergency Protocol
              </span>
              <h2 className="text-2xl font-black mt-1 tracking-tight">
                CRITICAL REFERRAL REQUIRED: Emergency Transfer Protocol
              </h2>
              <p className="text-sm text-red-100 mt-1 leading-relaxed">
                Standard oral outpatient dispensing is <strong>strictly contraindicated</strong> at this rural clinic level. Danger signs indicate high mortality risk or impaired oral absorption.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-red-600/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-red-800/60 p-3 rounded-lg border border-red-600/50">
              <span className="font-bold text-red-200 block mb-1">Identified Danger Signs:</span>
              <ul className="list-disc list-inside space-y-0.5 text-white">
                {dangerAlert.presentSigns.map((s, idx) => (
                  <li key={idx} className="font-medium">{s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-800/60 p-3 rounded-lg border border-red-600/50">
              <span className="font-bold text-red-200 block mb-1">Target Facility:</span>
              <p className="text-white font-medium">{dangerAlert.referralFacilityType}</p>
              <p className="text-red-200 text-[11px] mt-1">Initiate emergency transport vehicle or community dispatch.</p>
            </div>
          </div>
        </div>

        {/* Immediate Pre-Referral Clinical Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            Authorized Pre-Referral Stabilization Interventions
          </h3>
          <p className="text-xs text-slate-500">
            Provide only immediate pre-referral stabilization before patient departs. Document exact time and dose administered.
          </p>

          <div className="space-y-2.5">
            {dangerAlert.prereferralTreatment.map((action, idx) => (
              <div key={idx} className="p-3 bg-red-50/70 border border-red-200 rounded-lg text-xs text-red-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-200 text-red-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <p className="leading-relaxed font-medium">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Safety Checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            En-Route Stabilization Checklist
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {dangerAlert.stabilizationProtocol.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Assessment</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <span>Generate Official Referral Voucher</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    );
  }

  // STANDARD CLINICAL DECISION SUPPORT INTERFACE (No Danger Signs)
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Decision Engine Rationale Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Decision Support Output
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                  isChild ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {isChild ? 'PEDIATRIC DOSING' : 'ADULT DOSING'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              Recommended Prescription: {assessment.diagnosisId}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Patient:</span>
            <span className="font-bold text-slate-800">{patient.fullName}</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-slate-600">{patient.age} yrs</span>
            {patient.weightKg && (
              <>
                <span className="text-slate-400">·</span>
                <span className="font-mono font-semibold text-slate-800">{patient.weightKg} kg</span>
              </>
            )}
          </div>
        </div>

        {/* Clinical Rationale Badges */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {clinicalRationale.map((rat, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{rat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription Items Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Pill className="w-4 h-4 text-emerald-700" />
            Standardized Medication Regimen ({prescriptions.length} items)
          </h3>
          <button
            type="button"
            onClick={() => setShowAddCustom(!showAddCustom)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Additional Medicine</span>
          </button>
        </div>

        {/* Add custom medication form modal/inline */}
        {showAddCustom && (
          <form onSubmit={handleAddCustom} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase">
                Add Clinic In-Stock Medicine
              </span>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Medication Name</label>
                <input
                  type="text"
                  required
                  value={customDrug.drugName}
                  onChange={e => setCustomDrug({ ...customDrug, drugName: e.target.value })}
                  placeholder="e.g. Multivitamin Syrup"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Formulation</label>
                <input
                  type="text"
                  value={customDrug.formulation}
                  onChange={e => setCustomDrug({ ...customDrug, formulation: e.target.value })}
                  placeholder="e.g. Syrup 100ml"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Dosage & Frequency</label>
                <input
                  type="text"
                  value={customDrug.dosage}
                  onChange={e => setCustomDrug({ ...customDrug, dosage: e.target.value })}
                  placeholder="e.g. 5ml once daily"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold"
              >
                Add to Prescription
              </button>
            </div>
          </form>
        )}

        {/* Prescription List */}
        {prescriptions.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition hover:border-slate-300 space-y-3"
          >
            {/* Item Title & Tier */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center font-mono">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-tight">
                    {item.drugName}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Generic: {item.genericName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.isSubstitutedForAllergy && (
                  <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-red-100 text-red-800 border border-red-200">
                    Allergy Substitute
                  </span>
                )}
                {item.pregnancySafetyNote && (
                  <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                    Pregnancy Safe
                  </span>
                )}
                <span className="text-[11px] px-2 py-0.5 rounded font-mono font-medium bg-slate-100 text-slate-600">
                  {item.guidelineTier}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dosing Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400 font-medium block text-[11px]">Formulation:</span>
                <span className="font-semibold text-slate-800">{item.formulation}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[11px]">Calculated Dosage:</span>
                <span className="font-bold text-emerald-800 font-mono">{item.dosage}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[11px]">Frequency:</span>
                <span className="font-semibold text-slate-800">{item.frequency}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[11px]">Duration & Quantity:</span>
                <span className="font-semibold text-slate-800 font-mono">
                  {item.duration} · {item.totalQuantity}
                </span>
              </div>
            </div>

            {/* Instructions & Counseling */}
            <div className="text-xs text-slate-600 leading-relaxed bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/60 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Dispensing & Patient Instructions: </span>
                <span>{item.instructions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supportive Care & Home Counseling Guidance */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-emerald-700" />
          Supportive Care & Patient Counseling
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-700">
          {counseling.map((c, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold transition shadow-sm hover:shadow"
        >
          <span>Review Official Dispensing Slip</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

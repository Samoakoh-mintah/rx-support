import React, { useState } from 'react';
import { 
  ClinicalAssessment, 
  ConsultationRecord, 
  DangerSignAlert, 
  PatientBiodata, 
  PrescriptionItem 
} from '../types/clinical';
import { 
  Printer, 
  Download, 
  Save, 
  RotateCcw, 
  Check, 
  ArrowLeft, 
  Building2, 
  AlertTriangle, 
  Ambulance, 
  CheckCircle2, 
  FileText,
  UserCheck
} from 'lucide-react';

interface Screen4DispensingSlipProps {
  patient: PatientBiodata;
  assessment: ClinicalAssessment;
  prescriptions: PrescriptionItem[];
  dangerAlert: DangerSignAlert;
  counseling: string[];
  clinicInfo: {
    facilityName: string;
    district: string;
    region?: string;
    accreditationCode?: string;
    providerName: string;
    cadre: string;
    pin: string;
  };
  onSaveRecord: (record: ConsultationRecord) => void;
  onReset: () => void;
  onBack: () => void;
}

export const Screen4DispensingSlip: React.FC<Screen4DispensingSlipProps> = ({
  patient,
  assessment,
  prescriptions,
  dangerAlert,
  counseling,
  clinicInfo,
  onSaveRecord,
  onReset,
  onBack
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dispenseChecklist, setDispenseChecklist] = useState<Record<string, boolean>>({});

  const isChild = patient.age !== null && patient.age < 12;
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const recordId = `RX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const toggleCheck = (id: string) => {
    setDispenseChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const buildRecordPayload = (): ConsultationRecord => {
    return {
      id: recordId,
      createdAt: new Date().toISOString(),
      patient,
      assessment,
      prescriptions,
      dangerAlert,
      clinicalNotes: assessment.clinicalObservations || 'Standard consultation',
      provider: clinicInfo,
      status: dangerAlert.isTriggered ? 'Referred' : 'Prescribed'
    };
  };

  const handleSave = () => {
    const record = buildRecordPayload();
    onSaveRecord(record);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportJSON = () => {
    const record = buildRecordPayload();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `clinical_record_${patient.healthId || patient.fullName.replace(/\s+/g, '_')}_${recordId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Regimen</span>
          </button>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs font-bold text-slate-800">
            {dangerAlert.isTriggered ? 'Emergency Referral Voucher' : 'Dispensing Slip Preview'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Voucher</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              savedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved to Register!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save to Register</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Patient</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE SLIP CONTAINER */}
      <div
        id="printable-slip"
        className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-sm space-y-6 text-slate-900"
      >
        
        {/* Slip Header */}
        <div className="border-b-2 border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  {clinicInfo.facilityName || 'Primary Health Post'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                District: {clinicInfo.district || 'Rural Health Directorate'} · Clinical Decision Support System
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Attending: {clinicInfo.providerName} ({clinicInfo.cadre}) · Staff PIN: {clinicInfo.pin}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-0.5">
              <div className="font-mono font-bold text-slate-900 text-sm">
                REF: {recordId}
              </div>
              <div className="text-slate-600">Date: {currentDate} · {currentTime}</div>
              <div className="text-[11px] font-bold uppercase text-emerald-800">
                {dangerAlert.isTriggered ? 'STATUS: EMERGENCY REFERRAL' : 'STATUS: DISPENSED OUTPATIENT'}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Demographics Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Patient Name:</span>
            <span className="font-bold text-slate-900 text-sm">{patient.fullName}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Health ID / OPD No:</span>
            <span className="font-mono font-semibold text-slate-900">{patient.healthId || 'N/A'}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Age & Cohort:</span>
            <span className="font-semibold text-slate-900 font-mono">
              {patient.age} yrs ({isChild ? 'CHILD < 12' : 'ADULT ≥ 12'})
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Gender & Weight:</span>
            <span className="font-semibold text-slate-900">
              {patient.gender} {patient.weightKg ? `· ${patient.weightKg} kg` : ''}
              {patient.isPregnant ? ' (Pregnant)' : ''}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Known Allergies:</span>
            <span className={`font-semibold ${patient.knownAllergies.length > 0 ? 'text-red-700' : 'text-slate-700'}`}>
              {patient.knownAllergies.length > 0 ? patient.knownAllergies.join(', ') : 'None Reported'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Provisional Diagnosis:</span>
            <span className="font-bold text-slate-900">{assessment.diagnosisId}</span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Vitals:</span>
            <span className="font-mono text-slate-700">
              {patient.vitals.temperatureC ? `${patient.vitals.temperatureC}°C ` : ''}
              {patient.vitals.systolicBp ? `${patient.vitals.systolicBp}/${patient.vitals.diastolicBp}mmHg` : ''}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Community:</span>
            <span className="text-slate-700">{patient.communityLocation || 'Local Catchment'}</span>
          </div>
        </div>

        {/* IF EMERGENCY REFERRAL */}
        {dangerAlert.isTriggered ? (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-950 space-y-2">
              <div className="flex items-center gap-2 font-black text-sm uppercase text-red-900">
                <Ambulance className="w-5 h-5 text-red-700" />
                Urgent Patient Transfer Mandate
              </div>
              <p className="text-xs font-semibold">
                Reason for Referral: Patient exhibits critical danger signs requiring emergency hospital stabilization.
              </p>
              <div className="text-xs">
                <span className="font-bold">Presenting Danger Signs: </span>
                <span>{dangerAlert.presentSigns.join('; ')}</span>
              </div>
              <div className="text-xs">
                <span className="font-bold">Destination Facility: </span>
                <span>{dangerAlert.referralFacilityType}</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase block">
                Pre-Referral Treatment Given at Primary Facility:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {dangerAlert.prereferralTreatment.map((p, idx) => (
                  <li key={idx} className="font-medium">{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* STANDARD DISPENSING TABLE */
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-1">
              Prescription & Dispensing Schedule (Rx)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 bg-slate-100 text-slate-700">
                    <th className="py-2 px-3 font-bold w-8">#</th>
                    <th className="py-2 px-3 font-bold">Medicine & Formulation</th>
                    <th className="py-2 px-3 font-bold">Dose & Frequency</th>
                    <th className="py-2 px-3 font-bold">Duration</th>
                    <th className="py-2 px-3 font-bold">Qty</th>
                    <th className="py-2 px-3 font-bold">Patient Directions</th>
                    <th className="py-2 px-3 font-bold text-center w-16">Dispensed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {prescriptions.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{item.drugName}</div>
                        <div className="text-[11px] text-slate-500">{item.formulation}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        <div className="font-bold text-emerald-800">{item.dosage}</div>
                        <div className="text-[11px] text-slate-600">{item.frequency}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-medium">{item.duration}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{item.totalQuantity}</td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600 leading-tight">
                        {item.instructions}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={Boolean(dispenseChecklist[item.id])}
                          onChange={() => toggleCheck(item.id)}
                          className="w-4 h-4 text-emerald-600 rounded border-slate-400 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Supportive Counseling on Slip */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-800 block">Patient Counseling Summary:</span>
              <p className="leading-relaxed">
                • {counseling.slice(0, 3).join(' • ')}
              </p>
              <p className="font-bold text-red-700 pt-0.5">
                Return immediately to the clinic if patient becomes unable to drink, vomits everything, has seizures, or condition worsens.
              </p>
            </div>
          </div>
        )}

        {/* Signature & Verification Block */}
        <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div>
            <div className="border-b border-slate-400 pb-8 mb-1"></div>
            <p className="font-bold text-slate-800">Prescriber / Health Worker Signature</p>
            <p className="text-[11px] text-slate-500">
              {clinicInfo.providerName} ({clinicInfo.cadre}) · PIN: {clinicInfo.pin}
            </p>
          </div>

          <div>
            <div className="border-b border-slate-400 pb-8 mb-1"></div>
            <p className="font-bold text-slate-800">Dispenser / CHO Sign-off & Stamp</p>
            <p className="text-[11px] text-slate-500">
              Verified formulation, child/adult dosing, and contraindications.
            </p>
          </div>
        </div>

      </div>

      {/* Completion CTA */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between no-print">
        <div className="flex items-center gap-2 text-xs text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>
            Consultation complete. You can print the voucher or save the record to the offline register.
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
        >
          Begin Next Consultation
        </button>
      </div>

    </div>
  );
};

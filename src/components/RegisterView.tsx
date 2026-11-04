import React, { useState } from 'react';
import { ConsultationRecord } from '../types/clinical';
import { 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  FileText, 
  Baby, 
  User, 
  Ambulance, 
  CheckCircle2, 
  Filter,
  ArrowRight
} from 'lucide-react';

interface RegisterViewProps {
  records: ConsultationRecord[];
  onClearRecords: () => void;
  onSelectRecordToView: (record: ConsultationRecord) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  records,
  onClearRecords,
  onSelectRecordToView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCohort, setFilterCohort] = useState<'all' | 'child' | 'adult'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Prescribed' | 'Referred'>('all');

  const filteredRecords = records.filter(rec => {
    const matchesSearch = 
      rec.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.patient.healthId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.assessment.diagnosisId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase());

    const isChild = rec.patient.age !== null && rec.patient.age < 12;
    const matchesCohort = 
      filterCohort === 'all' || 
      (filterCohort === 'child' && isChild) || 
      (filterCohort === 'adult' && !isChild);

    const matchesStatus = 
      filterStatus === 'all' || 
      rec.status === filterStatus;

    return matchesSearch && matchesCohort && matchesStatus;
  });

  const handleExportAllJSON = () => {
    if (records.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `clinical_register_batch_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            Patient Consultation Log & Offline Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Locally stored patient records and dispensing history. Works completely offline on this device.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportAllJSON}
            disabled={records.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              records.length > 0
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Batch ({records.length} records)</span>
          </button>

          {records.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all locally saved patient records? Make sure you have exported them first.')) {
                  onClearRecords();
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID, or diagnosis..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Segmented Filter Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          {/* Cohort filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setFilterCohort('all')}
              className={`px-2.5 py-1 rounded-md transition ${filterCohort === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
            >
              All Cohorts
            </button>
            <button
              onClick={() => setFilterCohort('child')}
              className={`px-2.5 py-1 rounded-md transition ${filterCohort === 'child' ? 'bg-white text-blue-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
            >
              Kids (&lt;12)
            </button>
            <button
              onClick={() => setFilterCohort('adult')}
              className={`px-2.5 py-1 rounded-md transition ${filterCohort === 'adult' ? 'bg-white text-indigo-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
            >
              Adults (≥12)
            </button>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-md transition ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
            >
              All Status
            </button>
            <button
              onClick={() => setFilterStatus('Prescribed')}
              className={`px-2.5 py-1 rounded-md transition ${filterStatus === 'Prescribed' ? 'bg-white text-emerald-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
            >
              Prescribed
            </button>
            <button
              onClick={() => setFilterStatus('Referred')}
              className={`px-2.5 py-1 rounded-md transition ${filterStatus === 'Referred' ? 'bg-white text-red-900 shadow-xs font-semibold' : 'hover:text-slate-900'}`}
            >
              Referred
            </button>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">No Patient Consultations in Log</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {records.length === 0
                ? 'When you complete a consultation and save the prescription slip, it will appear here in the offline register.'
                : 'No records matched your search filters.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-4 font-bold">Date & Time</th>
                  <th className="py-3 px-4 font-bold">Patient Name</th>
                  <th className="py-3 px-4 font-bold">Cohort</th>
                  <th className="py-3 px-4 font-bold">Health ID</th>
                  <th className="py-3 px-4 font-bold">Diagnosis</th>
                  <th className="py-3 px-4 font-bold">Prescription Items</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map(rec => {
                  const isChild = rec.patient.age !== null && rec.patient.age < 12;
                  const dateFormatted = new Date(rec.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {dateFormatted}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{rec.patient.fullName}</div>
                        <div className="text-[11px] text-slate-500">
                          {rec.patient.gender} · {rec.patient.age} yrs
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isChild ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {isChild ? <Baby className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {isChild ? 'Child (<12)' : 'Adult (≥12)'}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-700">
                        {rec.patient.healthId || '—'}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">
                          {rec.assessment.diagnosisId}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                        {rec.dangerAlert.isTriggered ? (
                          <span className="text-red-700 font-semibold flex items-center gap-1">
                            <Ambulance className="w-3.5 h-3.5" /> Emergency Referral
                          </span>
                        ) : (
                          rec.prescriptions.map(p => p.drugName).join(', ')
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                            rec.status === 'Referred'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => onSelectRecordToView(rec)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-md font-semibold text-xs transition"
                        >
                          View Slip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

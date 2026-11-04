import React, { useState } from 'react';
import { X, Building2, Save, User, ShieldCheck } from 'lucide-react';
import { HealthFacility, HealthProfessional } from '../types/clinical';

interface ClinicSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: HealthFacility;
  professional: HealthProfessional;
  onSave: (facility: HealthFacility, professional: HealthProfessional) => void;
}

export const ClinicSettingsModal: React.FC<ClinicSettingsModalProps> = ({
  isOpen,
  onClose,
  facility,
  professional,
  onSave
}) => {
  const [facData, setFacData] = useState<HealthFacility>(facility);
  const [profData, setProfData] = useState<HealthProfessional>(professional);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(facData, profData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="font-bold text-base">Facility & Practitioner Profile</h3>
              <p className="text-xs text-emerald-200">Local clinic workstation parameters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          
          <div className="space-y-3 pb-3 border-b border-slate-200">
            <span className="font-bold uppercase text-slate-600 block text-[11px] tracking-wider">
              Health Facility Identification
            </span>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Facility / CHPS Compound Name
              </label>
              <input
                type="text"
                required
                value={facData.name}
                onChange={e => setFacData({ ...facData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  required
                  value={facData.district}
                  onChange={e => setFacData({ ...facData, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Region</label>
                <input
                  type="text"
                  required
                  value={facData.region}
                  onChange={e => setFacData({ ...facData, region: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facility Level</label>
                <input
                  type="text"
                  value={facData.facilityType}
                  onChange={e => setFacData({ ...facData, facilityType: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Accreditation Code</label>
                <input
                  type="text"
                  value={facData.accreditationCode}
                  onChange={e => setFacData({ ...facData, accreditationCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-medium"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <span className="font-bold uppercase text-slate-600 block text-[11px] tracking-wider">
              Practitioner Registration
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Practitioner Name
                </label>
                <input
                  type="text"
                  required
                  value={profData.fullName}
                  onChange={e => setProfData({ ...profData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Council PIN
                </label>
                <input
                  type="text"
                  required
                  value={profData.registrationPin}
                  onChange={e => setProfData({ ...profData, registrationPin: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Clinical Cadre
              </label>
              <select
                value={profData.cadre}
                onChange={e => setProfData({ ...profData, cadre: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Community Health Officer (CHO)">Community Health Officer (CHO)</option>
                <option value="Community Health Nurse (CHN) / Registered General Nurse">Community Health Nurse (CHN) / RGN</option>
                <option value="Staff Midwife (Maternal & Reproductive Care)">Staff Midwife (RM)</option>
                <option value="Physician Assistant (Medical)">Physician Assistant (PA)</option>
                <option value="Medicine Counter Assistant / Dispensing Technician">Medicine Counter Assistant / Dispenser</option>
                <option value="Medical Doctor">Medical Doctor</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

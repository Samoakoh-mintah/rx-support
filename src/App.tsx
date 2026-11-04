/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  AuthSession,
  ClinicalAssessment, 
  ConsultationRecord, 
  DangerSignAlert, 
  HealthFacility,
  HealthProfessional,
  PatientBiodata, 
  PrescriptionItem 
} from './types/clinical';
import { 
  generatePrescriptionDecision, 
  PRESET_FACILITIES,
  PRESET_PROFESSIONALS,
  SAMPLE_PATIENTS 
} from './data/clinicalGuidelines';
import { LoginScreen } from './components/LoginScreen';
import { SessionLockModal } from './components/SessionLockModal';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { Screen1Biodata } from './components/Screen1Biodata';
import { Screen2Assessment } from './components/Screen2Assessment';
import { Screen3Prescription } from './components/Screen3Prescription';
import { Screen4DispensingSlip } from './components/Screen4DispensingSlip';
import { RegisterView } from './components/RegisterView';
import { FormularyView } from './components/FormularyView';
import { ClinicSettingsModal } from './components/ClinicSettingsModal';

const INITIAL_PATIENT: PatientBiodata = {
  fullName: '',
  healthId: '',
  age: null,
  ageUnit: 'years',
  gender: 'Female',
  cohort: 'adult',
  weightKg: null,
  isPregnant: false,
  isLactating: false,
  knownAllergies: [],
  chronicConditions: [],
  vitals: {
    temperatureC: undefined,
    systolicBp: undefined,
    diastolicBp: undefined,
    pulseBpm: undefined,
    respiratoryRate: undefined
  },
  communityLocation: ''
};

const INITIAL_ASSESSMENT: ClinicalAssessment = {
  diagnosisId: 'MALARIA',
  symptoms: ['Fever / Chills', 'Headache'],
  symptomDurationDays: 2,
  dangerSigns: [],
  clinicalObservations: '',
  malariaRdtResult: 'Positive'
};

export default function App() {
  // Authentication & Facility Session State
  const [session, setSession] = useState<AuthSession | null>(() => {
    try {
      const saved = localStorage.getItem('ruralrx_auth_session_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'consultation' | 'register' | 'formulary'>('consultation');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachableStep, setMaxReachableStep] = useState<number>(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Clinical Consultation State
  const [patient, setPatient] = useState<PatientBiodata>(INITIAL_PATIENT);
  const [assessment, setAssessment] = useState<ClinicalAssessment>(INITIAL_ASSESSMENT);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([]);
  const [dangerAlert, setDangerAlert] = useState<DangerSignAlert>({
    isTriggered: false,
    severity: 'NORMAL',
    presentSigns: [],
    prereferralTreatment: [],
    stabilizationProtocol: [],
    referralFacilityType: ''
  });
  const [counseling, setCounseling] = useState<string[]>([]);
  const [clinicalRationale, setClinicalRationale] = useState<string[]>([]);

  // Persistent Consultation Records State
  const [records, setRecords] = useState<ConsultationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ruralrx_records_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save session & records to localStorage
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem('ruralrx_auth_session_v2', JSON.stringify(session));
      } else {
        localStorage.removeItem('ruralrx_auth_session_v2');
      }
    } catch (e) {
      console.warn('LocalStorage session save failed', e);
    }
  }, [session]);

  useEffect(() => {
    try {
      localStorage.setItem('ruralrx_records_v2', JSON.stringify(records));
    } catch (e) {
      console.warn('LocalStorage records save failed', e);
    }
  }, [records]);

  // Handle Login
  const handleLoginSuccess = (facility: HealthFacility, professional: HealthProfessional) => {
    const newSession: AuthSession = {
      isAuthenticated: true,
      isLocked: false,
      facility,
      professional,
      loginTimestamp: new Date().toISOString()
    };
    setSession(newSession);
  };

  // Handle Lock
  const handleLockSession = () => {
    if (!session) return;
    setSession({
      ...session,
      isLocked: true
    });
  };

  // Handle Unlock
  const handleUnlockSession = () => {
    if (!session) return;
    setSession({
      ...session,
      isLocked: false
    });
  };

  // Handle Logout
  const handleLogout = () => {
    setSession(null);
  };

  // Handle Settings Update
  const handleSaveSettings = (facility: HealthFacility, professional: HealthProfessional) => {
    if (!session) return;
    setSession({
      ...session,
      facility,
      professional
    });
  };

  // Compute decisions whenever advancing to Step 3
  const computeAndAdvanceToPrescription = () => {
    const decision = generatePrescriptionDecision(
      patient,
      assessment.diagnosisId,
      assessment.dangerSigns
    );
    setPrescriptions(decision.prescriptions);
    setDangerAlert(decision.dangerAlert);
    setCounseling(decision.counseling);
    setClinicalRationale(decision.clinicalRationale);

    setCurrentStep(3);
    setMaxReachableStep(prev => Math.max(prev, 3));
  };

  const handleApplyPreset = (sampleData: PatientBiodata) => {
    setPatient(sampleData);
    setAssessment(prev => ({
      ...prev,
      diagnosisId: sampleData.age !== null && sampleData.age < 12 ? 'MALARIA' : 'RTI',
      dangerSigns: []
    }));
  };

  const handleSaveRecord = (newRecord: ConsultationRecord) => {
    setRecords(prev => [newRecord, ...prev]);
  };

  const handleClearRecords = () => {
    setRecords([]);
  };

  const handleResetConsultation = () => {
    setPatient(INITIAL_PATIENT);
    setAssessment(INITIAL_ASSESSMENT);
    setPrescriptions([]);
    setDangerAlert({
      isTriggered: false,
      severity: 'NORMAL',
      presentSigns: [],
      prereferralTreatment: [],
      stabilizationProtocol: [],
      referralFacilityType: ''
    });
    setCurrentStep(1);
    setMaxReachableStep(1);
    setActiveTab('consultation');
  };

  const handleViewRecordFromRegister = (record: ConsultationRecord) => {
    setPatient(record.patient);
    setAssessment(record.assessment);
    setPrescriptions(record.prescriptions);
    setDangerAlert(record.dangerAlert);
    setCurrentStep(4);
    setMaxReachableStep(4);
    setActiveTab('consultation');
  };

  // IF NOT AUTHENTICATED: SHOW HEALTH PROFESSIONAL & FACILITY LOGIN INTERFACE
  if (!session || !session.isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        savedFacility={session?.facility || PRESET_FACILITIES[0]}
        savedProfessional={session?.professional || PRESET_PROFESSIONALS[0]}
      />
    );
  }

  // Clinic metadata for slips and record export
  const activeClinicInfo = {
    facilityName: session.facility.name,
    district: session.facility.district,
    region: session.facility.region,
    accreditationCode: session.facility.accreditationCode,
    providerName: session.professional.fullName,
    cadre: session.professional.cadre,
    pin: session.professional.registrationPin
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Session Lock Screen Overlay */}
      <SessionLockModal
        isOpen={session.isLocked}
        facility={session.facility}
        professional={session.professional}
        onUnlock={handleUnlockSession}
        onLogout={handleLogout}
      />

      {/* Universal Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={records.length}
        facility={session.facility}
        professional={session.professional}
        onLockSession={handleLockSession}
        onLogout={handleLogout}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'consultation' && (
          <div>
            {/* Step Indicator Header */}
            <StepIndicator
              currentStep={currentStep}
              onSelectStep={step => setCurrentStep(step)}
              maxReachableStep={maxReachableStep}
            />

            {/* Step Interfaces with distinct layouts and smooth transitions */}
            <div className="px-4 sm:px-6 lg:px-8 pt-6">
              
              {/* INTERFACE 1: PATIENT REGISTRATION & BIODATA */}
              {currentStep === 1 && (
                <div className="transition-opacity duration-200">
                  <Screen1Biodata
                    patient={patient}
                    setPatient={setPatient}
                    onNext={() => {
                      setCurrentStep(2);
                      setMaxReachableStep(prev => Math.max(prev, 2));
                    }}
                    onApplyPreset={handleApplyPreset}
                  />
                </div>
              )}

              {/* INTERFACE 2: CLINICAL ASSESSMENT & SAFETY TRIAGE */}
              {currentStep === 2 && (
                <div className="transition-opacity duration-200">
                  <Screen2Assessment
                    patient={patient}
                    assessment={assessment}
                    setAssessment={setAssessment}
                    onNext={computeAndAdvanceToPrescription}
                    onBack={() => setCurrentStep(1)}
                  />
                </div>
              )}

              {/* INTERFACE 3: PRESCRIPTION DECISION SUPPORT ENGINE */}
              {currentStep === 3 && (
                <div className="transition-opacity duration-200">
                  <Screen3Prescription
                    patient={patient}
                    assessment={assessment}
                    prescriptions={prescriptions}
                    setPrescriptions={setPrescriptions}
                    dangerAlert={dangerAlert}
                    counseling={counseling}
                    clinicalRationale={clinicalRationale}
                    onNext={() => {
                      setCurrentStep(4);
                      setMaxReachableStep(prev => Math.max(prev, 4));
                    }}
                    onBack={() => setCurrentStep(2)}
                  />
                </div>
              )}

              {/* INTERFACE 4: OFFICIAL DISPENSING SLIP & RECORD REVIEW */}
              {currentStep === 4 && (
                <div className="transition-opacity duration-200">
                  <Screen4DispensingSlip
                    patient={patient}
                    assessment={assessment}
                    prescriptions={prescriptions}
                    dangerAlert={dangerAlert}
                    counseling={counseling}
                    clinicInfo={activeClinicInfo}
                    onSaveRecord={handleSaveRecord}
                    onReset={handleResetConsultation}
                    onBack={() => setCurrentStep(3)}
                  />
                </div>
              )}

            </div>
          </div>
        )}

        {/* REGISTER & LOG VIEW */}
        {activeTab === 'register' && (
          <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <RegisterView
              records={records}
              onClearRecords={handleClearRecords}
              onSelectRecordToView={handleViewRecordFromRegister}
            />
          </div>
        )}

        {/* GUIDELINES & FORMULARY VIEW */}
        {activeTab === 'formulary' && (
          <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <FormularyView />
          </div>
        )}
      </main>

      {/* Clinic Settings & Staff PIN Modal */}
      <ClinicSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        facility={session.facility}
        professional={session.professional}
        onSave={handleSaveSettings}
      />

    </div>
  );
}

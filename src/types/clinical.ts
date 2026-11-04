/**
 * Clinical data models and types for the Rural Prescription Decision Support System.
 */

export type AgeCohort = 'child' | 'adult';

export interface Vitals {
  temperatureC?: number;
  systolicBp?: number;
  diastolicBp?: number;
  pulseBpm?: number;
  respiratoryRate?: number;
  weightKg?: number;
  heightCm?: number;
}

export interface PatientBiodata {
  fullName: string;
  healthId: string;
  age: number | null;
  ageUnit: 'years' | 'months';
  gender: 'Male' | 'Female';
  cohort: AgeCohort;
  weightKg: number | null;
  isPregnant: boolean;
  isLactating: boolean;
  knownAllergies: string[];
  chronicConditions: string[];
  vitals: Vitals;
  contactNumber?: string;
  communityLocation?: string;
}

export interface ClinicalAssessment {
  diagnosisId: string;
  symptoms: string[];
  symptomDurationDays: number;
  dangerSigns: string[];
  clinicalObservations: string;
  malariaRdtResult?: 'Positive' | 'Negative' | 'Not Done';
}

export interface PrescriptionItem {
  id: string;
  drugName: string;
  genericName: string;
  formulation: string;
  route: string;
  dosage: string;
  frequency: string;
  duration: string;
  totalQuantity: string;
  instructions: string;
  guidelineTier: string;
  isSubstitutedForAllergy?: boolean;
  allergyNotice?: string;
  pregnancySafetyNote?: string;
  type: 'essential' | 'supportive' | 'co-intervention';
}

export interface DangerSignAlert {
  isTriggered: boolean;
  severity: 'CRITICAL_EMERGENCY' | 'URGENT_REFERRAL' | 'NORMAL';
  presentSigns: string[];
  prereferralTreatment: string[];
  stabilizationProtocol: string[];
  referralFacilityType: string;
}

export interface HealthFacility {
  id: string;
  name: string;
  facilityType: string;
  district: string;
  region: string;
  accreditationCode: string;
}

export interface HealthProfessional {
  id: string;
  fullName: string;
  cadre: string;
  registrationPin: string;
  passcode: string;
  facilityId: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  isLocked: boolean;
  facility: HealthFacility;
  professional: HealthProfessional;
  loginTimestamp: string;
}

export interface ConsultationRecord {
  id: string;
  createdAt: string;
  patient: PatientBiodata;
  assessment: ClinicalAssessment;
  prescriptions: PrescriptionItem[];
  dangerAlert: DangerSignAlert;
  clinicalNotes: string;
  provider: {
    providerName: string;
    cadre: string;
    pin: string;
    facilityName: string;
    district: string;
    accreditationCode?: string;
  };
  status: 'Prescribed' | 'Dispensed' | 'Referred';
}

export interface ConditionGuideline {
  id: string;
  title: string;
  icdCode: string;
  category: string;
  description: string;
  commonSymptoms: string[];
  redFlags: string[];
  recommendations: {
    child: {
      firstLine: PrescriptionItem[];
      penicillinAllergic: PrescriptionItem[];
      supportiveCare: string[];
    };
    adult: {
      firstLine: PrescriptionItem[];
      penicillinAllergic: PrescriptionItem[];
      pregnancySafe?: PrescriptionItem[];
      supportiveCare: string[];
    };
  };
  counselingPoints: string[];
}

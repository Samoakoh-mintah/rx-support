import { 
  ConditionGuideline, 
  DangerSignAlert, 
  HealthFacility, 
  HealthProfessional, 
  PatientBiodata, 
  PrescriptionItem 
} from '../types/clinical';

export const COMMON_ALLERGIES = [
  'Penicillins (Amoxicillin, Ampicillin, Pen V)',
  'Sulfa Drugs (Co-trimoxazole, Fansidar)',
  'NSAIDs (Aspirin, Ibuprofen, Diclofenac)',
  'Cephalosporins (Cefuroxime, Cefixime)',
  'Quinolones (Ciprofloxacin, Levofloxacin)',
  'Macrolides (Erythromycin, Azithromycin)'
];

export const IMCI_DANGER_SIGNS = [
  {
    id: 'unable_to_drink',
    label: 'Unable to drink or breastfeed',
    description: 'Patient vomits everything or is too weak to swallow fluids'
  },
  {
    id: 'convulsions',
    label: 'Convulsions / Repeated seizures',
    description: 'Fits during this illness episode'
  },
  {
    id: 'lethargy_unconscious',
    label: 'Abnormally sleepy, lethargic, or unconscious',
    description: 'Not alert, floppy, or difficult to awaken'
  },
  {
    id: 'severe_respiratory_distress',
    label: 'Severe chest indrawing or stridor in calm state',
    description: 'Deep intercostal/subcostal retractions or noisy breathing'
  },
  {
    id: 'severe_dehydration',
    label: 'Severe dehydration (sunken eyes, skin pinch > 2s)',
    description: 'Skin pinch on abdomen returns very slowly'
  },
  {
    id: 'stiff_neck_purpura',
    label: 'Stiff neck, photophobia, or non-blanching purpuric rash',
    description: 'Signs of meningitis or severe meningococcal sepsis'
  },
  {
    id: 'severe_anemia_pallor',
    label: 'Severe palmar/mucosal pallor or deep jaundice',
    description: 'Severe hemoglobin drop (<7g/dL) or hemolytic crisis'
  }
];

export const PRESET_FACILITIES: HealthFacility[] = [
  {
    id: 'FAC-001',
    name: 'Aburi-Akuapem CHPS Compound',
    facilityType: 'CHPS Zone / Post',
    district: 'Akuapem South District',
    region: 'Eastern Region',
    accreditationCode: 'FAC-ER-09412'
  },
  {
    id: 'FAC-002',
    name: 'Dormaa Ahenkro Health Centre',
    facilityType: 'Health Centre (Rural)',
    district: 'Dormaa Central Municipal',
    region: 'Bono Region',
    accreditationCode: 'FAC-BR-14820'
  },
  {
    id: 'FAC-003',
    name: 'Bole Bamboi Sub-District Clinic',
    facilityType: 'Sub-District Clinic',
    district: 'Bole District',
    region: 'Savannah Region',
    accreditationCode: 'FAC-SR-22019'
  },
  {
    id: 'FAC-004',
    name: 'Adidome Rural Health Post',
    facilityType: 'Rural Health Post',
    district: 'Central Tongu District',
    region: 'Volta Region',
    accreditationCode: 'FAC-VR-31094'
  },
  {
    id: 'FAC-005',
    name: 'Asikuma Catholic Rural Outreach Post',
    facilityType: 'Maternity & Child Health Post',
    district: 'Asikuma Odoben Brakwa',
    region: 'Central Region',
    accreditationCode: 'FAC-CR-07152'
  }
];

export const PRESET_PROFESSIONALS: HealthProfessional[] = [
  {
    id: 'PROF-001',
    fullName: 'Patricia Osei, RGN',
    cadre: 'Community Health Nurse (CHN) / Registered General Nurse',
    registrationPin: 'NMC-GH-48201',
    passcode: '1234',
    facilityId: 'FAC-001'
  },
  {
    id: 'PROF-002',
    fullName: 'Emmanuel Tetteh, CHO',
    cadre: 'Community Health Officer (CHO)',
    registrationPin: 'CHO-GH-19402',
    passcode: '1234',
    facilityId: 'FAC-001'
  },
  {
    id: 'PROF-003',
    fullName: 'Sr. Faustina Mensah, RM',
    cadre: 'Staff Midwife (Maternal & Reproductive Care)',
    registrationPin: 'NMC-MW-88219',
    passcode: '1234',
    facilityId: 'FAC-002'
  },
  {
    id: 'PROF-004',
    fullName: 'Dr. Kwabena Asante, PA',
    cadre: 'Physician Assistant (Medical)',
    registrationPin: 'MDC-PA-30194',
    passcode: '1234',
    facilityId: 'FAC-003'
  },
  {
    id: 'PROF-005',
    fullName: 'David Antwi, MCA',
    cadre: 'Medicine Counter Assistant / Dispensing Technician',
    registrationPin: 'PC-MCA-66412',
    passcode: '1234',
    facilityId: 'FAC-004'
  }
];

export const CONDITIONS_DATABASE: ConditionGuideline[] = [
  // 1. MALARIA
  {
    id: 'MALARIA',
    title: 'Uncomplicated Malaria (P. falciparum)',
    icdCode: 'B54',
    category: 'Infectious & Fevers',
    description: 'Fever with positive mRDT or high clinical suspicion in endemic zone without severe danger signs.',
    commonSymptoms: ['Fever / Chills', 'Headache', 'Loss of appetite', 'Joint / Muscle pains', 'Nausea / Mild vomiting'],
    redFlags: ['Repeated vomiting', 'Convulsions', 'Prostration / Inability to stand', 'Tea-colored dark urine', 'Jaundice'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'artemether-lumefantrine-child',
            drugName: 'Artemether-Lumefantrine 20/120mg (Dispersible)',
            genericName: 'Artemether + Lumefantrine',
            formulation: 'Dispersible Tablet 20mg/120mg',
            route: 'Oral (dispersed in clean water)',
            dosage: 'Weight-adjusted dose',
            frequency: 'Twice daily (0h, 8h on day 1, then BD days 2-3)',
            duration: '3 days (6-dose regimen)',
            totalQuantity: '6 to 18 tablets (based on weight band)',
            instructions: 'Administer with milk or fatty meal for high bioavailability. Disperse in 10ml clean drinking water. If child vomits within 30 min, repeat full dose.',
            guidelineTier: 'Standard First-Line Protocol',
            type: 'essential'
          },
          {
            id: 'paracetamol-child-fever',
            drugName: 'Paracetamol 120mg/5ml Syrup',
            genericName: 'Paracetamol',
            formulation: 'Pediatric Oral Syrup 120mg per 5ml',
            route: 'Oral',
            dosage: '10 to 15 mg/kg per dose',
            frequency: 'Every 6 to 8 hours as needed for high fever (>38.5°C)',
            duration: '3 days',
            totalQuantity: '1 bottle (60ml - 100ml)',
            instructions: 'Use calibrated oral syringe or measuring spoon. Do not exceed 4 doses in 24 hours.',
            guidelineTier: 'Antipyretic Symptomatic Protocol',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Encourage abundant oral fluid intake (clean water, coconut water, light porridge).',
          'Tepid sponge with lukewarm water if temperature exceeds 38.5°C; never use cold or iced water.',
          'Advise immediate return if child vomits repeatedly, develops convulsions, or becomes unable to drink.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'artemether-lumefantrine-adult',
            drugName: 'Artemether-Lumefantrine 20/120mg Tablets',
            genericName: 'Artemether + Lumefantrine',
            formulation: 'Tablet 20mg/120mg',
            route: 'Oral',
            dosage: '4 tablets per dose (80mg/480mg)',
            frequency: 'Twice daily (at 0h and 8h on Day 1, then every 12h on Days 2 & 3)',
            duration: '3 days',
            totalQuantity: '24 tablets (1 full blister pack)',
            instructions: 'Take strictly with fatty food (groundnut soup, milk, avocado) to ensure therapeutic blood levels. Complete all 24 tablets even if fever subsides.',
            guidelineTier: 'Standard First-Line Adult ACT Protocol',
            type: 'essential'
          },
          {
            id: 'paracetamol-adult-fever',
            drugName: 'Paracetamol 500mg Tablets',
            genericName: 'Paracetamol',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '1000mg (2 tablets)',
            frequency: 'Every 8 hours as needed for fever/headache',
            duration: '3 days',
            totalQuantity: '18 tablets',
            instructions: 'Do not exceed 4000mg (8 tablets) in 24 hours.',
            guidelineTier: 'Symptomatic Relief',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'quinine-pregnancy-1st',
            drugName: 'Oral Quinine Sulfate 300mg Tablets',
            genericName: 'Quinine Sulfate',
            formulation: 'Film-coated tablet 300mg',
            route: 'Oral',
            dosage: '600mg (2 tablets) every 8 hours',
            frequency: 'Three times daily (TDS)',
            duration: '7 days',
            totalQuantity: '42 tablets',
            instructions: 'Mandatory guideline for 1st trimester malaria where ACT safety data is restricted. Take strictly after food.',
            guidelineTier: 'First Trimester Antenatal Protocol',
            pregnancySafetyNote: 'Selected safely for pregnancy. Avoid standard ACTs in first trimester under primary guidelines.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Sleep under an insecticide-treated bed net (ITN).',
          'Drink at least 2 to 3 liters of clean drinking water daily.',
          'Return immediately if dark urine, yellow eyes, or breathlessness develops.'
        ]
      }
    },
    counselingPoints: [
      'The entire 3-day course must be completed to prevent parasite recrudescence and drug resistance.',
      'Always swallow pills or dispersible solution with some food or milk.'
    ]
  },

  // 2. COMMUNITY PNEUMONIA (NON-SEVERE)
  {
    id: 'PNEUMONIA_COMMUNITY',
    title: 'Acute Community-Acquired Pneumonia (Non-Severe)',
    icdCode: 'J18.9',
    category: 'Respiratory',
    description: 'Cough, fever, and fast breathing for age (≥50/min if 2-11m, ≥40/min if 1-5y) WITHOUT chest indrawing or stridor.',
    commonSymptoms: ['Fast breathing (tachypnea)', 'Cough', 'Fever', 'Poor feeding', 'Malaise'],
    redFlags: ['Lower chest wall indrawing', 'Stridor in calm child', 'Nasal flaring', 'Inability to drink', 'Central cyanosis'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'amoxicillin-pneumonia-child',
            drugName: 'Amoxicillin 250mg Dispersible Tablets / Suspension',
            genericName: 'Amoxicillin',
            formulation: 'Dispersible Tablet 250mg',
            route: 'Oral (dispersed in 5ml water)',
            dosage: 'High-dose: 40-50 mg/kg per dose twice daily (BD)',
            frequency: 'Twice daily (every 12 hours) with feeds',
            duration: '5 days',
            totalQuantity: '10 to 20 tablets (based on weight/age)',
            instructions: 'WHO/Primary Care Pneumonia Protocol: High-dose oral amoxicillin is standard first-line therapy. Disperse tablet in 1 teaspoon clean water. Re-evaluate child in 48 hours.',
            guidelineTier: 'First-Line Pediatric Pneumonia Protocol',
            type: 'essential'
          },
          {
            id: 'paracetamol-pneumonia-child',
            drugName: 'Paracetamol 120mg/5ml Syrup',
            genericName: 'Paracetamol',
            formulation: 'Oral Syrup 120mg/5ml',
            route: 'Oral',
            dosage: '10-15 mg/kg every 6-8h PRN for fever',
            frequency: 'TDS PRN',
            duration: '3 days',
            totalQuantity: '1 bottle (100ml)',
            instructions: 'Relieves fever and breathing discomfort.',
            guidelineTier: 'Antipyretic Support',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [
          {
            id: 'azithromycin-child-pneumonia',
            drugName: 'Azithromycin 200mg/5ml Suspension',
            genericName: 'Azithromycin',
            formulation: 'Oral Suspension 200mg/5ml',
            route: 'Oral',
            dosage: '10 mg/kg once daily',
            frequency: 'Once daily (OD)',
            duration: '5 days',
            totalQuantity: '1 bottle (30ml)',
            instructions: 'Substituted because child has documented penicillin allergy. Take 1 hour before feeds.',
            guidelineTier: 'Macrolide Alternative (Allergy Safe)',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Allergy-safe macrolide substitution.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Continue frequent breastfeeding and adequate hydration.',
          'Instruct mother to watch for chest indrawing or blue lips—if seen, rush immediately to hospital.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'amoxicillin-adult-pneumonia',
            drugName: 'Amoxicillin 500mg Capsules / Tablets',
            genericName: 'Amoxicillin',
            formulation: 'Capsule 500mg',
            route: 'Oral',
            dosage: '500mg to 1000mg three times daily (TDS)',
            frequency: 'Every 8 hours',
            duration: '5 to 7 days',
            totalQuantity: '21 to 30 capsules',
            instructions: 'Take with full glass of water. Complete full course.',
            guidelineTier: 'Adult Outpatient Pneumonia Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [
          {
            id: 'azithromycin-adult-pneumonia',
            drugName: 'Azithromycin 500mg Tablets',
            genericName: 'Azithromycin',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '500mg daily on Day 1, then 250mg daily on Days 2-5 (or 500mg OD x 3d)',
            frequency: 'Once daily',
            duration: '3 to 5 days',
            totalQuantity: '3 to 5 tablets',
            instructions: 'Substituted due to penicillin hypersensitivity.',
            guidelineTier: 'Macrolide Alternative',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Selected for Penicillin allergy.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Rest in semi-recumbent position.',
          'Drink 2.5 - 3 liters of fluids daily.',
          'Return if confusion, chest pain, or worsening breathlessness occurs.'
        ]
      }
    },
    counselingPoints: [
      'Pneumonia requires immediate full-course adherence.',
      'Re-assessment in 48 hours is mandatory for young children.'
    ]
  },

  // 3. UPPER RESPIRATORY TRACT INFECTION (URTI)
  {
    id: 'RTI',
    title: 'Acute Upper Respiratory Tract Infection (URTI) / Bronchitis',
    icdCode: 'J06.9',
    category: 'Respiratory',
    description: 'Cough, sore throat, nasal congestion, mild fever without fast breathing or chest indrawing.',
    commonSymptoms: ['Cough', 'Runny / Stuffy nose', 'Sore throat', 'Low-grade fever', 'Mild headache'],
    redFlags: ['Fast breathing / Stridor', 'Chest indrawing', 'Grunting in young children', 'Blue lips or fingernails (cyanosis)'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'amoxicillin-child-rti',
            drugName: 'Amoxicillin 125mg/5ml Oral Suspension',
            genericName: 'Amoxicillin Trihydrate',
            formulation: 'Powder for Oral Suspension 125mg/5ml',
            route: 'Oral',
            dosage: '250mg (10ml) TDS (or 40-50mg/kg/day)',
            frequency: 'Three times daily (every 8 hours)',
            duration: '5 days',
            totalQuantity: '2 bottles (100ml each)',
            instructions: 'Reconstitute with boiled and cooled clean water up to mark. Shake well. Store in cool dry place. Complete full course.',
            guidelineTier: 'First-Line Pediatric Respiratory Protocol',
            type: 'essential'
          },
          {
            id: 'saline-nasal-drops-child',
            drugName: 'Normal Saline (0.9% NaCl) Nasal Drops',
            genericName: 'Sodium Chloride 0.9%',
            formulation: 'Pediatric Nasal Drops Bottle (10ml)',
            route: 'Intranasal',
            dosage: '2 to 3 drops in each nostril',
            frequency: '3 to 4 times daily, especially before feeds',
            duration: '5 days',
            totalQuantity: '1 dropper bottle (10ml)',
            instructions: 'Clears blocked nasal passages for easier breastfeeding and sleep.',
            guidelineTier: 'Supportive Decongestant',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [
          {
            id: 'azithromycin-child-rti',
            drugName: 'Azithromycin 200mg/5ml Suspension',
            genericName: 'Azithromycin',
            formulation: 'Oral Suspension 200mg/5ml',
            route: 'Oral',
            dosage: '10mg/kg once daily',
            frequency: 'Once daily (OD)',
            duration: '3 days',
            totalQuantity: '1 bottle (15ml or 30ml)',
            instructions: 'Substituted because patient has documented Penicillin allergy.',
            guidelineTier: 'Macrolide Alternative (Allergy Safe)',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Safe alternative: Macrolide class avoids beta-lactam allergy.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Continue frequent breastfeeding and provide plenty of warm fluids.',
          'Soothe throat with honey and warm water for children above 1 year (do NOT give honey to infants < 1 year).'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'amoxicillin-adult-rti',
            drugName: 'Amoxicillin 500mg Capsules',
            genericName: 'Amoxicillin',
            formulation: 'Capsule 500mg',
            route: 'Oral',
            dosage: '500mg (1 capsule)',
            frequency: 'Three times daily (every 8 hours)',
            duration: '5 days',
            totalQuantity: '15 capsules',
            instructions: 'Take evenly spaced throughout the day.',
            guidelineTier: 'First-Line Adult Antimicrobial Protocol',
            type: 'essential'
          },
          {
            id: 'paracetamol-adult-rti',
            drugName: 'Paracetamol 500mg Tablets',
            genericName: 'Paracetamol',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '1000mg (2 tablets)',
            frequency: 'Every 8 hours as needed for throat pain or fever',
            duration: '3 to 5 days',
            totalQuantity: '15 tablets',
            instructions: 'Symptomatic analgesia.',
            guidelineTier: 'Symptomatic Care',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [
          {
            id: 'azithromycin-adult-rti',
            drugName: 'Azithromycin 500mg Tablets',
            genericName: 'Azithromycin',
            formulation: 'Film-coated tablet 500mg',
            route: 'Oral',
            dosage: '500mg (1 tablet) once daily',
            frequency: 'Once daily (OD)',
            duration: '3 days',
            totalQuantity: '3 tablets',
            instructions: 'Substituted due to Penicillin hypersensitivity.',
            guidelineTier: 'Macrolide Alternative',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Selected because patient has documented Penicillin allergy.',
            type: 'essential'
          }
        ],
        pregnancySafe: [
          {
            id: 'amoxicillin-adult-preg',
            drugName: 'Amoxicillin 500mg Capsules',
            genericName: 'Amoxicillin',
            formulation: 'Capsule 500mg',
            route: 'Oral',
            dosage: '500mg three times daily',
            frequency: 'Three times daily (TDS)',
            duration: '5 days',
            totalQuantity: '15 capsules',
            instructions: 'Safe in pregnancy (Category B). Avoid fluoroquinolones.',
            guidelineTier: 'Pregnancy-Safe Antimicrobial',
            pregnancySafetyNote: 'Safe throughout all trimesters of pregnancy.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Steam inhalation with plain warm water vapor.',
          'Warm saline gargles for throat discomfort.'
        ]
      }
    },
    counselingPoints: [
      'Most viral coughs improve within 7 to 10 days.',
      'Never skip antibiotic doses to maintain therapeutic serum levels.'
    ]
  },

  // 4. ACUTE WATERY DIARRHEA
  {
    id: 'DIARRHEA',
    title: 'Acute Watery Diarrhea / Gastroenteritis',
    icdCode: 'A09',
    category: 'Gastrointestinal',
    description: '3 or more loose or watery stools per day of sudden onset without blood in stool.',
    commonSymptoms: ['Frequent watery stools', 'Abdominal cramps', 'Mild nausea', 'Thirst', 'Low-grade fever'],
    redFlags: ['Sunken eyes', 'Inability to drink / lethargy', 'Skin pinch goes back > 2 seconds', 'Blood in stool (Dysentery)'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'ors-child',
            drugName: 'Oral Rehydration Salts (ORS) Low-Osmolarity',
            genericName: 'Sodium chloride + Glucose + Potassium + Citrate',
            formulation: 'Powder sachet for 1 Liter solution',
            route: 'Oral',
            dosage: '100ml to 200ml after each loose stool (frequently by cup/spoon)',
            frequency: 'After every bowel movement + freely between meals',
            duration: 'Until diarrhea stops (typically 3 to 5 days)',
            totalQuantity: '4 to 6 sachets',
            instructions: 'CRITICAL: Dissolve 1 sachet in exactly 1 Liter of clean boiled/cooled water. Do not mix with milk or juice. Discard solution after 24h.',
            guidelineTier: 'WHO / Primary Rehydration Protocol (Life-Saving)',
            type: 'essential'
          },
          {
            id: 'zinc-child-protocol',
            drugName: 'Zinc Sulfate 20mg Dispersible Tablets',
            genericName: 'Zinc Sulfate Monohydrate',
            formulation: 'Dispersible Tablet 20mg',
            route: 'Oral (dispersed in teaspoon of water or breast milk)',
            dosage: 'Infants < 6m: 10mg (half tab) daily. Children ≥ 6m: 20mg (1 tab) daily.',
            frequency: 'Once daily (OD)',
            duration: '14 days continuously',
            totalQuantity: '14 tablets',
            instructions: 'MANDATORY CHILD DIARRHEA PROTOCOL: Must be given for the entire 14 days even after diarrhea stops. Regenerates gut mucosa and protects against relapse for 3 months.',
            guidelineTier: 'Mandatory Pediatric Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Continue frequent breastfeeding; do not withhold feeds.',
          'Provide extra fluids: coconut water, rice water, light soup.',
          'NEVER give antimotility drugs (Loperamide) to children.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'ors-adult',
            drugName: 'Oral Rehydration Salts (ORS) Low-Osmolarity',
            genericName: 'Oral Rehydration Salts',
            formulation: 'Powder sachet for 1 Liter solution',
            route: 'Oral',
            dosage: '200ml to 400ml after every loose stool',
            frequency: 'After every watery bowel movement + freely',
            duration: 'Until diarrhea resolves (3 to 5 days)',
            totalQuantity: '6 to 8 sachets',
            instructions: 'Mix 1 sachet into exactly 1 Liter of safe clean water. Drink small frequent cups.',
            guidelineTier: 'Essential Fluid Replacement Protocol',
            type: 'essential'
          },
          {
            id: 'zinc-adult-supportive',
            drugName: 'Zinc Sulfate 20mg Tablets',
            genericName: 'Zinc Sulfate',
            formulation: 'Tablet 20mg',
            route: 'Oral',
            dosage: '20mg once daily',
            frequency: 'Once daily',
            duration: '10 days',
            totalQuantity: '10 tablets',
            instructions: 'Accelerates mucosal regeneration.',
            guidelineTier: 'Nutritional Mucosal Support',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'ors-pregnancy',
            drugName: 'Oral Rehydration Salts (ORS)',
            genericName: 'Oral Rehydration Salts',
            formulation: 'Powder sachet for 1 Liter',
            route: 'Oral',
            dosage: '250ml - 500ml after each stool',
            frequency: 'Frequently throughout the day',
            duration: 'Until resolved',
            totalQuantity: '6 sachets',
            instructions: 'Completely safe during pregnancy.',
            guidelineTier: 'Safe Maternal Hydration',
            pregnancySafetyNote: 'Completely safe in all trimesters.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Eat small, frequent, bland meals (boiled plantain, rice, yam, banana).',
          'Avoid greasy and spicy foods until stool firms.'
        ]
      }
    },
    counselingPoints: [
      'Dehydration kills; replacing lost water and electrolytes is the primary intervention.',
      'Always wash hands with soap and water after latrine use and before cooking.'
    ]
  },

  // 5. DYSENTERY (BLOODY DIARRHEA)
  {
    id: 'DYSENTERY',
    title: 'Acute Bacillary Dysentery (Bloody Diarrhea / Shigellosis)',
    icdCode: 'A03.9',
    category: 'Gastrointestinal',
    description: 'Diarrhea containing visible blood and mucus, marked abdominal cramps, tenesmus, and high fever.',
    commonSymptoms: ['Visible blood in stool', 'Severe abdominal cramps / colic', 'Tenesmus (painful straining)', 'Fever', 'Toxicity'],
    redFlags: ['Prolonged high fever with convulsions', 'Lethargy', 'Prolapsed rectum', 'Severe pallor (Hemolytic Uremic Syndrome risk)'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'cefixime-child-dysentery',
            drugName: 'Cefixime 100mg/5ml Pediatric Suspension (or Azithromycin)',
            genericName: 'Cefixime (3rd Generation Cephalosporin)',
            formulation: 'Oral Suspension 100mg/5ml',
            route: 'Oral',
            dosage: '8 mg/kg once daily (or 4 mg/kg twice daily)',
            frequency: 'Once daily (OD)',
            duration: '5 days',
            totalQuantity: '1 bottle (50ml)',
            instructions: 'First-line antimicrobial for pediatric bacillary dysentery (avoids fluoroquinolones in young children).',
            guidelineTier: 'First-Line Pediatric Dysentery Protocol',
            type: 'essential'
          },
          {
            id: 'ors-child-dysentery',
            drugName: 'Oral Rehydration Salts (ORS) + Zinc Sulfate 20mg',
            genericName: 'ORS + Zinc',
            formulation: 'Powder sachet + Dispersible tabs',
            route: 'Oral',
            dosage: 'ORS after loose stool + Zinc 20mg daily x 14 days',
            frequency: 'Daily',
            duration: '14 days',
            totalQuantity: '6 sachets ORS + 14 tabs Zinc',
            instructions: 'Essential hydration and mucosal protection.',
            guidelineTier: 'Mandatory Co-Therapy',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Do NOT administer anti-motility drugs (Loperamide/Diphenoxylate) - traps toxins in the gut.',
          'Maintain high calorie feeding.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'ciprofloxacin-adult-dysentery',
            drugName: 'Ciprofloxacin 500mg Tablets',
            genericName: 'Ciprofloxacin',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '500mg twice daily (every 12 hours)',
            frequency: 'Twice daily (BD)',
            duration: '3 days',
            totalQuantity: '6 tablets',
            instructions: 'Standard adult course for Shigella dysentery. Take with large glass of water. Contraindicated in pregnancy.',
            guidelineTier: 'First-Line Adult Dysentery Protocol',
            type: 'essential'
          },
          {
            id: 'ors-adult-dysentery',
            drugName: 'Oral Rehydration Salts (ORS)',
            genericName: 'ORS',
            formulation: 'Sachet for 1L',
            route: 'Oral',
            dosage: 'Drink 200-400ml after each stool',
            frequency: 'PRN',
            duration: '3 to 5 days',
            totalQuantity: '6 sachets',
            instructions: 'Maintain fluid balance.',
            guidelineTier: 'Hydration',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'azithromycin-preg-dysentery',
            drugName: 'Azithromycin 500mg Tablets',
            genericName: 'Azithromycin',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '500mg once daily',
            frequency: 'Once daily (OD)',
            duration: '3 days',
            totalQuantity: '3 tablets',
            instructions: 'Ciprofloxacin is contraindicated in pregnancy; Azithromycin or Cefixime is safely substituted.',
            guidelineTier: 'Pregnancy-Safe Antimicrobial',
            pregnancySafetyNote: 'Safe alternative for maternal dysentery.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Strict handwashing with soap to prevent household outbreak.',
          'Disinfect latrines with bleach solution.'
        ]
      }
    },
    counselingPoints: [
      'Bloody diarrhea is highly infectious; isolate eating utensils.',
      'Complete all antibiotic doses even after bleeding ceases.'
    ]
  },

  // 6. ACUTE PAIN / FEVER
  {
    id: 'PAIN',
    title: 'Acute Pain / Unspecified Febrile Illness',
    icdCode: 'R50.9',
    category: 'Infectious & Fevers',
    description: 'Mild to moderate non-specific pain, headache, musculoskeletal ache, or post-immunization fever.',
    commonSymptoms: ['Headache', 'Fever without localizing signs', 'Body aches', 'Teething discomfort'],
    redFlags: ['Fever > 40°C', 'Stiff neck', 'Severe persistent localized abdominal tenderness', 'Altered mental state'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'paracetamol-child-pain',
            drugName: 'Paracetamol 120mg/5ml Pediatric Syrup',
            genericName: 'Paracetamol',
            formulation: 'Syrup 120mg/5ml',
            route: 'Oral',
            dosage: '10 to 15 mg/kg per dose',
            frequency: 'Every 6 to 8 hours as needed (Max 4 doses in 24 hours)',
            duration: '3 days as needed',
            totalQuantity: '1 bottle (100ml)',
            instructions: 'Give with calibrated spoon or syringe. Do not exceed recommended dosage.',
            guidelineTier: 'First-Line Pediatric Analgesic/Antipyretic',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Dress child in lightweight clothing; keep room well ventilated.',
          'Offer frequent sips of water or breastfeed regularly.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'paracetamol-adult-pain',
            drugName: 'Paracetamol 500mg Tablets',
            genericName: 'Paracetamol',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '1000mg (2 tablets)',
            frequency: 'Every 8 hours as needed for pain/fever',
            duration: '3 to 5 days',
            totalQuantity: '20 tablets',
            instructions: 'Maximum 4000mg (8 tablets) in 24 hours.',
            guidelineTier: 'First-Line Analgesic',
            type: 'essential'
          },
          {
            id: 'ibuprofen-adult-pain',
            drugName: 'Ibuprofen 400mg Tablets',
            genericName: 'Ibuprofen',
            formulation: 'Film-coated tablet 400mg',
            route: 'Oral',
            dosage: '400mg (1 tablet)',
            frequency: 'Every 8 hours after food for inflammatory pain',
            duration: '3 to 5 days',
            totalQuantity: '15 tablets',
            instructions: 'Always take with food. Contraindicated in peptic ulcer or pregnancy (3rd trimester).',
            guidelineTier: 'Second-Line NSAID Protocol',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'paracetamol-pregnancy-pain',
            drugName: 'Paracetamol 500mg Tablets',
            genericName: 'Paracetamol',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '500mg to 1000mg (1-2 tablets)',
            frequency: 'Every 8 hours as needed (PRN)',
            duration: 'Up to 3 days',
            totalQuantity: '12 tablets',
            instructions: 'Paracetamol is safest in pregnancy. NSAIDs are avoided.',
            guidelineTier: 'Pregnancy-Safe Pain Relief',
            pregnancySafetyNote: 'Safe in all trimesters.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Hydrate well with clean drinking water.',
          'Apply cool compress to forehead for headache.'
        ]
      }
    },
    counselingPoints: [
      'Do not take multiple brand-name pain relievers together.',
      'Seek evaluation if pain is severe or accompanied by numbness.'
    ]
  },

  // 7. BACTERIAL SKIN INFECTION (IMPETIGO / CELLULITIS)
  {
    id: 'SKIN_INFECTION',
    title: 'Bacterial Skin & Soft Tissue Infection (Impetigo / Folliculitis)',
    icdCode: 'L01.0',
    category: 'Dermatology & Skin',
    description: 'Crusted pustules, honey-colored crusts (impetigo), or painful red swollen skin patches without systemic sepsis.',
    commonSymptoms: ['Honey-colored crusts', 'Red pustules / sores', 'Local itching and tenderness', 'Oozing lesions'],
    redFlags: ['Rapidly spreading redness with high fever', 'Facial cellulitis around eyes', 'Severe pain out of proportion', 'Skin sloughing'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'flucloxacillin-child',
            drugName: 'Flucloxacillin 125mg/5ml Oral Suspension',
            genericName: 'Flucloxacillin Sodium',
            formulation: 'Oral Suspension 125mg/5ml',
            route: 'Oral',
            dosage: '125mg (5ml) four times daily (25-50mg/kg/day in 4 divided doses)',
            frequency: 'Four times daily (every 6 hours) on empty stomach',
            duration: '5 to 7 days',
            totalQuantity: '2 bottles (100ml)',
            instructions: 'Take 30-60 min before meals. Finish full course.',
            guidelineTier: 'Anti-Staphylococcal Protocol',
            type: 'essential'
          },
          {
            id: 'chlorhexidine-child-wash',
            drugName: 'Chlorhexidine 0.5% Antiseptic Solution / Gentian Violet 0.5%',
            genericName: 'Chlorhexidine Digluconate',
            formulation: 'Topical Solution (100ml)',
            route: 'Topical',
            dosage: 'Clean affected skin areas with diluted solution',
            frequency: 'Twice daily',
            duration: '7 days',
            totalQuantity: '1 bottle (100ml)',
            instructions: 'Gently wash lesions with clean cloth soaked in solution. Keep nails short.',
            guidelineTier: 'Topical Antiseptic Care',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [
          {
            id: 'erythromycin-child-skin',
            drugName: 'Erythromycin 125mg/5ml Oral Suspension',
            genericName: 'Erythromycin Ethylsuccinate',
            formulation: 'Oral Suspension 125mg/5ml',
            route: 'Oral',
            dosage: '125mg to 250mg four times daily',
            frequency: 'Four times daily (QDS)',
            duration: '7 days',
            totalQuantity: '2 bottles',
            instructions: 'Substituted for Flucloxacillin due to Penicillin allergy.',
            guidelineTier: 'Macrolide Alternative for Skin Sepsis',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Safe alternative: patient is allergic to Penicillins.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Wash clothes and bedding separately in warm soapy water.',
          'Trim fingernails short to reduce bacterial inoculation from scratching.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'flucloxacillin-adult',
            drugName: 'Flucloxacillin 500mg Capsules',
            genericName: 'Flucloxacillin',
            formulation: 'Capsule 500mg',
            route: 'Oral',
            dosage: '500mg (1 capsule)',
            frequency: 'Four times daily (every 6 hours) on an empty stomach',
            duration: '7 days',
            totalQuantity: '28 capsules',
            instructions: 'Take 1 hour before meals or 2 hours after meals with a full glass of water.',
            guidelineTier: 'First-Line Anti-Staphylococcal Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [
          {
            id: 'erythromycin-adult-skin',
            drugName: 'Erythromycin 500mg Tablets',
            genericName: 'Erythromycin Stearate',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '500mg four times daily',
            frequency: 'Four times daily (QDS)',
            duration: '7 days',
            totalQuantity: '28 tablets',
            instructions: 'Substituted due to penicillin allergy. Swallow with water during or after food.',
            guidelineTier: 'Macrolide Alternative',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Selected due to confirmed Penicillin allergy.',
            type: 'essential'
          }
        ],
        pregnancySafe: [
          {
            id: 'flucloxacillin-pregnancy',
            drugName: 'Flucloxacillin 500mg Capsules',
            genericName: 'Flucloxacillin',
            formulation: 'Capsule 500mg',
            route: 'Oral',
            dosage: '500mg four times daily',
            frequency: 'Four times daily',
            duration: '7 days',
            totalQuantity: '28 capsules',
            instructions: 'Safe in pregnancy (Category B).',
            guidelineTier: 'Pregnancy Safe Antibiotic',
            pregnancySafetyNote: 'Safe in all trimesters.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Keep affected area clean and dry.',
          'Avoid squeezing, popping, or incising lesions.'
        ]
      }
    },
    counselingPoints: [
      'Take antibiotics at regular intervals.',
      'Notify clinic if red streaks form or fever develops.'
    ]
  },

  // 8. SCABIES INFESTATION
  {
    id: 'SCABIES',
    title: 'Scabies Infestation (Sarcoptes scabiei)',
    icdCode: 'B86',
    category: 'Dermatology & Skin',
    description: 'Intense nocturnal pruritus, burrows and papules in finger web spaces, wrists, axillae, groin, and buttocks.',
    commonSymptoms: ['Severe nocturnal itching', 'Papules in web spaces of fingers and wrists', 'Excoriations from scratching', 'Family members scratching'],
    redFlags: ['Crusted / Norwegian scabies (thick plaques in immunocompromised)', 'Secondary severe bacterial cellulitis with fever'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'permethrin-child-scabies',
            drugName: 'Permethrin 5% Dermal Cream (or Benzyl Benzoate 12.5% Diluted)',
            genericName: 'Permethrin 5%',
            formulation: 'Cream (30g tube)',
            route: 'Topical',
            dosage: 'Apply to entire body from chin/neck down to soles of feet (include scalp/face in infants)',
            frequency: 'Leave on for 8 to 12 hours, then wash off thoroughly. Repeat after 7 days.',
            duration: '2 applications (Day 1 and Day 8)',
            totalQuantity: '1 to 2 tubes',
            instructions: 'Apply at bedtime. Cut child nails short. Wash off next morning. MANDATORY: Treat all household contacts simultaneously even if asymptomatic.',
            guidelineTier: 'First-Line Scabicide Protocol',
            type: 'essential'
          },
          {
            id: 'cetirizine-child-scabies',
            drugName: 'Cetirizine 5mg/5ml Syrup (or Chlorpheniramine)',
            genericName: 'Cetirizine Hydrochloride',
            formulation: 'Syrup 5mg/5ml',
            route: 'Oral',
            dosage: '2.5mg to 5mg once daily at bedtime',
            frequency: 'Once daily at night',
            duration: '7 days',
            totalQuantity: '1 bottle (60ml)',
            instructions: 'Alleviates intense night-time itching so child can sleep.',
            guidelineTier: 'Antipruritic Support',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Wash all clothing, towels, and bedsheets in hot soapy water and dry under direct sunlight.',
          'Items that cannot be washed should be sealed in an airtight plastic bag for 72 hours (mites die without human host).'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'permethrin-adult-scabies',
            drugName: 'Permethrin 5% Cream (or Benzyl Benzoate 25% Emulsion)',
            genericName: 'Permethrin 5%',
            formulation: 'Dermal Cream (60g) or BB Lotion',
            route: 'Topical',
            dosage: 'Apply from neck down to feet covering all skin folds, groin, and under nails',
            frequency: 'Leave on for 8-14 hours. Repeat application in 7 days.',
            duration: '2 applications',
            totalQuantity: '1 to 2 tubes / bottles',
            instructions: 'Apply in the evening after bathing. Put on clean clothes. Repeat in 7 days to kill newly hatched mites.',
            guidelineTier: 'First-Line Scabicide',
            type: 'essential'
          },
          {
            id: 'chlorpheniramine-adult-scabies',
            drugName: 'Chlorpheniramine 4mg Tablets',
            genericName: 'Chlorpheniramine Maleate',
            formulation: 'Tablet 4mg',
            route: 'Oral',
            dosage: '4mg once to twice daily at night',
            frequency: 'At bedtime',
            duration: '7 to 10 days',
            totalQuantity: '15 tablets',
            instructions: 'Controls allergic histamine response to mite feces.',
            guidelineTier: 'Antipruritic',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'permethrin-pregnancy-scabies',
            drugName: 'Permethrin 5% Cream',
            genericName: 'Permethrin',
            formulation: 'Cream 30g',
            route: 'Topical',
            dosage: 'Apply neck down, leave 8-12 hours, wash off. Repeat after 7 days.',
            frequency: '2 treatments',
            duration: '7 days apart',
            totalQuantity: '2 tubes',
            instructions: 'Permethrin 5% is FDA Category B and the safest treatment in pregnancy and lactation. (Avoid oral ivermectin during pregnancy).',
            guidelineTier: 'Safe Maternal Scabies Protocol',
            pregnancySafetyNote: 'Safest choice in all trimesters.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Treat all sexual partners and household contacts.',
          'Warn patient that itching may persist for 1-2 weeks after mites are eradicated due to allergic reaction.'
        ]
      }
    },
    counselingPoints: [
      'Treat the whole household on the exact same day.',
      'Sun-dry all bedding and clothes.'
    ]
  },

  // 9. TINEA / FUNGAL INFECTIONS (RINGWORM)
  {
    id: 'TINEA_FUNGAL',
    title: 'Tinea / Fungal Skin & Scalp Infection (Ringworm)',
    icdCode: 'B35.9',
    category: 'Dermatology & Skin',
    description: 'Circular scaly lesions with raised borders (ringworm) on body/groin, or patchy hair loss with scale on scalp (tinea capitis).',
    commonSymptoms: ['Annular (ring-like) scaly rash', 'Itching', 'Patchy hair loss with broken hairs (scalp)', 'Maceration between toes'],
    redFlags: ['Kerion (boggy, painful inflammatory scalp swelling)', 'Secondary extensive bacterial superinfection'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'clotrimazole-child-tinea',
            drugName: 'Clotrimazole 1% Topical Cream (for body/skin)',
            genericName: 'Clotrimazole 1%',
            formulation: 'Topical Cream (20g tube)',
            route: 'Topical',
            dosage: 'Apply thin layer to affected skin and 2cm beyond margins',
            frequency: 'Twice daily (BD)',
            duration: '2 to 4 weeks (continue 1 week after clearing)',
            totalQuantity: '1 to 2 tubes',
            instructions: 'Wash and dry skin before applying. Continue for at least 7 days after visible rash disappears.',
            guidelineTier: 'Topical Antifungal Protocol',
            type: 'essential'
          },
          {
            id: 'griseofulvin-child-scalp',
            drugName: 'Griseofulvin 125mg Tablets / Suspension (for Scalp Ringworm)',
            genericName: 'Griseofulvin Microsize',
            formulation: 'Tablet 125mg / Suspension',
            route: 'Oral',
            dosage: '10 to 20 mg/kg once daily with a fatty meal/milk',
            frequency: 'Once daily (OD)',
            duration: '4 to 6 weeks',
            totalQuantity: '30 to 60 tablets',
            instructions: 'Required for Tinea Capitis (scalp ringworm), as topical creams cannot penetrate hair follicles. Must be taken with fatty food (milk, groundnut soup) for absorption.',
            guidelineTier: 'Systemic Antifungal for Scalp Tinea',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Do not share hair combs, hats, or pillowcases.',
          'Keep skin folds dry and clean.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'clotrimazole-adult-tinea',
            drugName: 'Clotrimazole 1% Cream (or Terbinafine 1% Cream)',
            genericName: 'Clotrimazole 1%',
            formulation: 'Cream (20g tube)',
            route: 'Topical',
            dosage: 'Apply to affected area and surrounding skin twice daily',
            frequency: 'Twice daily (BD)',
            duration: '2 to 3 weeks',
            totalQuantity: '2 tubes',
            instructions: 'Apply to clean, dry skin. Continue for 1 week after resolution.',
            guidelineTier: 'Topical Antifungal',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'clotrimazole-preg-tinea',
            drugName: 'Clotrimazole 1% Cream',
            genericName: 'Clotrimazole',
            formulation: 'Cream',
            route: 'Topical',
            dosage: 'Apply twice daily',
            frequency: 'BD',
            duration: '2 to 3 weeks',
            totalQuantity: '2 tubes',
            instructions: 'Topical clotrimazole is safe during pregnancy. Avoid oral antifungals (fluconazole, griseofulvin) during pregnancy.',
            guidelineTier: 'Safe Topical Antifungal',
            pregnancySafetyNote: 'Topical clotrimazole is completely safe. Oral azoles/griseofulvin avoided.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Wear loose breathable cotton clothing.',
          'Dry groin and toes thoroughly after bathing.'
        ]
      }
    },
    counselingPoints: [
      'Topical treatment must be continued for at least one week after visible signs resolve.',
      'Check pets and schoolmates for ringworm.'
    ]
  },

  // 10. ACUTE OTITIS MEDIA (MIDDLE EAR INFECTION)
  {
    id: 'OTITIS_MEDIA',
    title: 'Acute Otitis Media (Middle Ear Infection)',
    icdCode: 'H66.9',
    category: 'Sensory (Eye, Ear & Oral)',
    description: 'Acute ear pain, tugging at ear in infants, fever, red bulging eardrum, with or without acute ear discharge.',
    commonSymptoms: ['Ear pain (otalgia)', 'Ear tugging in infant', 'Fever', 'Irritability', 'Temporary muffled hearing'],
    redFlags: ['Swelling / tenderness behind ear over mastoid bone (Mastoiditis)', 'Facial nerve palsy', 'Neck stiffness'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'amoxicillin-child-aom',
            drugName: 'Amoxicillin 125mg/5ml or 250mg/5ml Oral Suspension',
            genericName: 'Amoxicillin Trihydrate',
            formulation: 'Oral Suspension 250mg/5ml',
            route: 'Oral',
            dosage: '40 to 50 mg/kg/day divided in 3 doses (TDS)',
            frequency: 'Three times daily (every 8 hours)',
            duration: '5 to 7 days',
            totalQuantity: '2 bottles (100ml)',
            instructions: 'First-line antibiotic for acute middle ear bacterial infection. Finish full course.',
            guidelineTier: 'First-Line Otitis Protocol',
            type: 'essential'
          },
          {
            id: 'paracetamol-child-aom',
            drugName: 'Paracetamol 120mg/5ml Syrup',
            genericName: 'Paracetamol',
            formulation: 'Oral Syrup 120mg/5ml',
            route: 'Oral',
            dosage: '10-15 mg/kg every 6-8 hours PRN for severe ear pain',
            frequency: 'TDS PRN',
            duration: '3 to 5 days',
            totalQuantity: '1 bottle',
            instructions: 'Essential analgesia for intense ear pain.',
            guidelineTier: 'Analgesic Care',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [
          {
            id: 'azithromycin-child-aom',
            drugName: 'Azithromycin 200mg/5ml Suspension',
            genericName: 'Azithromycin',
            formulation: 'Suspension 200mg/5ml',
            route: 'Oral',
            dosage: '10mg/kg daily on Day 1, then 5mg/kg daily on Days 2-5',
            frequency: 'Once daily (OD)',
            duration: '5 days',
            totalQuantity: '1 bottle (30ml)',
            instructions: 'Substituted for penicillin-allergic child.',
            guidelineTier: 'Macrolide Alternative',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Safe alternative for penicillin allergy.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Do NOT insert foreign objects, oil, or unprescribed drops into the ear canal.',
          'Wick ear with dry clean rolled cloth if discharge is present.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'amoxicillin-adult-aom',
            drugName: 'Amoxicillin 500mg Capsules',
            genericName: 'Amoxicillin',
            formulation: 'Capsule 500mg',
            route: 'Oral',
            dosage: '500mg three times daily',
            frequency: 'Three times daily (TDS)',
            duration: '5 to 7 days',
            totalQuantity: '15 to 21 capsules',
            instructions: 'Take every 8 hours with water.',
            guidelineTier: 'First-Line Adult Antimicrobial',
            type: 'essential'
          },
          {
            id: 'paracetamol-adult-aom',
            drugName: 'Paracetamol 500mg Tablets',
            genericName: 'Paracetamol',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '1000mg every 8 hours PRN',
            frequency: 'TDS PRN',
            duration: '5 days',
            totalQuantity: '15 tablets',
            instructions: 'Pain relief.',
            guidelineTier: 'Analgesic',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [
          {
            id: 'azithromycin-adult-aom',
            drugName: 'Azithromycin 500mg Tablets',
            genericName: 'Azithromycin',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '500mg once daily',
            frequency: 'Once daily',
            duration: '3 days',
            totalQuantity: '3 tablets',
            instructions: 'Macrolide alternative.',
            guidelineTier: 'Macrolide Alternative',
            isSubstitutedForAllergy: true,
            allergyNotice: 'Selected for Penicillin allergy.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Avoid swimming or getting water in the ear until fully healed.',
          'Return if swelling develops behind the ear.'
        ]
      }
    },
    counselingPoints: [
      'Ear pain usually settles within 48-72 hours of starting treatment.',
      'Never put matchsticks, feathers, or herbal liquids into the ear.'
    ]
  },

  // 11. BACTERIAL CONJUNCTIVITIS ("RED EYE")
  {
    id: 'CONJUNCTIVITIS',
    title: 'Acute Bacterial Conjunctivitis ("Apollo" / Red Eye)',
    icdCode: 'H10.9',
    category: 'Sensory (Eye, Ear & Oral)',
    description: 'Redness of the eye (hyperemia), purulent or mucopurulent discharge, eyelids glued shut in the morning without cornea ulceration.',
    commonSymptoms: ['Red, bloodshot eye', 'Yellow/green discharge', 'Eyelids stuck together upon waking', 'Gritty foreign body sensation'],
    redFlags: ['Severe eye pain / photophobia', 'Reduced visual acuity / cloudy cornea', 'Neonate < 28 days with purulent eye discharge (Neonatal Ophthalmia)'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'chloramphenicol-child-eye',
            drugName: 'Chloramphenicol 0.5% Eye Drops',
            genericName: 'Chloramphenicol 0.5%',
            formulation: 'Eye Drops Dropper Bottle (10ml)',
            route: 'Ophthalmic (Eye)',
            dosage: '1 to 2 drops into affected eye(s)',
            frequency: 'Four times daily (every 6 hours) for 5 days',
            duration: '5 to 7 days',
            totalQuantity: '1 bottle (10ml)',
            instructions: 'Wash hands before instilling drops. Pull lower eyelid down to form a pocket. Do not touch eye surface with dropper tip.',
            guidelineTier: 'Broad-Spectrum Ophthalmic Protocol',
            type: 'essential'
          },
          {
            id: 'tetracycline-eye-ointment-child',
            drugName: 'Tetracycline 1% Eye Ointment (Night-time use)',
            genericName: 'Tetracycline Hydrochloride 1%',
            formulation: 'Ophthalmic Ointment (5g tube)',
            route: 'Ophthalmic (Eye)',
            dosage: 'Thin line inside lower eyelid at bedtime',
            frequency: 'Once at night before sleep',
            duration: '5 days',
            totalQuantity: '1 tube (5g)',
            instructions: 'Provides extended overnight antibiotic coverage and prevents eyelids from sticking together.',
            guidelineTier: 'Ophthalmic Ointment',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Clean discharge from eye using boiled and cooled water with clean cotton wool from inner to outer corner.',
          'Wash hands thoroughly with soap after touching eyes to prevent spread to the other eye or family members.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'chloramphenicol-adult-eye',
            drugName: 'Chloramphenicol 0.5% Eye Drops',
            genericName: 'Chloramphenicol 0.5%',
            formulation: 'Eye Drops (10ml)',
            route: 'Ophthalmic',
            dosage: '1 to 2 drops every 4 to 6 hours',
            frequency: '4 times daily',
            duration: '5 to 7 days',
            totalQuantity: '1 dropper bottle (10ml)',
            instructions: 'Wash hands before applying. Store in a cool dry place.',
            guidelineTier: 'First-Line Ophthalmic Antibiotic',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'tetracycline-preg-eye',
            drugName: 'Erythromycin 0.5% or Gentamicin 0.3% Eye Drops',
            genericName: 'Gentamicin / Erythromycin Ophthalmic',
            formulation: 'Eye Drops (10ml)',
            route: 'Ophthalmic',
            dosage: '1 drop 4 times daily',
            frequency: '4 times daily',
            duration: '5 days',
            totalQuantity: '1 bottle',
            instructions: 'Safe topical ophthalmic treatment during pregnancy.',
            guidelineTier: 'Pregnancy-Safe Ophthalmic',
            pregnancySafetyNote: 'Safe topical application in all trimesters.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Do not share face towels, pillows, or handkerchiefs.',
          'Avoid wearing contact lenses until infection completely clears.'
        ]
      }
    },
    counselingPoints: [
      'Bacterial conjunctivitis is extremely contagious; frequent handwashing is crucial.',
      'Seek urgent referral if vision becomes blurred or cornea appears cloudy.'
    ]
  },

  // 12. ORAL THRUSH / CANDIDIASIS
  {
    id: 'ORAL_THRUSH',
    title: 'Oral Candidiasis / Thrush',
    icdCode: 'B37.0',
    category: 'Sensory (Eye, Ear & Oral)',
    description: 'White creamy curds or patches on tongue, gums, and inside cheeks that bleed when scraped, causing crying during feeding.',
    commonSymptoms: ['White curd-like plaques in mouth', 'Difficulty or crying during sucking', 'Loss of taste', 'Red raw mucosa'],
    redFlags: ['Difficulty swallowing / retrosternal pain (Esophageal candidiasis in HIV/immunocompromise)', 'Severe malnutrition'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'nystatin-child-thrush',
            drugName: 'Nystatin Oral Suspension 100,000 IU/ml',
            genericName: 'Nystatin',
            formulation: 'Oral Suspension 100,000 IU/ml (30ml)',
            route: 'Oral (Topical mucosal application)',
            dosage: '1ml (100,000 units) four times daily after feeds',
            frequency: 'Four times daily (QDS) after feeds',
            duration: '7 to 14 days (continue 48h after lesions clear)',
            totalQuantity: '1 to 2 bottles (30ml)',
            instructions: 'Drop 0.5ml onto each side of the mouth with dropper after feeding. Keep in mouth as long as possible before swallowing. Clean mother nipples if breastfeeding.',
            guidelineTier: 'First-Line Antifungal Protocol',
            type: 'essential'
          },
          {
            id: 'gentian-violet-child-thrush',
            drugName: 'Gentian Violet 0.5% Aqueous Solution',
            genericName: 'Methylrosanilinium Chloride 0.5%',
            formulation: 'Aqueous Solution (30ml)',
            route: 'Topical oral application',
            dosage: 'Paint oral lesions twice daily with clean cotton swab',
            frequency: 'Twice daily',
            duration: '5 days',
            totalQuantity: '1 bottle (30ml)',
            instructions: 'Traditional highly effective rural primary care antifungal. Harmless purple staining.',
            guidelineTier: 'Topical Antifungal Alternative',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Sterilize bottle teats, pacifiers, and cups in boiling water.',
          'If mother is breastfeeding, apply nystatin cream or ointment to nipples to prevent cross-reinfection.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'nystatin-adult-thrush',
            drugName: 'Nystatin Oral Suspension 100,000 IU/ml (or Miconazole Oral Gel)',
            genericName: 'Nystatin',
            formulation: 'Oral Suspension (30ml)',
            route: 'Oral (swish and swallow)',
            dosage: '5ml four times daily after meals',
            frequency: 'Four times daily (QDS)',
            duration: '7 to 14 days',
            totalQuantity: '2 bottles',
            instructions: 'Swish around mouth for at least 1 minute before swallowing.',
            guidelineTier: 'Topical Oral Antifungal',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Maintain excellent oral hygiene; rinse mouth after steroid inhaler use.',
          'Screen for underlying diabetes mellitus or immunosuppression in adults.'
        ]
      }
    },
    counselingPoints: [
      'Continue treatment for 48 hours after white patches disappear.',
      'Always treat both the nursing infant and mother nipples.'
    ]
  },

  // 13. LOWER UTI (CYSTITIS)
  {
    id: 'UTI',
    title: 'Uncomplicated Lower Urinary Tract Infection (Cystitis)',
    icdCode: 'N39.0',
    category: 'Genitourinary & Maternal',
    description: 'Dysuria (pain on urination), urinary frequency, urgency, suprapubic ache without loin pain or high fever.',
    commonSymptoms: ['Painful burning urination (dysuria)', 'Urgent frequent urination', 'Suprapubic discomfort', 'Cloudy or foul-smelling urine'],
    redFlags: ['High fever with rigors', 'Flank / Kidney angle tenderness (Pyelonephritis)', 'Vomiting / Inability to retain fluids', 'Hematuria in pregnant women'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'cotrimoxazole-child-uti',
            drugName: 'Co-trimoxazole 240mg/5ml Pediatric Suspension',
            genericName: 'Sulfamethoxazole 200mg + Trimethoprim 40mg',
            formulation: 'Pediatric Suspension (100ml)',
            route: 'Oral',
            dosage: '5ml to 10ml twice daily (based on age/weight)',
            frequency: 'Twice daily (every 12 hours) with meals',
            duration: '5 days',
            totalQuantity: '1 bottle (100ml)',
            instructions: 'Take with plenty of water. Contraindicated if patient has Sulfa allergy or severe G6PD deficiency.',
            guidelineTier: 'Primary Care Pediatric UTI Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Encourage copious water and fluid drinking to flush urinary tract.',
          'Advise child not to hold in urine when feeling urge.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'ciprofloxacin-adult-uti',
            drugName: 'Ciprofloxacin 500mg Tablets',
            genericName: 'Ciprofloxacin',
            formulation: 'Film-coated tablet 500mg',
            route: 'Oral',
            dosage: '500mg (1 tablet)',
            frequency: 'Twice daily (every 12 hours)',
            duration: '3 days',
            totalQuantity: '6 tablets',
            instructions: 'Drink at least 2 liters of water daily while taking this drug. Do not take with antacids or iron supplements within 2 hours. (STRICT CONTRAINDICATION: Do NOT give to pregnant women or children < 12 years).',
            guidelineTier: 'First-Line Non-Pregnant Adult UTI Protocol',
            type: 'essential'
          },
          {
            id: 'paracetamol-adult-uti',
            drugName: 'Paracetamol 500mg Tablets',
            genericName: 'Paracetamol',
            formulation: 'Tablet 500mg',
            route: 'Oral',
            dosage: '1000mg every 8 hours as needed',
            frequency: 'TDS PRN',
            duration: '3 days',
            totalQuantity: '12 tablets',
            instructions: 'Alleviates suprapubic cramping and urethral burning.',
            guidelineTier: 'Analgesic Support',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'amox-clav-pregnancy-uti',
            drugName: 'Amoxicillin + Clavulanic Acid 625mg Tablets (or Cefuroxime 250mg BD)',
            genericName: 'Co-amoxiclav',
            formulation: 'Tablet 625mg (500mg/125mg)',
            route: 'Oral',
            dosage: '625mg twice daily',
            frequency: 'Twice daily (BD)',
            duration: '5 to 7 days',
            totalQuantity: '14 tablets',
            instructions: 'MANDATORY PREGNANCY PROTOCOL: Ciprofloxacin is strictly CONTRAINDICATED in pregnancy due to cartilage damage in fetus. Co-amoxiclav or Cefuroxime is safe.',
            guidelineTier: 'Safe Maternal UTI Protocol',
            pregnancySafetyNote: 'Crucial: Ciprofloxacin withheld; Co-amoxiclav substituted safely for pregnancy.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Drink at least 2 to 3 liters of clean drinking water every day.',
          'Wipe from front to back after bowel movements.',
          'Empty bladder completely after intercourse.'
        ]
      }
    },
    counselingPoints: [
      'Increased water intake helps flush bacteria out of the bladder.',
      'Return immediately if back/flank pain, shaking chills, or vomiting starts.'
    ]
  },

  // 14. INTESTINAL WORMS (HELMINTHIASIS)
  {
    id: 'WORMS',
    title: 'Intestinal Helminthiasis (Worm Infestation)',
    icdCode: 'B82.0',
    category: 'Gastrointestinal',
    description: 'Anal itching (pinworms), passing worms in stool, abdominal distension, failure to thrive.',
    commonSymptoms: ['Perianal itching at night', 'Worms visible in stool', 'Recurrent vague abdominal ache', 'Anemia / poor weight gain'],
    redFlags: ['Intestinal obstruction / severe abdominal distension with vomiting', 'Severe pallor'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'albendazole-child',
            drugName: 'Albendazole 400mg Chewable Tablet (or 200mg for <2 yrs)',
            genericName: 'Albendazole',
            formulation: 'Chewable Tablet 400mg (flavored)',
            route: 'Oral (chewed thoroughly)',
            dosage: 'Age 1 to 2 years: 200mg (half tablet) STAT. Age ≥ 2 years: 400mg (1 tablet) STAT single dose.',
            frequency: 'Single dose (STAT)',
            duration: '1 day',
            totalQuantity: '1 tablet',
            instructions: 'Chew thoroughly before swallowing with water. Repeat after 2 weeks if heavy pinworm infection is suspected. Safe and effective routine deworming.',
            guidelineTier: 'Standard National Deworming Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Wash hands thoroughly with soap and water before meals and after using latrine.',
          'Always wear slippers/shoes when walking on soil (prevents hookworm penetration).',
          'Deworm all household members simultaneously.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'albendazole-adult',
            drugName: 'Albendazole 400mg Chewable Tablet',
            genericName: 'Albendazole',
            formulation: 'Chewable Tablet 400mg',
            route: 'Oral',
            dosage: '400mg (1 tablet) STAT single dose',
            frequency: 'Single dose (STAT)',
            duration: '1 day',
            totalQuantity: '1 tablet',
            instructions: 'Chew tablet thoroughly with a glass of water.',
            guidelineTier: 'Standard Adult Deworming Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'albendazole-pregnancy',
            drugName: 'Albendazole 400mg Chewable Tablet (2nd & 3rd Trimester Only)',
            genericName: 'Albendazole',
            formulation: 'Chewable Tablet 400mg',
            route: 'Oral',
            dosage: '400mg single dose',
            frequency: 'Single dose',
            duration: '1 day',
            totalQuantity: '1 tablet',
            instructions: 'Recommended after 1st trimester during routine ANC in endemic zones. (AVOID in 1st trimester of pregnancy).',
            guidelineTier: 'Antenatal Deworming Protocol',
            pregnancySafetyNote: 'Contraindicated in 1st trimester; approved for 2nd and 3rd trimesters.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Wash all raw vegetables and fruits thoroughly with clean water.',
          'Cook meats thoroughly.',
          'Maintain sanitary disposal of human excreta.'
        ]
      }
    },
    counselingPoints: [
      'Deworming every 6 months is recommended in high-transmission communities.',
      'Family members should practice strict handwashing.'
    ]
  },

  // 15. ANEMIA (NUTRITIONAL / IRON DEFICIENCY)
  {
    id: 'ANEMIA',
    title: 'Nutritional / Iron Deficiency Anemia (Mild-to-Moderate)',
    icdCode: 'D50.9',
    category: 'Infectious & Fevers',
    description: 'Fatigue, dizziness, pale conjunctiva and palms with Hb between 7-10 g/dL without respiratory distress or cardiac failure.',
    commonSymptoms: ['Fatigue / weakness', 'Pale conjunctiva / tongue / palms', 'Dizziness upon standing', 'Shortness of breath on mild exertion'],
    redFlags: ['Severe pallor with shortness of breath at rest (Hb < 7 g/dL)', 'Ankle swelling (heart failure)', 'Bleeding / purpura', 'Chest pain'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'iron-folate-child',
            drugName: 'Ferrous Sulfate + Folic Acid Pediatric Drops/Syrup',
            genericName: 'Ferrous Sulfate (approx 30mg elemental iron / 5ml)',
            formulation: 'Pediatric Oral Solution (100ml)',
            route: 'Oral',
            dosage: '3mg elemental iron/kg/day in 2 divided doses',
            frequency: 'Twice daily after feeds',
            duration: '3 months',
            totalQuantity: '2 to 3 bottles',
            instructions: 'Give with or after meals. Stools turn harmless dark green or black. Citrus juices (orange, lemon) increase iron absorption; avoid tea or milk.',
            guidelineTier: 'Pediatric Anemia Protocol',
            type: 'essential'
          },
          {
            id: 'albendazole-co-treatment',
            drugName: 'Albendazole 400mg Tablet (Deworming Co-treatment)',
            genericName: 'Albendazole',
            formulation: 'Chewable Tablet 400mg',
            route: 'Oral',
            dosage: 'Single dose deworming',
            frequency: 'STAT',
            duration: '1 day',
            totalQuantity: '1 tablet',
            instructions: 'Co-treat for hookworm which is a major cause of rural iron-deficiency anemia.',
            guidelineTier: 'Co-intervention Deworming',
            type: 'co-intervention'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Feed child iron-rich foods: green leafy vegetables (kontomire/cocoyam leaves, amaranth), eggs, liver, beans, and fish.',
          'Provide fresh oranges or citrus fruits after meals to boost non-heme iron absorption.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'ferrous-sulfate-adult',
            drugName: 'Ferrous Sulfate 200mg + Folic Acid 5mg Tablets',
            genericName: 'Ferrous Sulfate 200mg (65mg elemental Fe) + Folic Acid 5mg',
            formulation: 'Coated Tablet',
            route: 'Oral',
            dosage: '1 tablet two to three times daily',
            frequency: 'Two to three times daily with or after meals',
            duration: '30 to 90 days',
            totalQuantity: '60 to 90 tablets',
            instructions: 'Take with or immediately after meals with water or citrus juice. Avoid tea/coffee within 1 hour of taking iron.',
            guidelineTier: 'First-Line Hematologic Restoration',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'ferrous-folate-pregnancy',
            drugName: 'Ferrous Sulfate 200mg + Folic Acid 0.4mg/5mg (Routine ANC Supplement)',
            genericName: 'Iron + Folic Acid',
            formulation: 'Coated tablet',
            route: 'Oral',
            dosage: '1 tablet daily throughout pregnancy and for 3 months post-partum',
            frequency: 'Once daily with meals',
            duration: '30 days (refill at each ANC visit)',
            totalQuantity: '30 tablets',
            instructions: 'Mandatory standard antenatal care (ANC) supplement. Prevents maternal anemia and fetal neural tube defects.',
            guidelineTier: 'Standard Antenatal Iron Supplementation',
            pregnancySafetyNote: 'Essential standard of care in all pregnancies.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Increase dietary intake of kontomire (cocoyam leaves), moringa, cowpeas, groundnuts, liver, and fish.',
          'Avoid drinking strong tea, coffee, or herbal bitters with meals.'
        ]
      }
    },
    counselingPoints: [
      'Iron therapy must continue for at least 2-3 months after Hb normalizes.',
      'Do not stop taking iron if harmless dark stool occurs.'
    ]
  },

  // 16. PRIMARY HYPERTENSION (STAGE 1 RURAL MAINTENANCE)
  {
    id: 'HYPERTENSION',
    title: 'Essential Primary Hypertension (Stage 1 Maintenance)',
    icdCode: 'I10',
    category: 'Chronic & Non-Communicable Diseases (NCDs)',
    description: 'Confirmed BP ≥ 140/90 mmHg on two separate visits without target organ damage or acute hypertensive emergency.',
    commonSymptoms: ['Often asymptomatic', 'Occipital morning headache', 'Dizziness', 'Tinnitus'],
    redFlags: ['BP > 180/120 mmHg (Hypertensive Crisis)', 'Severe chest pain / shortness of breath', 'Visual disturbances / Papilledema', 'Acute neurological deficit / stroke'],
    recommendations: {
      child: {
        firstLine: [],
        penicillinAllergic: [],
        supportiveCare: [
          'Hypertension in children under 12 is almost always secondary. IMMEDIATE REFERRAL to District Pediatric Unit is mandatory.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'amlodipine-adult-htn',
            drugName: 'Amlodipine 5mg Tablets (or Hydrochlorothiazide 12.5mg)',
            genericName: 'Amlodipine Besylate',
            formulation: 'Tablet 5mg',
            route: 'Oral',
            dosage: '5mg once daily in the morning',
            frequency: 'Once daily (OD)',
            duration: '30 days (refill monthly)',
            totalQuantity: '30 tablets',
            instructions: 'Calcium channel blocker: First-line antihypertensive in populations of African descent. Take consistently every morning. May cause mild ankle edema.',
            guidelineTier: 'First-Line Antihypertensive Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'methyldopa-pregnancy-htn',
            drugName: 'Methyldopa 250mg Tablets (or Labetalol 100mg BD)',
            genericName: 'Methyldopa',
            formulation: 'Film-coated tablet 250mg',
            route: 'Oral',
            dosage: '250mg two to three times daily (titrated up to 500mg TDS)',
            frequency: 'Two to three times daily',
            duration: '30 days',
            totalQuantity: '60 to 90 tablets',
            instructions: 'MANDATORY MATERNAL SAFETY: ACE-inhibitors (Lisinopril) and ARBs are strictly CONTRAINDICATED in pregnancy due to severe fetal renal agenesis and death. Methyldopa or Labetalol is safe.',
            guidelineTier: 'Antenatal Antihypertensive Protocol',
            pregnancySafetyNote: 'Crucial: ACE-inhibitors blocked; Methyldopa safely selected for maternal hypertension.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Strictly restrict dietary salt intake: do not add raw table salt or processed bouillon cubes (e.g. Maggi) to food.',
          'Engage in brisk walking for at least 30 minutes daily.',
          'Avoid tobacco and reduce alcohol consumption.'
        ]
      }
    },
    counselingPoints: [
      'Hypertension is a silent killer: medication must be taken every day even when feeling energetic.',
      'Check blood pressure every month at the CHPS compound.'
    ]
  },

  // 17. BRONCHOSPASM / MILD ASTHMA
  {
    id: 'ASTHMA_BRONCHOSPASM',
    title: 'Mild-to-Moderate Acute Asthma / Wheezing Bronchospasm',
    icdCode: 'J45.9',
    category: 'Respiratory',
    description: 'Recurrent episodes of wheezing, chest tightness, and breathlessness with prolonged expiratory phase and audible rhonchi.',
    commonSymptoms: ['Expiratory wheeze', 'Cough worse at night / early morning', 'Chest tightness', 'Shortness of breath on exertion'],
    redFlags: ['Silent chest (no breath sounds due to severe obstruction)', 'Unable to speak in sentences', 'Pulsus paradoxus', 'Cyanosis / exhaustion'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'salbutamol-child-inhaler',
            drugName: 'Salbutamol 100mcg/puff Metered Dose Inhaler (with Spacer)',
            genericName: 'Salbutamol Sulfate',
            formulation: 'Aerosol Inhaler (200 doses)',
            route: 'Inhalation (via spacer device with mask)',
            dosage: '2 to 4 puffs every 20 minutes for up to 1 hour, then 2-4 puffs every 4-6h PRN',
            frequency: 'PRN as needed for acute wheeze',
            duration: '1 canister',
            totalQuantity: '1 inhaler canister',
            instructions: 'Must use a spacer chamber (or modified plastic bottle spacer). Shake inhaler, insert into spacer, release 1 puff, allow child to take 5 normal breaths.',
            guidelineTier: 'First-Line Bronchodilator Protocol',
            type: 'essential'
          },
          {
            id: 'prednisolone-child-asthma',
            drugName: 'Prednisolone 5mg Dispersible Tablets / Syrup',
            genericName: 'Prednisolone',
            formulation: 'Dispersible Tablet 5mg',
            route: 'Oral',
            dosage: '1 to 2 mg/kg once daily in the morning with food (Max 40mg/day)',
            frequency: 'Once daily in morning (OD)',
            duration: '3 days (short burst, no taper needed)',
            totalQuantity: '6 to 12 tablets',
            instructions: 'Short-course oral steroid rapidly resolves airway inflammation and prevents relapse. Give after breakfast.',
            guidelineTier: 'Short-Burst Anti-Inflammatory Protocol',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Keep child calm and sit upright; do not force child to lie flat.',
          'Identify and remove environmental triggers: cooking smoke, dust, animal dander, cold air.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'salbutamol-adult-inhaler',
            drugName: 'Salbutamol 100mcg Inhaler',
            genericName: 'Salbutamol',
            formulation: 'Inhaler (200 puffs)',
            route: 'Inhalation',
            dosage: '2 puffs every 4 to 6 hours as needed for wheeze/breathlessness',
            frequency: 'PRN as needed',
            duration: 'As required',
            totalQuantity: '1 inhaler',
            instructions: 'Inhale deeply as canister is pressed. Hold breath for 10 seconds before exhaling.',
            guidelineTier: 'Short-Acting Beta-2 Agonist',
            type: 'essential'
          },
          {
            id: 'prednisolone-adult-asthma',
            drugName: 'Prednisolone 5mg Tablets',
            genericName: 'Prednisolone',
            formulation: 'Tablet 5mg',
            route: 'Oral',
            dosage: '30mg to 40mg (6-8 tablets) once daily in the morning with breakfast',
            frequency: 'Once daily for 5 days',
            duration: '5 days',
            totalQuantity: '30 to 40 tablets',
            instructions: 'Take with breakfast. Does not require tapering after short 5-day course.',
            guidelineTier: 'Oral Corticosteroid Burst',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Avoid cooking over open woodfires in enclosed rooms.',
          'Do not take non-selective beta-blockers (propranolol) or NSAIDs (aspirin) which trigger severe bronchospasm.'
        ]
      }
    },
    counselingPoints: [
      'Inhalers must be carried with the patient at all times.',
      'Seek emergency hospital care immediately if inhaler relief lasts less than 2 hours.'
    ]
  },

  // 18. DYSPEPSIA / PEPTIC ULCER DISEASE
  {
    id: 'DYSPEPSIA_PUD',
    title: 'Dyspepsia / Acid Peptic Disease (Heartburn & Gastritis)',
    icdCode: 'K30',
    category: 'Gastrointestinal',
    description: 'Epigastric burning pain, postprandial fullness, heartburn, regurgitation related to meals without GI bleeding.',
    commonSymptoms: ['Epigastric burning ache', 'Heartburn (acid reflux)', 'Belching / Bloating', 'Nausea after meals'],
    redFlags: ['Vomiting blood (hematemesis) or "coffee-ground" vomitus', 'Black tarry stools (melena)', 'Unintentional rapid weight loss', 'Difficulty swallowing (dysphagia)'],
    recommendations: {
      child: {
        firstLine: [
          {
            id: 'antacid-child-dyspepsia',
            drugName: 'Magnesium Trisilicate Compound Suspension',
            genericName: 'Magnesium Trisilicate + Aluminium Hydroxide',
            formulation: 'Oral Suspension (200ml)',
            route: 'Oral',
            dosage: '5ml to 10ml three times daily between meals and at bedtime',
            frequency: 'TDS PC & at night',
            duration: '5 to 7 days',
            totalQuantity: '1 bottle (200ml)',
            instructions: 'Shake well. Neutralizes gastric acidity and coats esophagus.',
            guidelineTier: 'Antacid Relief',
            type: 'essential'
          }
        ],
        penicillinAllergic: [],
        supportiveCare: [
          'Avoid spicy, acidic foods and carbonated drinks.',
          'Do not give NSAIDs or Aspirin.'
        ]
      },
      adult: {
        firstLine: [
          {
            id: 'omeprazole-adult-pud',
            drugName: 'Omeprazole 20mg Delayed-Release Capsules',
            genericName: 'Omeprazole',
            formulation: 'Capsule 20mg',
            route: 'Oral',
            dosage: '20mg once daily in the morning',
            frequency: 'Once daily (OD) 30 minutes before breakfast',
            duration: '14 to 28 days',
            totalQuantity: '14 to 28 capsules',
            instructions: 'Swallow whole with a glass of water; do not crush or chew beads inside capsule. Take strictly 30 minutes prior to first meal.',
            guidelineTier: 'Proton Pump Inhibitor Protocol',
            type: 'essential'
          },
          {
            id: 'antacid-adult-pud',
            drugName: 'Magnesium Trisilicate Mixture',
            genericName: 'Magnesium Trisilicate',
            formulation: 'Oral Suspension (200ml)',
            route: 'Oral',
            dosage: '10ml to 15ml as needed between meals for breakthrough pain',
            frequency: 'PRN',
            duration: '7 days',
            totalQuantity: '1 bottle',
            instructions: 'Provides rapid symptomatic buffering of stomach acid.',
            guidelineTier: 'Antacid Support',
            type: 'supportive'
          }
        ],
        penicillinAllergic: [],
        pregnancySafe: [
          {
            id: 'antacid-pregnancy-pud',
            drugName: 'Aluminium Hydroxide + Magnesium Trisilicate Suspension (or Omeprazole 20mg)',
            genericName: 'Antacid Suspension',
            formulation: 'Suspension',
            route: 'Oral',
            dosage: '10ml three times daily after meals and at bedtime',
            frequency: 'TDS & Bedtime',
            duration: '14 days',
            totalQuantity: '1 bottle',
            instructions: 'Antacids are safe in pregnancy for gestational reflux. Omeprazole is Category C and reserved for severe persistent symptoms.',
            guidelineTier: 'Maternal Reflux Protocol',
            pregnancySafetyNote: 'Safe antacid therapy for gestational heartburn.',
            type: 'essential'
          }
        ],
        supportiveCare: [
          'Eat smaller, more frequent meals; do not lie down immediately after eating.',
          'Avoid excessive coffee, alcohol, smoking, and hot pepper.',
          'Completely stop taking NSAIDs (Ibuprofen, Diclofenac) which directly erode stomach lining.'
        ]
      }
    },
    counselingPoints: [
      'Take Omeprazole consistently 30 minutes before breakfast.',
      'Seek immediate hospital attention if stool turns jet black or vomit contains blood.'
    ]
  }
];

export function evaluateDangerSigns(selectedDangerSignIds: string[]): DangerSignAlert {
  if (!selectedDangerSignIds || selectedDangerSignIds.length === 0) {
    return {
      isTriggered: false,
      severity: 'NORMAL',
      presentSigns: [],
      prereferralTreatment: [],
      stabilizationProtocol: [],
      referralFacilityType: 'Primary Outpatient Care'
    };
  }

  const presentSignsLabels = selectedDangerSignIds.map(id => {
    const item = IMCI_DANGER_SIGNS.find(s => s.id === id);
    return item ? item.label : id;
  });

  const prereferralTreatment: string[] = [
    'If child has fever with danger signs in malaria-endemic zone: Administer single dose Rectal Artesunate (100mg for <10kg, 200mg for 10-20kg) or IM Artesunate (2.4mg/kg) before departure.',
    'If in severe respiratory distress: Clear airway, administer oxygen if concentrator/cylinder is present, position sitting upright, avoid oral liquids.',
    'If convulsing: Ensure lateral recovery position, protect airway, administer rectal Diazepam (0.5mg/kg) if qualified.',
    'If severely dehydrated: Start IV Ringer\'s Lactate or Normal Saline immediately (100ml/kg protocol) if trained; otherwise give ORS via Nasogastric Tube on route.'
  ];

  const stabilizationProtocol: string[] = [
    'Keep patient warm with clean blanket (prevent hypothermia, especially in infants).',
    'Position in semi-fowler (if dyspneic) or left lateral recovery position (if unconscious).',
    'Write a clear Referral Note stating: Vitals, danger signs observed, pre-referral medicines administered with exact time and dose.',
    'Arrange urgent motorized transport / emergency ambulance to District Hospital.',
    'Send a health worker or trained community volunteer to accompany patient.'
  ];

  return {
    isTriggered: true,
    severity: 'CRITICAL_EMERGENCY',
    presentSigns: presentSignsLabels,
    prereferralTreatment,
    stabilizationProtocol,
    referralFacilityType: 'District Hospital / Emergency Referral Center'
  };
}

export function generatePrescriptionDecision(
  patient: PatientBiodata,
  diagnosisId: string,
  dangerSigns: string[] = []
): {
  prescriptions: PrescriptionItem[];
  dangerAlert: DangerSignAlert;
  counseling: string[];
  clinicalRationale: string[];
} {
  const dangerAlert = evaluateDangerSigns(dangerSigns);
  const condition = CONDITIONS_DATABASE.find(c => c.id === diagnosisId);

  if (!condition) {
    return {
      prescriptions: [],
      dangerAlert,
      counseling: [],
      clinicalRationale: ['No protocol matching the selected diagnosis was found.']
    };
  }

  // If critical danger signs are present, suppress routine oral outpatient dispensing
  if (dangerAlert.isTriggered) {
    return {
      prescriptions: [],
      dangerAlert,
      counseling: [
        'DO NOT dispense routine oral tablets or syrups at the primary post.',
        'Immediate emergency referral to District Hospital is mandatory.',
        'Provide only authorized pre-referral stabilization doses.'
      ],
      clinicalRationale: [
        `Patient exhibits ${dangerAlert.presentSigns.length} critical danger sign(s): ${dangerAlert.presentSigns.join(', ')}.`,
        'Oral medication absorption is unreliable and delay in hospital transfer carries high mortality.'
      ]
    };
  }

  const isChild = patient.age !== null && patient.age < 12;
  const isPenicillinAllergic = patient.knownAllergies.some(a =>
    a.toLowerCase().includes('penicillin') || a.toLowerCase().includes('amoxicillin')
  );
  const isPregnant = patient.gender === 'Female' && patient.isPregnant;

  let prescriptions: PrescriptionItem[] = [];
  const clinicalRationale: string[] = [];

  clinicalRationale.push(
    `Patient classified under ${isChild ? 'CHILD (< 12 Years) Pediatric Cohort' : 'ADULT (≥ 12 Years) Cohort'}.`
  );

  if (isChild) {
    clinicalRationale.push(
      'Formulations prioritized as pediatric syrups, suspensions, or dispersible tablets.'
    );

    if (patient.weightKg) {
      clinicalRationale.push(`Weight-specific dosing calculated for ${patient.weightKg} kg.`);
    }

    if (isPenicillinAllergic && condition.recommendations.child.penicillinAllergic.length > 0) {
      prescriptions.push(...condition.recommendations.child.penicillinAllergic);
      clinicalRationale.push('Penicillin allergy detected: substituted with allergy-safe macrolide protocol.');
    } else {
      prescriptions.push(...condition.recommendations.child.firstLine);
    }

    // Dynamic weight adjustments for pediatric medications
    prescriptions = prescriptions.map(item => {
      if (item.drugName.includes('Artemether-Lumefantrine') && patient.weightKg) {
        let tabs = '1 tablet';
        let total = '6 tablets';
        if (patient.weightKg >= 15 && patient.weightKg < 25) {
          tabs = '2 tablets';
          total = '12 tablets';
        } else if (patient.weightKg >= 25 && patient.weightKg < 35) {
          tabs = '3 tablets';
          total = '18 tablets';
        } else if (patient.weightKg >= 35) {
          tabs = '4 tablets';
          total = '24 tablets';
        }
        return {
          ...item,
          dosage: `${tabs} twice daily (at 0h, 8h, 24h, 36h, 48h, 60h)`,
          totalQuantity: total,
          instructions: `${item.instructions} [Weight bracket: ${patient.weightKg}kg -> ${tabs}/dose]`
        };
      }

      if (item.drugName.includes('Paracetamol') && patient.weightKg) {
        const singleDoseMg = Math.round(patient.weightKg * 12.5); // 10-15 mg/kg
        const mlDose = Math.round((singleDoseMg / 120) * 5 * 10) / 10;
        return {
          ...item,
          dosage: `${singleDoseMg}mg (${mlDose}ml) every 6-8 hours PRN`,
          instructions: `${item.instructions} [Exact weight calculation: ${patient.weightKg}kg x 12.5mg/kg = ${singleDoseMg}mg (${mlDose}ml)]`
        };
      }

      if (item.drugName.includes('Amoxicillin') && patient.weightKg) {
        const mgPerDose = Math.round((patient.weightKg * 45) / 2); // 45mg/kg/day in 2 divided doses
        return {
          ...item,
          dosage: `${mgPerDose}mg twice daily (or 10-15ml suspension)`,
          instructions: `${item.instructions} [Calculated for ${patient.weightKg}kg at 45mg/kg/day]`
        };
      }

      return item;
    });

  } else {
    // Adult
    clinicalRationale.push('Standard adult solid dosage forms (tablets/capsules) applied.');

    if (isPregnant && condition.recommendations.adult.pregnancySafe && condition.recommendations.adult.pregnancySafe.length > 0) {
      prescriptions.push(...condition.recommendations.adult.pregnancySafe);
      clinicalRationale.push('Patient is pregnant: applied strict pregnancy-safe protocol, filtering out teratogenic drugs.');
    } else if (isPenicillinAllergic && condition.recommendations.adult.penicillinAllergic.length > 0) {
      prescriptions.push(...condition.recommendations.adult.penicillinAllergic);
      clinicalRationale.push('Penicillin allergy detected: substituted with allergy-safe macrolide protocol.');
    } else {
      prescriptions.push(...condition.recommendations.adult.firstLine);
    }
  }

  const counseling = isChild
    ? [...condition.counselingPoints, ...condition.recommendations.child.supportiveCare]
    : [...condition.counselingPoints, ...condition.recommendations.adult.supportiveCare];

  return {
    prescriptions,
    dangerAlert,
    counseling,
    clinicalRationale
  };
}

export const SAMPLE_PATIENTS: { label: string; description: string; data: PatientBiodata }[] = [
  {
    label: 'Pediatric Malaria (8yo child)',
    description: 'Child presenting with fever, chills, 22kg weight, no allergies',
    data: {
      fullName: 'Kwame Osei Mensah',
      healthId: '82049182',
      age: 8,
      ageUnit: 'years',
      gender: 'Male',
      cohort: 'child',
      weightKg: 22,
      isPregnant: false,
      isLactating: false,
      knownAllergies: [],
      chronicConditions: [],
      vitals: {
        temperatureC: 38.6,
        pulseBpm: 110,
        respiratoryRate: 24,
        weightKg: 22
      },
      communityLocation: 'Aburi Valley CHPS Zone'
    }
  },
  {
    label: 'Pregnant Mother with Fever (24yo)',
    description: 'Female in 1st trimester with fever, nausea, weight 58kg',
    data: {
      fullName: 'Akua Serwaa Boateng',
      healthId: '91482015',
      age: 24,
      ageUnit: 'years',
      gender: 'Female',
      cohort: 'adult',
      weightKg: 58,
      isPregnant: true,
      isLactating: false,
      knownAllergies: [],
      chronicConditions: [],
      vitals: {
        temperatureC: 38.4,
        systolicBp: 115,
        diastolicBp: 75,
        pulseBpm: 88,
        weightKg: 58
      },
      communityLocation: 'Nsawam Rural Outpost'
    }
  },
  {
    label: 'Child with Diarrhea & Dehydration (4yo)',
    description: '4yo child with watery stool x 2 days, 15kg, no red flags',
    data: {
      fullName: 'Kofi Owusu',
      healthId: '77301948',
      age: 4,
      ageUnit: 'years',
      gender: 'Male',
      cohort: 'child',
      weightKg: 15,
      isPregnant: false,
      isLactating: false,
      knownAllergies: [],
      chronicConditions: [],
      vitals: {
        temperatureC: 37.4,
        pulseBpm: 98,
        respiratoryRate: 22,
        weightKg: 15
      },
      communityLocation: 'Kukurantumi Station'
    }
  },
  {
    label: 'Adult with RTI & Penicillin Allergy (35yo)',
    description: 'Adult female with cough, sore throat, documented penicillin allergy',
    data: {
      fullName: 'Abena Mansa',
      healthId: '63901844',
      age: 35,
      ageUnit: 'years',
      gender: 'Female',
      cohort: 'adult',
      weightKg: 64,
      isPregnant: false,
      isLactating: false,
      knownAllergies: ['Penicillins (Amoxicillin, Ampicillin, Pen V)'],
      chronicConditions: [],
      vitals: {
        temperatureC: 37.9,
        systolicBp: 122,
        diastolicBp: 78,
        pulseBpm: 82,
        weightKg: 64
      },
      communityLocation: 'Asamankese West Sector'
    }
  },
  {
    label: 'Child with Scabies & Itch (6yo)',
    description: '6yo child with severe nocturnal itching in finger web spaces, weight 19kg',
    data: {
      fullName: 'Yaw Frimpong',
      healthId: '55910248',
      age: 6,
      ageUnit: 'years',
      gender: 'Male',
      cohort: 'child',
      weightKg: 19,
      isPregnant: false,
      isLactating: false,
      knownAllergies: [],
      chronicConditions: [],
      vitals: {
        temperatureC: 36.8,
        pulseBpm: 92,
        respiratoryRate: 20,
        weightKg: 19
      },
      communityLocation: 'Amanfro Settlement'
    }
  },
  {
    label: 'Adult with Stage 1 Hypertension (52yo)',
    description: 'Adult male with BP 148/92 mmHg, morning headache, weight 76kg',
    data: {
      fullName: 'Kwadwo Appiah',
      healthId: '41098231',
      age: 52,
      ageUnit: 'years',
      gender: 'Male',
      cohort: 'adult',
      weightKg: 76,
      isPregnant: false,
      isLactating: false,
      knownAllergies: [],
      chronicConditions: ['Hypertension'],
      vitals: {
        temperatureC: 36.7,
        systolicBp: 148,
        diastolicBp: 92,
        pulseBpm: 76,
        weightKg: 76
      },
      communityLocation: 'Pakro CHPS Outpost'
    }
  }
];

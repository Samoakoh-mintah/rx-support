import React from 'react';
import { UserCheck, Activity, Pill, FileCheck, Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  maxReachableStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
  maxReachableStep
}) => {
  const steps = [
    { number: 1, title: 'Patient Biodata', subtitle: 'Demographics & Vitals', icon: UserCheck },
    { number: 2, title: 'Assessment & Triage', subtitle: 'Diagnosis & Red Flags', icon: Activity },
    { number: 3, title: 'Prescription Engine', subtitle: 'Guideline Dosages', icon: Pill },
    { number: 4, title: 'Dispensing Voucher', subtitle: 'Slip & Record Export', icon: FileCheck }
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-xs no-print">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isClickable = step.number <= maxReachableStep;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.number}>
                <button
                  type="button"
                  onClick={() => isClickable && onSelectStep(step.number)}
                  disabled={!isClickable}
                  className={`flex items-center gap-3 text-left focus:outline-none transition-all group ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                >
                  {/* Step Circle Badge */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                        : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                  </div>

                  {/* Step Labels */}
                  <div className="hidden sm:block">
                    <p
                      className={`text-xs font-bold leading-tight ${
                        isCurrent
                          ? 'text-emerald-900'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {step.subtitle}
                    </p>
                  </div>
                </button>

                {/* Connecting Line between steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${
                      currentStep > step.number ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

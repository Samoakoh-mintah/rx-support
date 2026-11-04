import React, { useState } from 'react';
import { CONDITIONS_DATABASE, IMCI_DANGER_SIGNS } from '../data/clinicalGuidelines';
import { 
  BookOpen, 
  Baby, 
  User, 
  AlertTriangle, 
  ShieldAlert, 
  HeartHandshake, 
  Search, 
  Check, 
  Scale
} from 'lucide-react';

export const FormularyView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondId, setSelectedCondId] = useState(CONDITIONS_DATABASE[0].id);

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

  const filtered = CONDITIONS_DATABASE.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.icdCode.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activeCondition = CONDITIONS_DATABASE.find(c => c.id === selectedCondId) || filtered[0] || CONDITIONS_DATABASE[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            Standard Treatment Guidelines & Dosing Formulary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Offline clinical reference compendium based on Primary Care guidelines for rural health posts.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guidelines..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Condition Selector List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Clinical Conditions ({filtered.length})
          </h3>
          <div className="space-y-1.5">
            {filtered.map(cond => {
              const isSelected = cond.id === activeCondition.id;
              return (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondId(cond.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold leading-tight">{cond.title}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cond.icdCode}
                    </span>
                  </div>
                  <span className={`text-[11px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {cond.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Rules Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2.5 mt-4">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-700" />
              Cohort Categorization Policy
            </span>
            <div className="space-y-1 text-[11px] text-slate-600">
              <p>
                <strong>Child Cohort (&lt; 12 years):</strong> Liquid suspensions, oral syrups, or dispersible tablets. Dosing by weight ($mg/kg$) or defined age bands.
              </p>
              <p>
                <strong>Adult Cohort (≥ 12 years):</strong> Standard solid oral tablets and capsules. Fixed adult therapeutic dosages.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Condition Protocol */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            
            {/* Condition Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activeCondition.icdCode}
                </span>
                <span className="text-xs text-slate-400 font-medium">{activeCondition.category}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeCondition.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeCondition.description}
              </p>
            </div>

            {/* Pediatric Protocol (< 12 Years) */}
            <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase">
                <Baby className="w-4 h-4 text-blue-700" />
                Pediatric Regimen (&lt; 12 Years Child Cohort)
              </div>
              <div className="space-y-2">
                {activeCondition.recommendations.child.firstLine.map(item => (
                  <div key={item.id} className="bg-white p-3 rounded-lg border border-blue-100 text-xs space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900">{item.drugName}</span>
                      <span className="text-blue-800 font-mono font-bold">{item.dosage}</span>
                    </div>
                    <p className="text-slate-600">{item.formulation} · {item.frequency} · {item.duration}</p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">{item.instructions}</p>
                  </div>
                ))}

                {activeCondition.recommendations.child.penicillinAllergic.length > 0 && (
                  <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 text-xs">
                    <span className="font-bold text-amber-900 block mb-1">
                      If Child has Penicillin Allergy:
                    </span>
                    {activeCondition.recommendations.child.penicillinAllergic.map(alt => (
                      <div key={alt.id}>
                        <span className="font-bold text-slate-800">{alt.drugName}: </span>
                        <span>{alt.dosage} ({alt.frequency} x {alt.duration})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Adult Protocol (≥ 12 Years) */}
            <div className="border border-indigo-200 bg-indigo-50/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase">
                <User className="w-4 h-4 text-indigo-700" />
                Adult Regimen (≥ 12 Years Adult Cohort)
              </div>
              <div className="space-y-2">
                {activeCondition.recommendations.adult.firstLine.map(item => (
                  <div key={item.id} className="bg-white p-3 rounded-lg border border-indigo-100 text-xs space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900">{item.drugName}</span>
                      <span className="text-indigo-800 font-mono font-bold">{item.dosage}</span>
                    </div>
                    <p className="text-slate-600">{item.formulation} · {item.frequency} · {item.duration}</p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">{item.instructions}</p>
                  </div>
                ))}

                {activeCondition.recommendations.adult.pregnancySafe && (
                  <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 text-xs">
                    <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Pregnancy-Safe Substitution Protocol:
                    </span>
                    {activeCondition.recommendations.adult.pregnancySafe.map(preg => (
                      <div key={preg.id}>
                        <span className="font-bold text-slate-800">{preg.drugName}: </span>
                        <span>{preg.dosage} ({preg.frequency} x {preg.duration})</span>
                        <p className="text-[11px] text-amber-800 mt-0.5">{preg.instructions}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Supportive Care Counseling */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">
                Non-Pharmacological Counseling Points:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {activeCondition.counselingPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

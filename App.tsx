
import React, { useState, useMemo } from 'react';
import { COMPETITORS_DATA } from './constants';
import { Competitor } from './types';
import CompetitorCard from './components/CompetitorCard';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const allCompetitors = useMemo(() => Object.values(COMPETITORS_DATA), []);

  const filteredCompetitors = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return allCompetitors;
    return allCompetitors.filter(c => 
      c.id.toString().includes(term) || 
      (c.name && c.name.toLowerCase().includes(term)) ||
      (c.vehicle && c.vehicle.toLowerCase().includes(term))
    );
  }, [searchTerm, allCompetitors]);

  return (
    <div className="relative flex flex-col min-h-screen text-dakar-black selection:bg-dakar-yellow selection:text-dakar-black z-10">
      
      {/* Header - Super Clean */}
      <header className="relative px-6 pt-16 pb-8 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-dakar-yellow/5 to-transparent -z-10"></div>
        
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-5xl font-[900] text-black tracking-tighter">
            ارحبببوا
          </h2>
          <div className="h-1.5 w-14 bg-dakar-yellow rounded-full mt-2"></div>
          
          <p className="mt-6 text-[13px] font-bold text-gray-500 leading-relaxed max-w-[280px] mx-auto">
            هنا بتلقى معلومات سريعة عن السائقين السعوديين وأهم السائقين المتنافسين على البطولة
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-sm mx-auto">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث برقم المتسابق أو اسمه..." 
            className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-base font-bold outline-none focus:border-dakar-yellow transition-all placeholder:text-gray-300 text-center shadow-sm"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-dakar-yellow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 pb-12">
        {filteredCompetitors.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredCompetitors.map((competitor, idx) => (
              <div key={competitor.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <CompetitorCard competitor={competitor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold mb-4">لا يوجد نتائج لهذا البحث</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-dakar-black underline text-xs font-black"
            >
              عرض الكل
            </button>
          </div>
        )}
      </main>

    </div>
  );
};

export default App;

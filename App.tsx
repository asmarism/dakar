
import React, { useState, useMemo } from 'react';
import { COMPETITORS_DATA } from './constants';
import CompetitorCard from './components/CompetitorCard';
import ChatBot from './components/ChatBot';

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
    <div className="relative flex flex-col min-h-screen text-dakar-black selection:bg-dakar-yellow selection:text-dakar-black">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 px-6 py-8">
        <div className="glass-card rounded-[2.5rem] p-8 text-center border-white/80">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-6xl font-[900] text-black tracking-tighter drop-shadow-sm">
              ارحبببوا
            </h2>
            <div className="h-1.5 w-16 bg-dakar-yellow rounded-full mt-3 shadow-[0_0_15px_rgba(255,210,0,0.5)]"></div>
            
            <p className="mt-6 text-[14px] font-bold text-gray-600 leading-relaxed max-w-[260px] mx-auto opacity-80">
              هنا بتلقى معلومات سريعة عن السائقين السعوديين وأهم السائقين المتنافسين على البطولة
            </p>
          </div>

          {/* Search Box with Fluid Effect */}
          <div className="relative max-w-sm mx-auto group">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث برقم المتسابق أو اسمه..." 
              className="w-full bg-white/70 border-2 border-white rounded-[1.8rem] px-8 py-5 text-base font-bold outline-none focus:ring-4 ring-dakar-yellow/10 transition-all placeholder:text-gray-300 text-center shadow-lg shadow-black/5"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-dakar-yellow group-focus-within:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Fluid List View */}
      <main className="flex-grow px-6 pb-32 pt-4">
        {filteredCompetitors.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredCompetitors.map((competitor, idx) => (
              <div 
                key={competitor.id} 
                className="animate-reveal" 
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CompetitorCard competitor={competitor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card flex flex-col items-center justify-center py-24 text-center rounded-[3rem] border-dashed">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-gray-400 font-bold mb-4">مالقينا شي للاسف</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-dakar-black text-white rounded-full text-xs font-black hover:scale-105 transition-transform"
            >
              عرض كل الأبطال
            </button>
          </div>
        )}
      </main>

      {/* Floating Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default App;

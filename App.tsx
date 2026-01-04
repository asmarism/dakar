
import React, { useState, useMemo } from 'react';
import { COMPETITORS_DATA } from './constants';
import { Competitor } from './types';
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
      (c.name && c.name.toLowerCase().includes(term))
    );
  }, [searchTerm, allCompetitors]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-dakar-black selection:bg-dakar-yellow selection:text-dakar-black">
      {/* Mobile Top Header */}
      <header className="bg-white sticky top-0 z-50 px-6 pt-8 pb-6 border-b border-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-dakar-black rounded-lg flex items-center justify-center">
              <span className="text-dakar-yellow font-black text-lg">D</span>
            </div>
            <h1 className="text-lg font-black uppercase tracking-tight">
              رالي داكار <span className="text-gray-400">السعودية</span>
            </h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
            <svg className="w-4 h-4 text-dakar-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </div>
        </div>

        {/* Search Bar - Mobile Focus */}
        <div className="relative group">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن سائق أو رقم..." 
            className="w-full bg-gray-100 border-2 border-transparent rounded-2xl px-6 py-4 text-base font-bold outline-none focus:bg-white focus:border-dakar-yellow transition-all shadow-sm placeholder:text-gray-400"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-black text-gray-300 uppercase tracking-widest">المتسابقون الرسميون</span>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <span className="w-2 h-2 bg-dakar-yellow rounded-full shadow-[0_0_8px_rgba(255,210,0,0.5)]"></span>
                <span className="text-[10px] font-black uppercase text-dakar-black">{filteredCompetitors.length} متسابق</span>
            </div>
        </div>

        {filteredCompetitors.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredCompetitors.map(competitor => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <p className="text-gray-400 font-bold mb-4">لا توجد نتائج مطابقة</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="bg-dakar-black text-dakar-yellow px-6 py-2 rounded-xl text-sm font-black shadow-lg"
            >
              عرض الكل
            </button>
          </div>
        )}
      </main>

      {/* Simple Footer for Mobile */}
      <footer className="p-10 bg-white border-t border-gray-50 text-center">
        <img src="https://www.dakar.com/img/dakar-logo.png" alt="Dakar" className="h-8 mx-auto mb-4 grayscale opacity-20" />
        <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.3em]">
          Dakar Rally Saudi Arabia Hub
        </p>
      </footer>

      {/* Floating Assistant */}
      <ChatBot />
    </div>
  );
};

export default App;

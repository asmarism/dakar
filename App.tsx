
import React, { useState, useMemo, useEffect } from 'react';
import { COMPETITORS_DATA } from './constants';
import CompetitorCard from './components/CompetitorCard';

const translations = {
  ar: {
    welcome: 'ارحبببوا',
    subtitle: 'هنا بتلقى معلومات السائقين السعوديين وأهم السائقين المتنافسين على البطولة',
    lightOff: 'طف النور',
    lightOn: 'شغل النور',
    langBtn: 'عنقليزي',
    langDir: 'rtl',
    sizeLabel: 'طريقة العرض'
  },
  en: {
    welcome: 'Welcome!',
    subtitle: 'Information about Saudi drivers and top championship competitors.',
    lightOff: 'Dark Mode',
    lightOn: 'Light Mode',
    langBtn: 'عربها',
    langDir: 'ltr',
    sizeLabel: 'View Style'
  }
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [cardScale, setCardScale] = useState(0); // Default to 0: Small

  const t = translations[lang];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dir = t.langDir;
    document.documentElement.lang = lang;
  }, [lang, t.langDir]);

  const allCompetitors = useMemo(() => Object.values(COMPETITORS_DATA), []);

  const gridClass = useMemo(() => {
    // 0 is Small (grid), 1 is Large (list)
    if (cardScale === 0) return 'grid-cols-2 md:grid-cols-3 gap-3';
    return 'grid-cols-1 gap-10 max-w-xl mx-auto';
  }, [cardScale]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#F9F7F2]'}`}>
      
      {/* Top Controls */}
      <div className="flex gap-2 px-4 pt-4 justify-end">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] shadow-sm transition-all active:scale-95 border ${
            isDarkMode 
            ? 'bg-dakar-black border-white/10 text-white' 
            : 'bg-white border-black/5 text-dakar-black'
          }`}
        >
          {isDarkMode ? '🌞 ' + t.lightOn : '🌙 ' + t.lightOff}
        </button>
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] shadow-sm transition-all active:scale-95 border ${
            isDarkMode 
            ? 'bg-dakar-black border-white/10 text-white' 
            : 'bg-white border-black/5 text-dakar-black'
          }`}
        >
          🌐 {t.langBtn}
        </button>
      </div>

      <header className="px-6 py-4 text-center">
        <h1 className={`text-4xl font-[950] tracking-tighter mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {t.welcome}
        </h1>
        <div className="h-1 w-12 bg-dakar-yellow rounded-full mx-auto mb-3"></div>
        
        <p className={`text-[12px] font-bold opacity-60 mb-6 transition-colors max-w-[280px] mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t.subtitle}
        </p>

        {/* Layout Toggle Icons (Grid or List) */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-gray-900 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
            <button 
              onClick={() => setCardScale(0)}
              className={`p-2.5 rounded-lg transition-all ${cardScale === 0 ? 'bg-dakar-yellow text-black' : 'text-gray-400 opacity-50'}`}
              title="Small Grid"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
            </button>
            <button 
              onClick={() => setCardScale(1)}
              className={`p-2.5 rounded-lg transition-all ${cardScale === 1 ? 'bg-dakar-yellow text-black' : 'text-gray-400 opacity-50'}`}
              title="Large View"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v7H4V4zm0 9h16v7H4v-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20">
        <div className={`grid ${gridClass} transition-all duration-500`}>
          {allCompetitors.map((competitor, idx) => (
            <div key={competitor.id} className="animate-reveal" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CompetitorCard competitor={competitor} lang={lang} size={cardScale === 0 ? 0 : 2} />
            </div>
          ))}
        </div>
      </main>
      
      <footer className="py-8 text-center opacity-20 text-[9px] font-black tracking-widest uppercase">
        © Dakar Saudi Arabia
      </footer>
    </div>
  );
};

export default App;


import React, { useState, useMemo } from 'react';
import { COMPETITORS_DATA, CREW, ITINERARY, VEHICLE_INFO } from './constants';
import CompetitorCard from './components/CompetitorCard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'competitors' | 'crew'>('itinerary');
  const [compFilter, setCompFilter] = useState<'all' | 'saudi'>('saudi');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'داكار') {
      setIsAuthenticated(true);
      setTimeout(() => setShowSelection(true), 100);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const startJourney = (tab: 'itinerary' | 'competitors' | 'crew') => {
    setActiveTab(tab);
    setShowSelection(false);
  };

  const competitors = useMemo(() => {
    const list = Object.values(COMPETITORS_DATA);
    if (compFilter === 'saudi') return list.filter(c => c.nationality === '🇸🇦');
    return list;
  }, [compFilter]);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 animate-reveal">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-[950] text-white mb-4 tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">ارررحببب</h1>
          <p className="text-white text-xl font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] bg-black/30 px-4 py-1 rounded-full">في رحلة داكار 2026</p>
        </div>
        <form onSubmit={handleLogin} className={`w-full max-w-xs space-y-4 ${error ? 'shake' : ''}`}>
          <div className="relative">
            <input 
              type="text"
              placeholder="أدخل كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 backdrop-blur-xl border-2 border-white/20 rounded-2xl py-5 px-6 text-center text-2xl font-black focus:outline-none focus:border-dakar-yellow transition-all placeholder:text-white/30 text-white shadow-2xl"
            />
          </div>
          <button type="submit" className="w-full bg-dakar-yellow text-white font-[950] py-5 rounded-2xl shadow-2xl shadow-dakar-yellow/40 active:scale-95 transition-transform text-xl border border-white/10">بسم الله ننطلق</button>
        </form>
      </div>
    );
  }

  if (showSelection) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 animate-reveal overflow-y-auto">
        <div className="text-center my-6">
          <p className="text-dakar-yellow bg-black/50 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg border border-dakar-yellow/30 backdrop-blur-md">جاهز للمهمة؟</p>
          <h2 className="text-4xl font-[950] text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">وش ودك تسوي؟</h2>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-[270px] pb-12">
          {/* Itinerary */}
          <button onClick={() => startJourney('itinerary')} className="liquid-glass p-5 rounded-[2rem] relative overflow-hidden group hover:border-dakar-yellow/50 transition-all active:scale-[0.98] flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dakar-yellow to-transparent opacity-30"></div>
            <span className="text-4xl mb-2 drop-shadow-2xl transform group-hover:scale-110 transition-transform">🗺️</span>
            <h3 className="text-lg font-black text-white drop-shadow-md">جدول الرحلة</h3>
          </button>
          
          {/* Competitors - Desert Rally SUV 🛻 */}
          <button onClick={() => startJourney('competitors')} className="liquid-glass p-5 rounded-[2rem] flex flex-col items-center text-center group hover:border-dakar-yellow/50 transition-all active:scale-[0.98]">
            <span className="text-4xl mb-2 drop-shadow-lg transform group-hover:rotate-12 transition-transform">🛻</span>
            <h3 className="text-lg font-black text-white group-hover:text-dakar-yellow transition-colors drop-shadow-md leading-tight">مين تتابع؟</h3>
          </button>
          
          {/* Crew */}
          <button onClick={() => startJourney('crew')} className="liquid-glass p-5 rounded-[2rem] flex flex-col items-center text-center group hover:border-dakar-yellow/50 transition-all active:scale-[0.98]">
            <span className="text-4xl mb-2 drop-shadow-lg transform group-hover:-rotate-12 transition-transform">👑</span>
            <h3 className="text-lg font-black text-white group-hover:text-dakar-yellow transition-colors drop-shadow-md leading-tight">أبطال الرحلة</h3>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-tajawal animate-reveal pb-10">
      <header className="sticky top-0 z-[60] bg-dakar-black/90 backdrop-blur-3xl border-b border-white/10 pb-2">
        <div className="flex justify-between items-center px-4 py-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-[950] tracking-tighter text-white">داكار 2026 🏎️</h1>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-dakar-yellow animate-pulse"></span>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-wider">Mission Plan</span>
            </div>
          </div>
          <button onClick={() => setShowSelection(true)} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-white/10 text-white flex items-center gap-2 active:scale-95 transition-all">
            <span>🏠</span>الرئيسية
          </button>
        </div>
        <div className="px-3">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {(['itinerary', 'competitors', 'crew'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-[11px] font-black rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-dakar-yellow text-white shadow-lg shadow-dakar-yellow/40' : 'text-white/30 hover:bg-white/5'}`}>
                {tab === 'itinerary' ? 'خارطة الطريق' : tab === 'competitors' ? 'مين تتابع؟' : 'أبطال الرحلة'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        {activeTab === 'itinerary' && (
          <div className="space-y-6 animate-reveal">
            <div className="grid grid-cols-1 gap-3">
              <div className="liquid-glass p-5 rounded-[2.5rem] border-r-4 border-r-blue-500 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-[12px] font-black text-blue-400 uppercase tracking-widest">تدّف زيين</h4>
                  <p className="text-xs font-bold text-white/70 mt-1 leading-relaxed">ترا الجو برررد .. ثيرمالك تحت ابطك وقبوعك فوق راسك</p>
                </div>
                <span className="text-4xl">🥶</span>
              </div>
              <div className="liquid-glass p-5 rounded-[2.5rem] border-r-4 border-r-orange-500 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-[12px] font-black text-orange-400 uppercase tracking-widest">الوضع خفافي</h4>
                  <p className="text-xs font-bold text-white/70 mt-1 leading-relaxed">ترا ورانا تنقلات كثير .. فبنكون خفيفين في العفش والحركة</p>
                </div>
                <span className="text-4xl">🪶</span>
              </div>
            </div>

            <div className="relative border-r-2 border-dashed border-white/20 pr-6 mr-3 space-y-12 pt-4">
              {ITINERARY.map((event) => (
                <div key={event.id} className="relative group">
                  <div className="absolute -right-[35px] top-0 w-4 h-4 rounded-full border-4 border-dakar-black bg-red-600 shadow-[0_0_15px_#dc2626] group-hover:scale-125 transition-all"></div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-dakar-yellow/40 text-white text-[8px] font-black rounded-md border border-dakar-yellow/50">{event.day} {event.date} {event.time}</span>
                    </div>
                    <h3 className="text-lg font-[900] text-white drop-shadow-md">
                      {event.title}
                    </h3>
                    <p className="text-xs font-bold text-white/60 leading-relaxed mt-2 bg-black/20 p-2 rounded-xl border border-white/5">{event.description}</p>
                    {event.geo && (
                      <a href={event.geo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black bg-white/5 border border-white/10 px-4 py-3 rounded-2xl w-fit mt-4 hover:bg-dakar-yellow hover:text-white transition-all shadow-lg active:scale-95">📍 فتح الموقع في قوقل ماب</a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="liquid-glass rounded-[2.5rem] overflow-hidden border border-white/10 group transition-all hover:border-dakar-yellow/20 mt-12">
              <div className="relative aspect-[16/9] bg-white/5">
                <img src={VEHICLE_INFO.img} alt={VEHICLE_INFO.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-dakar-yellow text-white px-4 py-1.5 rounded-full text-[11px] font-[900] shadow-2xl">سيارة التنقل</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competitors' && (
          <div className="animate-reveal">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                <button onClick={() => setCompFilter('saudi')} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${compFilter === 'saudi' ? 'bg-white/10 text-white shadow-xl border border-white/10' : 'text-white/20'}`}>🇸🇦 أبطالنا السعوديين</button>
                <button onClick={() => setCompFilter('all')} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${compFilter === 'all' ? 'bg-white/10 text-white shadow-xl border border-white/10' : 'text-white/20'}`}>🌍 النخبة العالمية</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {competitors.map((c) => (<CompetitorCard key={c.id} competitor={c} lang="ar" size={0} />))}
            </div>
          </div>
        )}

        {activeTab === 'crew' && (
          <div className="grid grid-cols-2 gap-4 animate-reveal">
            {CREW.map((member, idx) => (
              <div key={idx} className="liquid-glass rounded-[1.5rem] overflow-hidden group transition-all hover:border-dakar-yellow/20 flex flex-col">
                <div className="aspect-square overflow-hidden bg-white/5">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-[900] text-sm text-white group-hover:text-dakar-yellow transition-colors truncate">{member.name}</h3>
                  {member.name === 'أسامة' && (
                    <div className="mt-1"><span className="text-[8px] font-black px-2 py-0.5 bg-dakar-yellow text-white rounded-md uppercase">{member.role}</span></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

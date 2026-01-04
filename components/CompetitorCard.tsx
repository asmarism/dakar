
import React from 'react';
import { Competitor } from '../types';

interface Props {
  competitor: Competitor;
  lang: 'ar' | 'en';
  size: number; // 0: Small, 2: Large (mapped from App.tsx)
}

const CompetitorCard: React.FC<Props> = ({ competitor, lang, size }) => {
  const profileUrl = `https://www.dakar.com/en/competitor/${competitor.id}`;
  const isAr = lang === 'ar';

  // Sizing styles for binary choice (Small vs Large)
  const styles = {
    0: { // Small
      title: 'text-[11px]',
      info: 'text-[9px]',
      bib: 'text-sm',
      padding: 'p-2',
      icon: 'hidden',
      flag: 'text-lg',
      aspect: 'aspect-square',
      rounding: 'rounded-xl'
    },
    2: { // Large
      title: 'text-2xl',
      info: 'text-lg',
      bib: 'text-3xl',
      padding: 'p-6 md:p-8',
      icon: 'flex',
      flag: 'text-3xl',
      aspect: 'aspect-[16/10]',
      rounding: 'rounded-[1.5rem] md:rounded-[2rem]'
    }
  }[size as 0 | 2];

  return (
    <a 
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block relative flex flex-col bg-white dark:bg-[#151515] ${styles.rounding} overflow-hidden border border-gray-100 dark:border-white/5 shadow-md transition-all duration-500 hover:shadow-xl active:scale-[0.98]`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${styles.aspect}`}>
        <img 
          src={competitor.img} 
          alt={competitor.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Bib Badge */}
        <div className={`absolute bottom-0 ${isAr ? 'right-0 rounded-tl-xl' : 'left-0 rounded-tr-xl'} bg-dakar-yellow text-dakar-black font-[950] ${styles.bib} px-3 py-1 md:px-4 md:py-2 shadow-lg z-10 flex items-center justify-center`}>
          <span className="text-[10px] opacity-40 mr-0.5 font-black">#</span>
          {competitor.id}
        </div>
      </div>

      {/* Info Area */}
      <div className={styles.padding}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className={styles.flag}>
              {competitor.nationality === 'SA' ? '🇸🇦' : (competitor.nationality || '🇸🇦')}
            </span>
            <h3 className={`${styles.title} font-[900] text-black dark:text-white group-hover:text-dakar-yellow transition-colors truncate`}>
              {competitor.name}
            </h3>
          </div>
          
          <div className={`${styles.icon} bg-gray-50 dark:bg-white/5 p-2 rounded-full group-hover:bg-dakar-yellow group-hover:text-black transition-all`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={isAr ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
            </svg>
          </div>
        </div>

        {competitor.vehicle && size > 0 && (
          <div className="flex flex-col mt-3 md:mt-4 pt-3 border-t border-gray-50 dark:border-white/5">
            <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">
              {isAr ? 'المركبة' : 'MACHINE'}
            </span>
            <span className={`${styles.info} font-extrabold text-dakar-black dark:text-dakar-yellow italic truncate`}>
              {competitor.vehicle}
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

export default CompetitorCard;

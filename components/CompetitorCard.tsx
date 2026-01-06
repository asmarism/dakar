
import React from 'react';
import { Competitor } from '../types';

interface Props {
  competitor: Competitor;
  lang: 'ar' | 'en';
  size: number; // 0: Small Grid, 2: Large Detail
}

const CompetitorCard: React.FC<Props> = ({ competitor, lang, size }) => {
  const profileUrl = `https://www.dakar.com/en/competitor/${competitor.id}`;
  const isAr = lang === 'ar';

  const styles = {
    0: { // Small Grid
      title: 'text-[11px]',
      info: 'text-[9px]',
      padding: 'p-3',
      aspect: 'aspect-square',
      rounding: 'rounded-[1.5rem]',
      bibSize: 'text-[10px]'
    },
    2: { // Large List
      title: 'text-xl',
      info: 'text-xs',
      padding: 'p-5',
      aspect: 'aspect-[16/9]',
      rounding: 'rounded-[2rem]',
      bibSize: 'text-lg'
    }
  }[size as 0 | 2];

  return (
    <a 
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block relative liquid-glass ${styles.rounding} overflow-hidden hover:border-dakar-yellow/20 transition-all duration-500 active:scale-[0.98]`}
    >
      <div className={`relative ${styles.aspect} bg-white/5`}>
        <img 
          src={competitor.img} 
          alt={competitor.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className={`absolute bottom-0 ${isAr ? 'right-0 rounded-tr-2xl' : 'left-0 rounded-tl-2xl'} bg-dakar-yellow text-black font-[950] ${styles.bibSize} px-3 py-1 z-10`}>
          {competitor.id}
        </div>
      </div>

      <div className={styles.padding}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">{competitor.nationality}</span>
          <h3 className={`${styles.title} font-[900] text-white group-hover:text-dakar-yellow transition-colors truncate`}>
            {competitor.name}
          </h3>
        </div>
        {competitor.vehicle && (
          <div className="flex flex-col border-t border-white/5 pt-3">
            <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">Vehicle</span>
            <span className={`${styles.info} font-black text-dakar-yellow/70 uppercase italic truncate`}>
              {competitor.vehicle}
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

export default CompetitorCard;


import React from 'react';
import { Competitor } from '../types';

interface Props {
  competitor: Competitor;
}

const CompetitorCard: React.FC<Props> = ({ competitor }) => {
  const profileUrl = `https://www.dakar.com/en/competitor/${competitor.id}`;

  return (
    <a 
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative glass-card flex items-center p-4 rounded-[2rem] gap-5 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] active:scale-[0.97] border-white/60 block overflow-hidden"
    >
      {/* Decorative Blur Accent */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-dakar-yellow/10 rounded-full blur-3xl group-hover:bg-dakar-yellow/20 transition-all"></div>
      
      {/* Hexagonal/Rounded Image Container */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <div className="absolute inset-0 bg-dakar-yellow rotate-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105"></div>
        <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden border-2 border-white shadow-sm bg-white/50">
          <img 
            src={competitor.img} 
            alt={competitor.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
            loading="lazy"
          />
        </div>
        
        {/* Bib Number Badge */}
        <div className="absolute -bottom-1 -right-1 bg-dakar-black text-dakar-yellow font-black text-[10px] px-2 py-0.5 rounded-lg shadow-lg">
          #{competitor.id}
        </div>
      </div>

      {/* Content Side */}
      <div className="flex flex-col flex-grow justify-center py-2">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="text-2xl leading-none flex-shrink-0 drop-shadow-sm" 
            style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}
            role="img" 
            aria-label="nationality"
          >
            {competitor.nationality === 'SA' ? '🇸🇦' : (competitor.nationality || '🇸🇦')}
          </span>
          <h3 className="text-lg font-[900] text-dakar-black leading-tight group-hover:text-black transition-colors tracking-tight">
            {competitor.name}
          </h3>
        </div>
        
        {competitor.vehicle && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              Machine
            </span>
            <span className="text-[12px] font-bold text-gray-500 uppercase italic">
              {competitor.vehicle}
            </span>
          </div>
        )}
      </div>

      {/* Arrow Indicator */}
      <div className="flex-shrink-0 ml-2 opacity-30 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-500">
        <div className="p-3 bg-white/40 rounded-full border border-white">
          <svg className="w-5 h-5 text-dakar-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default CompetitorCard;

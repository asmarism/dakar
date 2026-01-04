
import React from 'react';
import { Competitor } from '../types';

interface Props {
  competitor: Competitor;
}

const CompetitorCard: React.FC<Props> = ({ competitor }) => {
  // بناء رابط الملف الشخصي للمتسابق
  const profileUrl = `https://www.dakar.com/en/competitor/${competitor.id}`;

  return (
    <a 
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] active:scale-[0.96] hover:-translate-y-1.5 block"
    >
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={competitor.img} 
          alt={competitor.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Bib Number - Classic Dakar Style */}
        <div className="absolute bottom-0 right-0 bg-dakar-yellow text-dakar-black font-[900] text-[14px] px-3 py-1 rounded-tl-xl shadow-sm z-10">
          #{competitor.id}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow relative">
        <div className="flex items-center gap-2 mb-2">
          {/* تأكيد ظهور العلم كإيموجي */}
          <span 
            className="text-xl leading-none flex-shrink-0" 
            style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif' }}
            role="img" 
            aria-label="nationality"
          >
            {competitor.nationality === 'SA' ? '🇸🇦' : (competitor.nationality || '🇸🇦')}
          </span>
          <h3 className="text-[12px] font-[800] text-dakar-black truncate flex-grow leading-tight group-hover:text-dakar-yellow transition-colors">
            {competitor.name}
          </h3>
        </div>
        
        {competitor.vehicle && (
          <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Machine</span>
            <span className="text-[10px] font-bold text-dakar-black uppercase group-hover:text-dakar-yellow transition-colors">
              {competitor.vehicle}
            </span>
          </div>
        )}

        {/* View Profile Indicator */}
        <div className="absolute top-0 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="bg-white border border-gray-100 rounded-full p-1.5 shadow-md">
            <svg className="w-3 h-3 text-dakar-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CompetitorCard;

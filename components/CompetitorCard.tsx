
import React from 'react';
import { Competitor } from '../types';

interface Props {
  competitor: Competitor;
}

const CompetitorCard: React.FC<Props> = ({ competitor }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] transition-all duration-500 active:scale-[0.96] flex flex-col h-full">
      <div className="relative aspect-[4/5] bg-gray-50 flex items-center justify-center overflow-hidden">
        <img 
          src={competitor.img} 
          alt={competitor.name} 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-dakar-black/90 backdrop-blur-md text-dakar-yellow font-black px-3 py-1.5 text-[10px] rounded-xl shadow-lg border border-white/10">
          #{competitor.id}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl leading-none filter drop-shadow-sm" role="img" aria-label="flag">
            {competitor.nationality}
          </span>
          <h3 className="text-[14px] font-black text-dakar-black truncate flex-grow tracking-tight leading-tight">
            {competitor.name}
          </h3>
        </div>
        
        {competitor.vehicle && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black rounded-lg border border-gray-100 uppercase tracking-tighter">
              {competitor.vehicle}
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 opacity-30">
          <div className="h-[2px] w-6 bg-dakar-yellow"></div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Dakar Official</span>
        </div>
      </div>
    </div>
  );
};

export default CompetitorCard;

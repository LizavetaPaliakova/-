
import React from 'react';
import { ACHIEVEMENTS } from '../constants';

interface AchievementsViewProps {
  userAchievements: string[];
  onBack: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ userAchievements, onBack }) => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-left-8 duration-500 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-game font-black text-neuro-gold italic underline decoration-neuro-pink decoration-4 uppercase">ЗАЛ СЛАВЫ</h2>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = userAchievements.includes(ach.id);
          return (
            <div 
              key={ach.id}
              className={`
                flex items-center gap-5 p-5 rounded-[2rem] border-4 transition-all
                ${isUnlocked ? 'bg-neuro-gold border-white shadow-[0_10px_30px_rgba(255,215,0,0.3)]' : 'bg-gray-900/50 border-gray-800 opacity-40'}
              `}
            >
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0
                ${isUnlocked ? 'bg-white/30' : 'bg-gray-800'}
              `}>
                {isUnlocked ? ach.icon : '❓'}
              </div>
              <div className="flex-1">
                <h3 className={`font-game font-black text-sm uppercase ${isUnlocked ? 'text-black' : 'text-gray-600'}`}>
                  {isUnlocked ? ach.title : 'ЗАБЛОКИРОВАНО'}
                </h3>
                <p className={`text-[10px] uppercase font-bold tracking-tight leading-tight mt-1 ${isUnlocked ? 'text-black/80' : 'text-gray-500'}`}>
                  {isUnlocked ? ach.description : 'Продолжай путь, чтобы открыть это достижение.'}
                </p>
                {isUnlocked && (
                  <div className="mt-2 text-[8px] text-black font-black uppercase tracking-widest border-t border-black/10 pt-1 italic">
                    ПОЛУЧЕНО ✓
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={onBack}
        className="mt-6 bg-neuro-lime text-black font-game font-black p-5 rounded-2xl hover:bg-white transition-all uppercase text-sm shadow-xl"
      >
        ВЕРНУТЬСЯ К ПРИКЛЮЧЕНИЮ
      </button>
    </div>
  );
};

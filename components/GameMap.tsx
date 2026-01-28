
import React from 'react';
import { UserProgress } from '../types';
import { LEVELS } from '../constants';

interface GameMapProps {
  progress: UserProgress;
  onSelectLevel: (id: number) => void;
}

export const GameMap: React.FC<GameMapProps> = ({ progress, onSelectLevel }) => {
  return (
    <div className="flex flex-col gap-4 pb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-game font-black text-white italic">КАРТА КВЕСТА</h2>
        <div className="text-neuro-lime font-game text-sm animate-pulse">СИСТЕМА АКТИВНА</div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {LEVELS.map((lvl) => {
          const isUnlocked = lvl.id <= progress.currentLevel;
          const isCurrent = lvl.id === progress.currentLevel;
          const isCompleted = lvl.id < progress.currentLevel;
          const isBoss = lvl.type === 'boss';

          return (
            <button
              key={lvl.id}
              disabled={!isUnlocked}
              onClick={() => onSelectLevel(lvl.id)}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center transition-all relative
                ${isCurrent ? 'scale-110 z-10 border-4 border-neuro-gold bg-gray-900 neon-border-pink' : ''}
                ${isCompleted ? 'bg-neuro-lime/20 border-2 border-neuro-lime' : ''}
                ${isUnlocked && !isCompleted && !isCurrent ? 'bg-gray-800 border-2 border-gray-600' : ''}
                ${!isUnlocked ? 'bg-gray-950 border-2 border-gray-900 opacity-50 grayscale' : 'hover:scale-105'}
              `}
            >
              {isBoss && (
                <div className="absolute -top-2 -right-2 bg-neuro-red text-white text-[8px] font-black px-1.5 py-0.5 rounded rotate-12 shadow-md">BOSS</div>
              )}
              <span className={`text-xl font-game font-black ${isCompleted ? 'text-neuro-lime' : 'text-white'}`}>
                {lvl.id}
              </span>
              {isCompleted && (
                <div className="text-[8px] text-neuro-lime font-black mt-1">OK</div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gray-900 rounded-3xl border-2 border-neuro-gold shadow-[0_0_20px_rgba(255,215,0,0.1)]">
         <h3 className="text-neuro-gold font-game text-xs mb-4 uppercase tracking-widest text-center">Твой текущий прогресс</h3>
         <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="text-2xl font-game font-black text-white">{progress.score}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase">БАЛЛОВ</div>
            </div>
            <div className="w-px h-10 bg-gray-800"></div>
            <div className="text-center">
              <div className="text-2xl font-game font-black text-white">{progress.achievements.length}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase">АЧИВОК</div>
            </div>
            <div className="w-px h-10 bg-gray-800"></div>
            <div className="text-center">
              <div className="text-2xl font-game font-black text-white">{progress.bossesDefeated}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase">БОССОВ</div>
            </div>
         </div>
      </div>
    </div>
  );
};


import React from 'react';
import { UserProgress } from '../types';

interface HeaderProps {
  progress: UserProgress;
  onBack: () => void;
  onAchievements: () => void;
}

export const Header: React.FC<HeaderProps> = ({ progress, onBack, onAchievements }) => {
  const percentage = Math.max(5, (progress.currentLevel / 10) * 100);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b-4 border-neuro-lime p-3 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="bg-neuro-red hover:bg-white hover:text-neuro-red text-white px-4 py-2 rounded-2xl font-black transition-all text-[10px] uppercase tracking-tighter shadow-lg active:scale-90 border-2 border-white/20"
        >
          ← Назад
        </button>

        <div className="flex-1 px-2">
          <div className="flex justify-between text-[10px] font-game mb-1.5 font-black">
            <span className="text-neuro-lime truncate max-w-[120px] drop-shadow-[0_0_5px_rgba(50,205,50,0.5)]">{progress.mentor}: {progress.name}</span>
            <span className="text-neuro-gold whitespace-nowrap">УРОВЕНЬ {progress.currentLevel}/10</span>
          </div>
          <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden border border-white/10 shadow-inner p-0.5">
            <div 
              className="bg-gradient-to-r from-neuro-lime via-neuro-gold to-neuro-pink h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(50,205,50,0.5)]" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-game mt-1.5 font-bold tracking-widest">
             <span className="text-neuro-pink">ОЧКИ: {progress.score}</span>
             <span className="text-neuro-white opacity-80">БОССЫ: {progress.bossesDefeated}/2</span>
          </div>
        </div>

        <button 
          onClick={onAchievements}
          className="bg-neuro-gold hover:bg-white text-black w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-110 active:rotate-12 border-2 border-black/10"
        >
          🏆
        </button>
      </div>
    </header>
  );
};

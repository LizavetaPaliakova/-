
import React from 'react';

interface StartPageProps {
  onStart: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-in fade-in zoom-in duration-1000">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-neuro-lime blur-[100px] opacity-20 animate-pulse"></div>
        <h1 className="text-6xl sm:text-7xl font-game font-black text-neuro-lime italic uppercase tracking-tighter relative z-10 drop-shadow-[0_0_20px_rgba(50,205,50,0.6)]">
          НЕЙРОКВЕСТ:<br/>БАЗА
        </h1>
        <div className="mt-4 flex justify-center gap-4 relative z-10">
          <span className="h-1 w-12 bg-neuro-pink rounded-full"></span>
          <span className="h-1 w-24 bg-neuro-lime rounded-full"></span>
          <span className="h-1 w-12 bg-neuro-pink rounded-full"></span>
        </div>
      </div>

      <p className="text-white font-game text-xs uppercase tracking-[0.4em] mb-12 opacity-70 max-w-xs leading-relaxed">
        Твое путешествие в мир искусственного интеллекта начинается здесь
      </p>

      <button 
        onClick={onStart}
        className="group relative bg-neuro-lime text-black font-game font-black py-6 px-12 rounded-[2rem] text-2xl hover:bg-white transition-all shadow-[0_0_50px_rgba(50,205,50,0.4)] hover:scale-105 active:scale-95 uppercase italic overflow-hidden"
      >
        <span className="relative z-10">Начать прокачку с ИИ</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      </button>

      <div className="mt-16 flex gap-6 text-[10px] font-game text-gray-500 uppercase tracking-widest opacity-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neuro-pink"></span>
          Креатив
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neuro-lime"></span>
          Скорость
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neuro-gold"></span>
          Будущее
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

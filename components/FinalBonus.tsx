
import React from 'react';

interface FinalBonusProps {
  name: string;
  score: number;
}

export const FinalBonus: React.FC<FinalBonusProps> = ({ name, score }) => {
  return (
    <div className="flex flex-col items-center text-center animate-in zoom-in duration-1000 py-12">
      <div className="w-32 h-32 bg-neuro-gold rounded-full flex items-center justify-center text-6xl mb-6 shadow-[0_0_50px_#FFD700] animate-bounce">
        👑
      </div>
      <h2 className="text-4xl font-game font-black text-neuro-lime mb-4 italic uppercase tracking-tighter">КВЕСТ "БАЗА" ЗАВЕРШЕН!</h2>
      
      <div className="bg-gray-900 border-4 border-neuro-gold p-8 rounded-[2.5rem] w-full relative overflow-hidden shadow-2xl mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <p className="text-xl text-white mb-8 relative z-10 font-bold px-4">
          Поздравляем тебя, {name}, ты прошел Базовый этап знакомства с нейросетями.
        </p>
        <p className="text-sm text-gray-300 mb-8 relative z-10 font-medium px-4">
          Чтобы продолжать это увлекательное путешествие - подпишись на канал и следи за обновлениями.
        </p>
        
        <a 
          href="https://t.me/elizabot_ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative z-10 block w-full bg-[#0088cc] hover:bg-white hover:text-[#0088cc] text-white font-game font-black p-5 rounded-2xl text-xl transition-all shadow-[0_0_30px_rgba(0,136,204,0.4)] uppercase italic mb-4"
        >
          @elizabot_ai
        </a>
      </div>

      <div className="text-[10px] font-game text-gray-500 uppercase tracking-widest opacity-50">
        ИТОГОВЫЙ СЧЕТ: {score} ОЧКОВ • СТАТУС: МАСТЕР БАЗЫ
      </div>
    </div>
  );
};

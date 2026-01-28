
import React from 'react';
import { CharacterType } from '../types';
import { CHARACTER_ICONS } from '../constants';

interface CharacterSelectionProps {
  onSelect: (character: CharacterType) => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onSelect }) => {
  const characters: { name: CharacterType; desc: string; trait: string; borderColor: string; glow: string; badgeBg: string }[] = [
    { 
      name: 'Нейрокотик', 
      desc: 'МАСТЕР БЫСТРЫХ ПРОМПТОВ И КРЕАТИВНОСТИ.', 
      trait: 'ИНТУИЦИЯ', 
      borderColor: '#32CD32',
      glow: 'rgba(50, 205, 50, 0.4)',
      badgeBg: 'rgba(50, 205, 50, 0.2)'
    },
    { 
      name: 'Нейролисёнок', 
      desc: 'ЭКСПЕРТ ПО ЛОГИКЕ И СЛОЖНЫМ СТРУКТУРАМ.', 
      trait: 'АНАЛИТИКА', 
      borderColor: '#FF1493',
      glow: 'rgba(255, 20, 147, 0.4)',
      badgeBg: 'rgba(255, 20, 147, 0.2)'
    },
    { 
      name: 'Нейроёнот', 
      desc: 'УМЕЕТ НАХОДИТЬ ВЫХОД ИЗ ЛЮБЫХ ГАЛЛЮЦИНАЦИЙ ИИ.', 
      trait: 'ТЕХНИКА', 
      borderColor: '#FFD700',
      glow: 'rgba(255, 215, 0, 0.4)',
      badgeBg: 'rgba(255, 215, 0, 0.2)'
    },
  ];

  return (
    <div className="flex flex-col items-center animate-in zoom-in-95 duration-700">
      <h2 className="text-4xl font-game font-black text-neuro-gold mb-2 text-center drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] uppercase italic tracking-tighter">
        КТО ТВОЙ НАСТАВНИК?
      </h2>
      <p className="text-gray-500 text-[10px] mb-10 text-center uppercase tracking-[0.2em] font-bold">
        ВЫБЕРИТЕ ЦИФРОВОГО ПРОВОДНИКА
      </p>

      <div className="flex flex-col gap-6 w-full max-w-lg">
        {characters.map((char) => (
          <button
            key={char.name}
            onClick={() => onSelect(char.name)}
            className="group relative flex items-center bg-[#111111] border-2 rounded-[2.5rem] p-5 gap-6 hover:brightness-125 transition-all text-left overflow-hidden shadow-2xl active:scale-[0.98]"
            style={{ 
              borderColor: char.borderColor,
              boxShadow: `0 0 30px ${char.glow}` 
            }}
          >
            {/* Аватар (Иконка) */}
            <div 
              className="w-24 h-24 rounded-3xl overflow-hidden border-2 shrink-0 bg-[#000000] flex items-center justify-center relative shadow-inner"
              style={{ borderColor: char.borderColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-white/5 opacity-50"></div>
              <span className="text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] relative z-10 select-none">
                {CHARACTER_ICONS[char.name]}
              </span>
            </div>
            
            {/* Текст */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-game font-black text-white">{char.name}</span>
                <span 
                  className="text-[8px] font-black px-2 py-1 rounded-lg border uppercase tracking-widest text-white/90"
                  style={{ backgroundColor: char.badgeBg, borderColor: char.borderColor + '44' }}
                >
                  {char.trait}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold tracking-tight uppercase leading-snug pr-8">
                {char.desc}
              </p>
            </div>

            {/* Стрелка */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <svg 
                className="w-6 h-6 transition-all group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ color: char.borderColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Блик на фоне */}
            <div 
              className="absolute -right-10 -bottom-10 w-32 h-32 blur-[60px] opacity-20 pointer-events-none"
              style={{ backgroundColor: char.borderColor }}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

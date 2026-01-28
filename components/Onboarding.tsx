
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (name: string, phone: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && agreed) {
      onComplete(name, phone);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-5xl font-black font-game text-neuro-lime mb-2 text-center tracking-tighter italic">НЕЙРОКВЕСТ</h1>
      <p className="text-neuro-pink font-game text-sm mb-12 uppercase tracking-widest animate-pulse">Инициализация протокола...</p>

      <form onSubmit={handleSubmit} className="w-full space-y-6 bg-gray-900/50 p-8 rounded-3xl border-2 border-neuro-pink shadow-[0_0_30px_rgba(255,20,147,0.2)]">
        <div>
          <label className="block text-xs font-game text-white uppercase mb-2">Твое имя в системе:</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border-2 border-neuro-lime p-4 rounded-xl text-neuro-lime focus:outline-none focus:neon-glow font-bold"
            placeholder="ВВЕДИТЕ ИМЯ"
          />
        </div>

        <div>
          <label className="block text-xs font-game text-white uppercase mb-2">Контактный код (Телефон):</label>
          <input 
            type="tel" 
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black border-2 border-neuro-lime p-4 rounded-xl text-neuro-lime focus:outline-none focus:neon-glow font-bold"
            placeholder="+7 (___) ___ - __ - __"
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="agree" 
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-6 h-6 accent-neuro-lime cursor-pointer"
          />
          <label htmlFor="agree" className="text-[10px] text-gray-400 leading-tight uppercase">
            Я согласен на обработку моих данных и готов к цифровой трансформации
          </label>
        </div>

        <button 
          disabled={!name || !phone || !agreed}
          className="w-full bg-neuro-lime text-black font-game font-black p-5 rounded-2xl text-xl hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(50,205,50,0.4)]"
        >
          ВОЙТИ В СИСТЕМУ
        </button>
      </form>
    </div>
  );
};

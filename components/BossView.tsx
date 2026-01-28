
import React, { useState } from 'react';
import { LevelData, CharacterType } from '../types';
// Removed unused and non-existent import of CHARACTER_IMAGES

interface BossViewProps {
  level: LevelData;
  mentor: CharacterType;
  onComplete: () => void;
}

export const BossView: React.FC<BossViewProps> = ({ level, mentor, onComplete }) => {
  const [step, setStep] = useState<'quest' | 'quiz'>('quest');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleQuizAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    if (currentQuestion < (level.quiz?.length || 0) - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newAnswers);
      setShowResult(true);
    }
  };

  const correctCount = answers.filter((ans, idx) => ans === level.quiz?.[idx].correctIndex).length;
  const passed = correctCount >= (level.quiz?.length || 0) * 0.5;

  return (
    <div className="flex flex-col gap-6 animate-in zoom-in duration-500 pb-20">
      <div className="bg-neuro-red p-8 rounded-[2rem] border-4 border-white shadow-[0_0_50px_rgba(255,0,0,0.6)] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle,_rgba(255,255,255,1)_0%,_transparent_100%)]"></div>
        <h2 className="text-4xl font-game font-black text-white italic mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">БИТВА С БОССОМ</h2>
        <div className="text-white font-game text-[10px] uppercase tracking-widest bg-black/40 inline-block px-4 py-1.5 rounded-full border border-white/20">{level.title}</div>
      </div>

      {step === 'quest' ? (
        <div className="bg-gray-900 p-8 rounded-3xl border-2 border-neuro-red space-y-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-neuro-red/10 rounded-full blur-3xl"></div>
          
          <div className="flex justify-center -mt-16 mb-4 relative z-10">
             <div className="w-32 h-32 rounded-full border-4 border-neuro-red overflow-hidden bg-black shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                <img 
                  src="https://images.unsplash.com/photo-1614728263952-84ea206f25b1?q=80&w=200&auto=format&fit=crop" 
                  alt="Boss" 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-150" 
                />
             </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-game font-black text-center text-neuro-red mb-2 uppercase italic tracking-tighter">МИНИ-КВЕСТ: {level.title}</h3>
            <p className="text-gray-200 text-center leading-relaxed font-medium bg-black/30 p-4 rounded-2xl border border-white/5">"{level.miniQuest || level.task}"</p>
          </div>

          <div className="bg-black/50 p-5 rounded-2xl border border-neuro-red/30 relative z-10">
             <p className="text-[10px] text-neuro-red font-black uppercase mb-3 flex items-center gap-2">
               <span className="w-2 h-2 bg-neuro-red animate-ping rounded-full"></span>
               Инструкция по выживанию:
             </p>
             <ul className="text-[11px] text-gray-400 space-y-2 font-medium">
               <li className="flex gap-2"><span>⚡</span> Используй всё, чему научился в прошлых главах</li>
               <li className="flex gap-2"><span>⚡</span> Не делай поспешных выводов, ИИ коварен</li>
               <li className="flex gap-2"><span>⚡</span> Победи свой страх перед галлюцинациями</li>
             </ul>
          </div>
          
          <button 
            onClick={() => setStep('quiz')}
            className="w-full bg-neuro-red text-white font-game font-black p-5 rounded-2xl text-xl hover:bg-white hover:text-neuro-red transition-all shadow-[0_10px_20px_rgba(255,0,0,0.3)] active:scale-95 uppercase"
          >
            К ИСПЫТАНИЮ!
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-3xl border-2 border-neuro-lime space-y-6 shadow-2xl">
          {!showResult ? (
            <>
               <div className="flex justify-between items-center text-[10px] font-game text-neuro-lime uppercase mb-4 tracking-widest">
                 <span>Вопрос {currentQuestion + 1} / {level.quiz?.length}</span>
                 <span className="animate-pulse">System Check...</span>
               </div>
               <h4 className="text-lg font-black text-white mb-6 leading-tight border-l-4 border-neuro-lime pl-4">{level.quiz?.[currentQuestion].question}</h4>
               <div className="space-y-3">
                 {level.quiz?.[currentQuestion].options.map((opt, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleQuizAnswer(idx)}
                     className="w-full text-left p-4 rounded-2xl bg-black border border-gray-800 hover:border-neuro-lime hover:bg-neuro-lime/10 transition-all text-sm font-bold group"
                   >
                     <span className="text-neuro-lime mr-3 opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                     {opt}
                   </button>
                 ))}
               </div>
            </>
          ) : (
            <div className="text-center space-y-8 animate-in zoom-in-90">
              <div className="text-7xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                {passed ? '💠' : '💀'}
              </div>
              <div>
                <h3 className={`text-3xl font-game font-black mb-2 italic ${passed ? 'text-neuro-lime' : 'text-neuro-red'}`}>
                  {passed ? 'БОСС ПОВЕРЖЕН!' : 'СИСТЕМА СБОИТ!'}
                </h3>
                <p className="text-gray-400 uppercase text-[10px] tracking-[0.3em] font-black">
                  ТОЧНОСТЬ: {((correctCount / (level.quiz?.length || 1)) * 100).toFixed(0)}%
                </p>
              </div>
              
              {passed && (
                <div className="flex items-center gap-4 bg-black/60 p-5 rounded-[2rem] border-2 border-neuro-gold shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  <div className="text-4xl">🏆</div>
                  <div className="text-left">
                    <div className="text-[10px] text-neuro-gold font-game font-black uppercase tracking-widest">Новая ачивка:</div>
                    <div className="text-white font-black uppercase text-sm">УКРОТИТЕЛЬ НЕЙРОНОВ</div>
                  </div>
                </div>
              )}
              
              <button 
                onClick={passed ? onComplete : () => { setStep('quest'); setAnswers([]); setCurrentQuestion(0); setShowResult(false); }}
                className={`w-full font-game font-black p-5 rounded-2xl text-xl transition-all shadow-xl uppercase ${passed ? 'bg-neuro-lime text-black hover:bg-white' : 'bg-neuro-red text-white hover:bg-white hover:text-neuro-red'}`}
              >
                {passed ? 'ЗАБРАТЬ НАГРАДУ' : 'ПОПРОБОВАТЬ СНОВА'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { AppState, UserProgress, CharacterType } from './types';
import { StartPage } from './components/StartPage';
import { Onboarding } from './components/Onboarding';
import { CharacterSelection } from './components/CharacterSelection';
import { GameMap } from './components/GameMap';
import { LevelView } from './components/LevelView';
import { BossView } from './components/BossView';
import { AchievementsView } from './components/AchievementsView';
import { FinalBonus } from './components/FinalBonus';
import { Header } from './components/Header';
import { ACHIEVEMENTS, LEVELS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<AppState>(AppState.START);
  const [progress, setProgress] = useState<UserProgress>({
    name: '',
    phone: '',
    mentor: 'Нейрокотик',
    currentLevel: 1,
    bossesDefeated: 0,
    score: 0,
    achievements: [],
    isCompleted: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('neuroquest_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress(parsed);
      if (parsed.isCompleted) {
        setGameState(AppState.FINAL_BONUS);
      } else {
        setGameState(AppState.GAME_MAP);
      }
    }
  }, []);

  useEffect(() => {
    if (progress.name) {
      localStorage.setItem('neuroquest_progress', JSON.stringify(progress));
    }
  }, [progress]);

  const handleStart = () => {
    setGameState(AppState.ONBOARDING);
  };

  const handleOnboardingComplete = (name: string, phone: string) => {
    setProgress(prev => ({ ...prev, name, phone }));
    setGameState(AppState.CHARACTER_SELECTION);
  };

  const handleCharacterSelect = (mentor: CharacterType) => {
    setProgress(prev => ({ 
      ...prev, 
      mentor,
      achievements: Array.from(new Set([...prev.achievements, 'start']))
    }));
    setGameState(AppState.GAME_MAP);
  };

  const completeLevel = (levelId: number, specialAchievement?: string) => {
    const currentLvlData = LEVELS.find(l => l.id === levelId);
    const isBoss = currentLvlData?.type === 'boss';
    
    setProgress(prev => {
      const newScore = prev.score + (isBoss ? 50 : 10);
      const newLevel = Math.min(10, levelId + 1);
      const newBosses = isBoss ? prev.bossesDefeated + 1 : prev.bossesDefeated;
      const newAchievements = [...prev.achievements];
      
      if (specialAchievement) newAchievements.push(specialAchievement);
      
      // Автоматическое добавление ачивок за уровни, если они не были переданы
      const autoAchievements: Record<number, string> = {
        1: 'no_fear',
        2: 'translator_ai',
        3: 'personal_assistant',
        4: 'inside_system',
        5: 'best_player',
        6: 'first_text_ai',
        7: 'brain_on_steroids',
        8: 'expert_at_hand',
        9: 'time_master',
        10: 'error_scientist'
      };

      const levelAch = autoAchievements[levelId];
      if (levelAch && !newAchievements.includes(levelAch)) {
        newAchievements.push(levelAch);
      }
      
      const gameFinished = levelId === 10;
      if (gameFinished) {
        setGameState(AppState.FINAL_BONUS);
      } else {
        setGameState(AppState.GAME_MAP);
      }

      return {
        ...prev,
        currentLevel: gameFinished ? 10 : newLevel,
        score: newScore,
        bossesDefeated: newBosses,
        achievements: Array.from(new Set(newAchievements)),
        isCompleted: gameFinished
      };
    });
  };

  const goBack = () => {
    if (gameState === AppState.FINAL_BONUS) return;
    if (gameState === AppState.LEVEL_VIEW || gameState === AppState.BOSS_VIEW || gameState === AppState.ACHIEVEMENTS_VIEW) {
      setGameState(AppState.GAME_MAP);
    } else if (gameState === AppState.GAME_MAP) {
      setGameState(AppState.CHARACTER_SELECTION);
    } else if (gameState === AppState.ONBOARDING) {
      setGameState(AppState.START);
    }
  };

  return (
    <div className="min-h-screen bg-neuro-black text-neuro-white flex flex-col font-ui selection:bg-neuro-pink selection:text-white">
      {gameState !== AppState.START && gameState !== AppState.ONBOARDING && gameState !== AppState.CHARACTER_SELECTION && (
        <Header progress={progress} onBack={goBack} onAchievements={() => setGameState(AppState.ACHIEVEMENTS_VIEW)} />
      )}

      <main className="flex-1 flex flex-col p-4 pt-24 max-w-2xl mx-auto w-full">
        {gameState === AppState.START && <StartPage onStart={handleStart} />}
        {gameState === AppState.ONBOARDING && <Onboarding onComplete={handleOnboardingComplete} />}
        {gameState === AppState.CHARACTER_SELECTION && <CharacterSelection onSelect={handleCharacterSelect} />}
        {gameState === AppState.GAME_MAP && (
          <GameMap 
            progress={progress} 
            onSelectLevel={(id) => {
              const lvl = LEVELS.find(l => l.id === id);
              setGameState(lvl?.type === 'boss' ? AppState.BOSS_VIEW : AppState.LEVEL_VIEW);
            }} 
          />
        )}
        {gameState === AppState.LEVEL_VIEW && (
          <LevelView 
            level={LEVELS.find(l => l.id === progress.currentLevel)!} 
            mentor={progress.mentor}
            onComplete={(ach) => completeLevel(progress.currentLevel, ach)} 
          />
        )}
        {gameState === AppState.BOSS_VIEW && (
          <BossView 
            level={LEVELS.find(l => l.id === progress.currentLevel)!} 
            mentor={progress.mentor}
            onComplete={() => completeLevel(progress.currentLevel)} 
          />
        )}
        {gameState === AppState.ACHIEVEMENTS_VIEW && <AchievementsView userAchievements={progress.achievements} onBack={goBack} />}
        {gameState === AppState.FINAL_BONUS && <FinalBonus name={progress.name} score={progress.score} />}
      </main>
    </div>
  );
};

export default App;

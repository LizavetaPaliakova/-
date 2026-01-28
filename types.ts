
export type CharacterType = 'Нейрокотик' | 'Нейролисёнок' | 'Нейроёнот';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  icon: string;
}

export interface UserProgress {
  name: string;
  phone: string;
  mentor: CharacterType;
  currentLevel: number; // 1-10
  bossesDefeated: number;
  score: number;
  achievements: string[]; // ids
  isCompleted: boolean;
}

export type LevelType = 'learning' | 'boss';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LevelData {
  id: number;
  type: LevelType;
  title: string;
  theory: string;
  task: string;
  hint: string;
  // For boss levels
  miniQuest?: string;
  quiz?: QuizQuestion[];
}

export enum AppState {
  START = 'START',
  ONBOARDING = 'ONBOARDING',
  CHARACTER_SELECTION = 'CHARACTER_SELECTION',
  GAME_MAP = 'GAME_MAP',
  LEVEL_VIEW = 'LEVEL_VIEW',
  BOSS_VIEW = 'BOSS_VIEW',
  ACHIEVEMENTS_VIEW = 'ACHIEVEMENTS_VIEW',
  FINAL_BONUS = 'FINAL_BONUS'
}

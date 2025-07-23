export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  height: number; // in cm
  weight: number; // in kg
  culturalBackground: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  ayurvedicType: 'vata' | 'pitta' | 'kapha';
  goals: string[];
  familyId?: string;
}

export interface BMIData {
  value: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  advice: string;
}

export interface Workout {
  id: string;
  name: string;
  duration: number; // in minutes
  exercises: Exercise[];
  difficulty: 'easy' | 'medium' | 'hard';
  culturalTheme?: string;
}

export interface Exercise {
  name: string;
  duration: number;
  reps?: number;
  description: string;
  culturalVariation?: string;
}

export interface NutritionPlan {
  id: string;
  meals: Meal[];
  ayurvedicPrinciples: string[];
  culturalAdaptations: string[];
}

export interface Meal {
  name: string;
  ingredients: string[];
  calories: number;
  ayurvedicBenefits: string[];
  culturalOrigin: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type: 'nutrition' | 'wellness' | 'fitness';
}

export interface Reminder {
  id: string;
  type: 'hydration' | 'workout' | 'wellness';
  time: string;
  frequency: 'daily' | 'weekly';
  enabled: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface FamilyProgress {
  familyId: string;
  members: FamilyMember[];
  challenges: Challenge[];
  totalPoints: number;
}

export interface FamilyMember {
  userId: string;
  name: string;
  points: number;
  achievements: Achievement[];
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number; // days
  participants: string[];
  culturalTheme: string;
}
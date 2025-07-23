import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          age: number;
          height: number;
          weight: number;
          cultural_background: string;
          fitness_level: 'beginner' | 'intermediate' | 'advanced';
          ayurvedic_type: 'vata' | 'pitta' | 'kapha';
          goals: string[];
          family_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          age: number;
          height: number;
          weight: number;
          cultural_background: string;
          fitness_level: 'beginner' | 'intermediate' | 'advanced';
          ayurvedic_type: 'vata' | 'pitta' | 'kapha';
          goals: string[];
          family_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          age?: number;
          height?: number;
          weight?: number;
          cultural_background?: string;
          fitness_level?: 'beginner' | 'intermediate' | 'advanced';
          ayurvedic_type?: 'vata' | 'pitta' | 'kapha';
          goals?: string[];
          family_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          water_intake: number;
          daily_steps: number;
          workouts_completed: number;
          wellness_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          water_intake?: number;
          daily_steps?: number;
          workouts_completed?: number;
          wellness_score?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          water_intake?: number;
          daily_steps?: number;
          workouts_completed?: number;
          wellness_score?: number;
          created_at?: string;
        };
      };
      families: {
        Row: {
          id: string;
          name: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_by?: string;
          created_at?: string;
        };
      };
    };
  };
};
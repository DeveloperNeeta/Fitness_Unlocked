import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { User, BMIData, Workout, ChatMessage, Reminder, Achievement, FamilyProgress } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  authLoading: boolean;
  profileLoading: boolean;
  createUserProfile: (profileData: Omit<User, 'id' | 'email'>) => Promise<{ data: User | null; error: any }>;
  updateUserProfile: (updates: Partial<User>) => Promise<{ data: User | null; error: any }>;
  currentView: 'individual' | 'family';
  setCurrentView: (view: 'individual' | 'family') => void;
  bmiData: BMIData | null;
  setBmiData: (data: BMIData) => void;
  currentWorkout: Workout | null;
  setCurrentWorkout: (workout: Workout) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  reminders: Reminder[];
  updateReminder: (reminder: Reminder) => void;
  achievements: Achievement[];
  updateAchievement: (achievement: Achievement) => void;
  familyProgress: FamilyProgress | null;
  setFamilyProgress: (progress: FamilyProgress) => void;
  waterIntake: number;
  setWaterIntake: (intake: number) => void;
  dailySteps: number;
  setDailySteps: (steps: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, createProfile, updateProfile } = useUserProfile(authUser);
  const [currentView, setCurrentView] = useState<'individual' | 'family'>('individual');
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', type: 'hydration', time: '09:00', frequency: 'daily', enabled: true },
    { id: '2', type: 'workout', time: '18:00', frequency: 'daily', enabled: true },
  ]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'First Workout', description: 'Complete your first workout', icon: '🏃‍♂️', unlocked: false, progress: 0, target: 1 },
    { id: '2', title: 'Hydration Hero', description: 'Drink 8 glasses of water in a day', icon: '💧', unlocked: false, progress: 0, target: 8 },
  ]);
  const [familyProgress, setFamilyProgress] = useState<FamilyProgress | null>(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailySteps, setDailySteps] = useState(0);

  const setUser = (user: User | null) => {
    // This function is kept for compatibility but profile updates should use updateUserProfile
    console.warn('setUser called - consider using updateUserProfile for profile updates');
  };

  const createUserProfile = async (profileData: Omit<User, 'id' | 'email'>) => {
    return await createProfile(profileData);
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    return await updateProfile(updates);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const updateReminder = (reminder: Reminder) => {
    setReminders(prev => prev.map(r => r.id === reminder.id ? reminder : r));
  };

  const updateAchievement = (achievement: Achievement) => {
    setAchievements(prev => prev.map(a => a.id === achievement.id ? achievement : a));
  };

  return (
    <AppContext.Provider value={{
      user: profile,
      setUser,
      authLoading,
      profileLoading,
      createUserProfile,
      updateUserProfile,
      currentView,
      setCurrentView,
      bmiData,
      setBmiData,
      currentWorkout,
      setCurrentWorkout,
      chatMessages,
      addChatMessage,
      reminders,
      updateReminder,
      achievements,
      updateAchievement,
      familyProgress,
      setFamilyProgress,
      waterIntake,
      setWaterIntake,
      dailySteps,
      setDailySteps,
    }}>
      {children}
    </AppContext.Provider>
  );
};
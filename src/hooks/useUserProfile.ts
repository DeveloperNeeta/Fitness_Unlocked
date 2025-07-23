import { useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types';

export const useUserProfile = (authUser: SupabaseUser | null) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [authUser]);

  const fetchProfile = async () => {
    if (!authUser) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const userProfile: User = {
          id: data.id,
          name: data.name,
          age: data.age,
          email: authUser.email || '',
          height: data.height,
          weight: data.weight,
          culturalBackground: data.cultural_background,
          fitnessLevel: data.fitness_level,
          ayurvedicType: data.ayurvedic_type,
          goals: data.goals,
          familyId: data.family_id,
        };
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Omit<User, 'id' | 'email'>) => {
    if (!authUser) throw new Error('No authenticated user');

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authUser.id,
          name: profileData.name,
          age: profileData.age,
          height: profileData.height,
          weight: profileData.weight,
          cultural_background: profileData.culturalBackground,
          fitness_level: profileData.fitnessLevel,
          ayurvedic_type: profileData.ayurvedicType,
          goals: profileData.goals,
          family_id: profileData.familyId,
        })
        .select()
        .single();

      if (error) throw error;

      const newProfile: User = {
        id: data.id,
        name: data.name,
        age: data.age,
        email: authUser.email || '',
        height: data.height,
        weight: data.weight,
        culturalBackground: data.cultural_background,
        fitnessLevel: data.fitness_level,
        ayurvedicType: data.ayurvedic_type,
        goals: data.goals,
        familyId: data.family_id,
      };

      setProfile(newProfile);
      return { data: newProfile, error: null };
    } catch (error) {
      console.error('Error creating profile:', error);
      return { data: null, error };
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!authUser || !profile) throw new Error('No authenticated user or profile');

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          name: updates.name,
          age: updates.age,
          height: updates.height,
          weight: updates.weight,
          cultural_background: updates.culturalBackground,
          fitness_level: updates.fitnessLevel,
          ayurvedic_type: updates.ayurvedicType,
          goals: updates.goals,
          family_id: updates.familyId,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', authUser.id)
        .select()
        .single();

      if (error) throw error;

      const updatedProfile: User = {
        ...profile,
        ...updates,
      };

      setProfile(updatedProfile);
      return { data: updatedProfile, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
    }
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    refetch: fetchProfile,
  };
};
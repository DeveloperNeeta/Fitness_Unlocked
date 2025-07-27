import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Heart, ArrowRight } from 'lucide-react';

const UserSetup: React.FC = () => {
  const { createUserProfile } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    culturalBackground: '',
    fitnessLevel: 'beginner' as const,
    ayurvedicType: 'kapha' as const,
    goals: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const culturalOptions = [
    'Indian', 'Chinese', 'Mediterranean', 'Latin American', 'Middle Eastern', 
    'African', 'Nordic', 'Southeast Asian', 'Other'
  ];

  const goalOptions = [
    'Weight Loss', 'Muscle Gain', 'Flexibility', 'Stress Relief', 
    'Better Sleep', 'Energy Boost', 'Family Fitness', 'Cultural Wellness'
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form data
    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (Number(formData.age) < 13 || Number(formData.age) > 120) {
      setError('Age must be between 13 and 120');
      setLoading(false);
      return;
    }

    if (Number(formData.height) < 100 || Number(formData.height) > 250) {
      setError('Height must be between 100 and 250 cm');
      setLoading(false);
      return;
    }

    if (Number(formData.weight) < 30 || Number(formData.weight) > 300) {
      setError('Weight must be between 30 and 300 kg');
      setLoading(false);
      return;
    }

    const profileData = {
      name: formData.name.trim(),
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      culturalBackground: formData.culturalBackground,
      fitnessLevel: formData.fitnessLevel,
      ayurvedicType: formData.ayurvedicType,
      goals: formData.goals,
      familyId: undefined
    };

    console.log('Submitting profile data:', profileData);

    createUserProfile(profileData)
      .then(({ data, error }) => {
        if (error) {
          console.error('Profile creation error:', error);
          
          // Set more specific error message
          if (error && typeof error === 'object' && 'message' in error) {
            const supabaseError = error as any;
            if (supabaseError.code === '23505') {
              setError('A profile already exists for this account.');
            } else if (supabaseError.code === '23514') {
              setError('Please check that all values are within valid ranges.');
            } else if (supabaseError.message) {
              if (supabaseError.message.includes('Database not set up')) {
                setError('Please connect to Supabase and set up the database tables first. Click "Connect to Supabase" in the header.');
              } else {
                setError(`Error: ${supabaseError.message}`);
              }
            } else {
              setError('Failed to create profile. Please try again.');
            }
          } else {
            setError('Failed to create profile. Please try again.');
          }
        } else {
          console.log('Profile created successfully:', data);
        }
      })
      .catch((err) => {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isFormValid = formData.name && formData.age &&
                     formData.height && formData.weight && formData.culturalBackground;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-10 w-10 text-orange-500" fill="currentColor" />
            <h1 className="text-3xl font-bold text-gray-900">Fitness_Unlocked</h1>
          </div>
          <p className="text-gray-600">Let's personalize your wellness journey with cultural insights and Ayurvedic wisdom</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Age"
                min="13"
                max="100"
                required
              />
            </div>

          </div>

          {/* Physical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="170"
                min="100"
                max="250"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="70"
                min="30"
                max="200"
                required
              />
            </div>
          </div>

          {/* Cultural Background */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Background</label>
            <select
              value={formData.culturalBackground}
              onChange={(e) => setFormData(prev => ({ ...prev, culturalBackground: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Select your cultural background</option>
              {culturalOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Fitness Level and Ayurvedic Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Level</label>
              <select
                value={formData.fitnessLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, fitnessLevel: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ayurvedic Constitution</label>
              <select
                value={formData.ayurvedicType}
                onChange={(e) => setFormData(prev => ({ ...prev, ayurvedicType: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="vata">Vata (Air & Space)</option>
                <option value="pitta">Pitta (Fire & Water)</option>
                <option value="kapha">Kapha (Earth & Water)</option>
              </select>
            </div>
          </div>

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Wellness Goals (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {goalOptions.map(goal => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-2 rounded-lg border transition-all text-sm ${
                    formData.goals.includes(goal)
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Start Your Wellness Journey</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSetup;
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Droplets, Dumbbell, Heart, TrendingUp } from 'lucide-react';

const QuickActions: React.FC = () => {
  const { waterIntake, setWaterIntake, setCurrentWorkout, dailySteps, setDailySteps } = useApp();

  const handleHydrationClick = () => {
    setWaterIntake(waterIntake + 1);
  };

  const handleWorkoutStart = () => {
    // Sample workout for demo
    const sampleWorkout = {
      id: '1',
      name: 'Morning Energizer',
      duration: 20,
      difficulty: 'easy' as const,
      exercises: [
        { name: 'Surya Namaskara', duration: 5, description: 'Traditional sun salutation sequence', culturalVariation: 'Classical Indian yoga sequence' },
        { name: 'Bodyweight Squats', duration: 3, reps: 15, description: 'Basic squat movement' },
        { name: 'Push-ups', duration: 3, reps: 10, description: 'Upper body strength exercise' },
        { name: 'Meditation', duration: 9, description: 'Mindful breathing exercise' }
      ]
    };
    setCurrentWorkout(sampleWorkout);
  };

  const handleStepsUpdate = () => {
    setDailySteps(dailySteps + 1000);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <button
        onClick={handleHydrationClick}
        className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl p-4 transition-all duration-200 transform hover:scale-105"
      >
        <div className="flex flex-col items-center space-y-2">
          <Droplets className="h-8 w-8 text-blue-600" />
          <span className="text-lg font-bold text-blue-900">{waterIntake}</span>
          <span className="text-sm text-blue-700">Glasses Today</span>
        </div>
      </button>

      <button
        onClick={handleWorkoutStart}
        className="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-xl p-4 transition-all duration-200 transform hover:scale-105"
      >
        <div className="flex flex-col items-center space-y-2">
          <Dumbbell className="h-8 w-8 text-orange-600" />
          <span className="text-lg font-bold text-orange-900">Start</span>
          <span className="text-sm text-orange-700">Quick Workout</span>
        </div>
      </button>

      <button
        onClick={handleStepsUpdate}
        className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-xl p-4 transition-all duration-200 transform hover:scale-105"
      >
        <div className="flex flex-col items-center space-y-2">
          <TrendingUp className="h-8 w-8 text-green-600" />
          <span className="text-lg font-bold text-green-900">{dailySteps.toLocaleString()}</span>
          <span className="text-sm text-green-700">Steps Today</span>
        </div>
      </button>

      <button className="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-xl p-4 transition-all duration-200 transform hover:scale-105">
        <div className="flex flex-col items-center space-y-2">
          <Heart className="h-8 w-8 text-purple-600" />
          <span className="text-lg font-bold text-purple-900">85</span>
          <span className="text-sm text-purple-700">Wellness Score</span>
        </div>
      </button>
    </div>
  );
};

export default QuickActions;
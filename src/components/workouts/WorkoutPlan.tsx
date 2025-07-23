import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatDuration } from '../../utils/calculations';
import { Dumbbell, Clock, Star, Play, Pause } from 'lucide-react';

const WorkoutPlan: React.FC = () => {
  const { currentWorkout, setCurrentWorkout, user } = useApp();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentExercise, setCurrentExercise] = React.useState(0);

  const sampleWorkouts = [
    {
      id: '1',
      name: 'Morning Energizer',
      duration: 20,
      difficulty: 'easy' as const,
      culturalTheme: 'Indian Yoga',
      exercises: [
        { name: 'Surya Namaskara', duration: 5, description: 'Traditional sun salutation sequence', culturalVariation: 'Classical Indian yoga sequence' },
        { name: 'Pranayama', duration: 5, description: 'Breathing exercises for energy', culturalVariation: 'Ancient Indian breathing technique' },
        { name: 'Warrior Pose Flow', duration: 10, description: 'Dynamic strength building sequence' }
      ]
    },
    {
      id: '2',
      name: 'HIIT Power Session',
      duration: 25,
      difficulty: 'hard' as const,
      culturalTheme: 'Modern Fitness',
      exercises: [
        { name: 'Jump Squats', duration: 3, reps: 20, description: 'Explosive lower body exercise' },
        { name: 'Burpees', duration: 4, reps: 15, description: 'Full body conditioning' },
        { name: 'Mountain Climbers', duration: 3, reps: 30, description: 'Core and cardio combo' },
        { name: 'Rest & Recovery', duration: 15, description: 'Active recovery stretching' }
      ]
    },
    {
      id: '3',
      name: 'Family Dance Fitness',
      duration: 30,
      difficulty: 'medium' as const,
      culturalTheme: 'Bollywood Dance',
      exercises: [
        { name: 'Bollywood Warm-up', duration: 5, description: 'Traditional dance warm-up moves', culturalVariation: 'Indian classical dance elements' },
        { name: 'Bhangra Cardio', duration: 15, description: 'High-energy Punjabi dance moves', culturalVariation: 'Traditional Bhangra steps' },
        { name: 'Cool Down Kathak', duration: 10, description: 'Graceful classical dance cooldown', culturalVariation: 'Kathak-inspired stretching' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleWorkoutSelect = (workout: any) => {
    setCurrentWorkout(workout);
    setIsPlaying(false);
    setCurrentExercise(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Dumbbell className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Custom Workouts</h2>
          <p className="text-sm text-gray-600">AI-generated plans tailored for {user?.culturalBackground || 'your preferences'}</p>
        </div>
      </div>

      {!currentWorkout ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleWorkouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => handleWorkoutSelect(workout)}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {workout.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatDuration(workout.duration)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2" />
                  {workout.culturalTheme}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {workout.exercises.length} exercises
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{currentWorkout.name}</h3>
              <p className="text-sm text-gray-600">{formatDuration(currentWorkout.duration)} • {currentWorkout.culturalTheme}</p>
            </div>
            <button
              onClick={() => setCurrentWorkout(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back to workouts
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                Exercise {currentExercise + 1} of {currentWorkout.exercises.length}
              </h4>
              <button
                onClick={togglePlayPause}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Start'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    index === currentExercise
                      ? 'border-orange-500 bg-orange-50'
                      : index < currentExercise
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                    <span className="text-sm text-gray-600">
                      {exercise.reps ? `${exercise.reps} reps` : formatDuration(exercise.duration)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                  {exercise.culturalVariation && (
                    <p className="text-xs text-orange-600 font-medium">
                      Cultural Note: {exercise.culturalVariation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                disabled={currentExercise === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentExercise(Math.min(currentWorkout.exercises.length - 1, currentExercise + 1))}
                disabled={currentExercise === currentWorkout.exercises.length - 1}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
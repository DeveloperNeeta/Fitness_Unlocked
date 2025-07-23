import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { getProgressPercentage } from '../../utils/calculations';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';

const ProgressTracking: React.FC = () => {
  const { achievements, waterIntake, dailySteps, user } = useApp();

  const weeklyGoals = [
    { name: 'Hydration', current: waterIntake, target: 8, unit: 'glasses', color: 'blue' },
    { name: 'Steps', current: dailySteps, target: 10000, unit: 'steps', color: 'green' },
    { name: 'Workouts', current: 3, target: 5, unit: 'sessions', color: 'orange' },
    { name: 'Meditation', current: 4, target: 7, unit: 'days', color: 'purple' }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' }
    };
    return colors[color as keyof typeof colors]?.[type] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Weekly Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Weekly Goals</h2>
            <p className="text-sm text-gray-600">Track your progress towards weekly wellness targets</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyGoals.map((goal, index) => {
            const percentage = getProgressPercentage(goal.current, goal.target);
            return (
              <div key={index} className={`p-4 rounded-lg border-2 ${getColorClasses(goal.color, 'border')}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{goal.name}</h3>
                  <span className={`text-sm font-semibold ${getColorClasses(goal.color, 'text')}`}>
                    {percentage}%
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColorClasses(goal.color, 'bg')} transition-all duration-300`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            <p className="text-sm text-gray-600">Celebrate your wellness milestones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-2xl ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${achievement.unlocked ? 'text-yellow-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${achievement.unlocked ? 'text-yellow-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  
                  {!achievement.unlocked && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-yellow-500 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(achievement.progress, achievement.target)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.progress} / {achievement.target}
                      </p>
                    </div>
                  )}
                </div>
                
                {achievement.unlocked && (
                  <Award className="h-5 w-5 text-yellow-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Weekly Summary</h2>
            <p className="text-sm text-gray-600">Your wellness journey this week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{dailySteps.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Steps Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{waterIntake}/8</div>
            <div className="text-sm text-gray-600">Hydration Goal</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">85%</div>
            <div className="text-sm text-gray-600">Wellness Score</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Great progress this week!</span> You're staying consistent with your hydration 
            and showing excellent commitment to your wellness journey. Keep up the momentum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
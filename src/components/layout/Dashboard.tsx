import React from 'react';
import { useApp } from '../../contexts/AppContext';
import QuickActions from '../common/QuickActions';
import BMICalculator from '../bmi/BMICalculator';
import WorkoutPlan from '../workouts/WorkoutPlan';
import NutritionAssistant from '../nutrition/NutritionAssistant';
import WellnessCoach from '../wellness/WellnessCoach';
import ProgressTracking from '../progress/ProgressTracking';
import FamilyHub from '../family/FamilyHub';

const Dashboard: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Actions Bar */}
        <QuickActions />

        {currentView === 'individual' ? (
          <div className="space-y-8">
            {/* BMI and Progress Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BMICalculator />
              <div className="lg:hidden">
                <ProgressTracking />
              </div>
            </div>

            {/* Workout Plan */}
            <WorkoutPlan />

            {/* AI Assistants Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NutritionAssistant />
              <WellnessCoach />
            </div>

            {/* Progress Tracking - Desktop */}
            <div className="hidden lg:block">
              <ProgressTracking />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <FamilyHub />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
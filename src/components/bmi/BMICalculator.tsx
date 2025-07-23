import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { calculateBMI, getBMIColor } from '../../utils/calculations';
import { Calculator, TrendingUp } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const { user, bmiData, setBmiData } = useApp();
  const [height, setHeight] = useState(user?.height || 170);
  const [weight, setWeight] = useState(user?.weight || 70);

  const handleCalculate = () => {
    const result = calculateBMI(height, weight);
    setBmiData(result);
  };

  React.useEffect(() => {
    if (user?.height && user?.weight) {
      const result = calculateBMI(user.height, user.weight);
      setBmiData(result);
    }
  }, [user, setBmiData]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calculator className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">BMI Analysis</h2>
          <p className="text-sm text-gray-600">Track your body mass index and get personalized insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter height in cm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter weight in kg"
            />
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
          >
            Calculate BMI
          </button>
        </div>

        {bmiData && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Your BMI</span>
              </div>
              <div className={`text-3xl font-bold ${getBMIColor(bmiData.category)}`}>
                {bmiData.value}
              </div>
              <div className={`text-sm font-medium capitalize ${getBMIColor(bmiData.category)}`}>
                {bmiData.category}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">Personalized Advice</h4>
              <p className="text-sm text-gray-600">{bmiData.advice}</p>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-1">
              <div className={`h-2 rounded-l ${bmiData.category === 'underweight' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`h-2 ${bmiData.category === 'normal' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`h-2 ${bmiData.category === 'overweight' ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
              <div className={`h-2 rounded-r ${bmiData.category === 'obese' ? 'bg-red-500' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Under</span>
              <span>Normal</span>
              <span>Over</span>
              <span>Obese</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
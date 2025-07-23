import { BMIData } from '../types';

export const calculateBMI = (height: number, weight: number): BMIData => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category: BMIData['category'];
  let advice: string;

  if (bmi < 18.5) {
    category = 'underweight';
    advice = 'Consider gaining weight through a balanced diet and strength training.';
  } else if (bmi < 25) {
    category = 'normal';
    advice = 'Great! Maintain your healthy weight with regular exercise and balanced nutrition.';
  } else if (bmi < 30) {
    category = 'overweight';
    advice = 'Consider a combination of cardio exercises and a balanced diet to reach a healthier weight.';
  } else {
    category = 'obese';
    advice = 'Consult with a healthcare provider for a personalized weight management plan.';
  }

  return {
    value: Math.round(bmi * 10) / 10,
    category,
    advice
  };
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
};

export const getProgressPercentage = (current: number, target: number): number => {
  return Math.min(Math.round((current / target) * 100), 100);
};

export const getBMIColor = (category: BMIData['category']): string => {
  switch (category) {
    case 'underweight': return 'text-blue-600';
    case 'normal': return 'text-green-600';
    case 'overweight': return 'text-orange-600';
    case 'obese': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
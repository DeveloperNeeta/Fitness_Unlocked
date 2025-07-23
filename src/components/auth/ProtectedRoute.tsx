import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Heart } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-12 w-12 text-orange-500 animate-pulse" fill="currentColor" />
            <h1 className="text-3xl font-bold text-gray-900">Fitness_Unlocked</h1>
          </div>
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
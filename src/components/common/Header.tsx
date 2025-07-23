import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { User, Settings, Heart, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, currentView, setCurrentView } = useApp();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-orange-500" fill="currentColor" />
            <h1 className="text-xl font-bold text-gray-900">Fitness_Unlocked</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user?.familyId && (
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('individual')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'individual'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setCurrentView('family')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'family'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Family
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Welcome'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.culturalBackground || 'Guest'}</p>
            </div>
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          <button 
            onClick={handleSignOut}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { useAuth } from './hooks/useAuth';
import Header from './components/common/Header';
import Dashboard from './components/layout/Dashboard';
import UserSetup from './components/onboarding/UserSetup';
import AuthForm from './components/auth/AuthForm';
import ProtectedRoute from './components/auth/ProtectedRoute';

const AppContent: React.FC = () => {
  const { user, profileLoading } = useApp();
  const { user: authUser, loading: authLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Show loading while checking authentication
  if (authLoading || profileLoading) {
    return (
      <ProtectedRoute>
        <div></div>
      </ProtectedRoute>
    );
  }

  // Show auth form if not authenticated
  if (!authUser) {
    return (
      <AuthForm 
        mode={authMode} 
        onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')} 
      />
    );
  }

  // Show user setup if authenticated but no profile
  if (!user) {
    return <UserSetup />;
  }

  // Show main app if authenticated and has profile
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AppProvider>
  );
}

export default App;
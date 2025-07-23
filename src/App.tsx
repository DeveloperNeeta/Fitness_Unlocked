import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/common/Header';
import Dashboard from './components/layout/Dashboard';
import UserSetup from './components/onboarding/UserSetup';

const AppContent: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return <UserSetup />;
  }

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
      <AppContent />
    </AppProvider>
  );
}

export default App;
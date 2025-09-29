import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  return (
    <>
      {currentPage === 'home' ? (
        <HomePage onNavigateToDashboard={() => setCurrentPage('dashboard')} />
      ) : (
        <Dashboard onNavigateToHome={() => setCurrentPage('home')} />
      )}
    </>
  );
}

export default App;
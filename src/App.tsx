import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AdityaL1 from './components/AdityaL1';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'adityaL1'>('home');

  return (
    <>
      {currentPage === 'home' && (
        <HomePage 
          onNavigateToDashboard={() => setCurrentPage('dashboard')}
          onNavigateToAdityaL1={() => setCurrentPage('adityaL1')}
        />
      )}
      
      {currentPage === 'dashboard' && (
        <Dashboard onNavigateToHome={() => setCurrentPage('home')} />
      )}
      
      {currentPage === 'adityaL1' && (
        <AdityaL1 onNavigateToHome={() => setCurrentPage('home')} />
      )}
    </>
  );
}

export default App;
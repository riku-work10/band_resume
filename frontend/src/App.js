import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './index.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './hooks/AuthContext';
import IntroScreen from './components/homepage/IntroScreen';
import PageTracker from './hooks/PageTracker';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <PageTracker />
        <div className="flex flex-col min-h-screen">
          <AnimatePresence>{showIntro && <IntroScreen />}</AnimatePresence>

          {!showIntro && (
            <>
              <Header />
              <main className="flex-grow pt-14">
                <AppRoutes />
              </main>
              <footer className="h-16">
                <Footer />
              </footer>
            </>
          )}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

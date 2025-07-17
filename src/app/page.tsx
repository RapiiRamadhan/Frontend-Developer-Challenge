'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/authStore';
import { LoginPage } from '@/components/auth/LoginPage';
import { RegisterPage } from '@/components/auth/RegisterPage';
import { ForgotPasswordPage } from '@/components/auth/ForgotPasswordPage';
import { Header } from '@/components/layout/Header';
import { ClassDashboard } from '@/components/ClassDashboard';
import { GradeConfiguration } from '@/components/GradeConfiguration';
import { GradeInput } from '@/components/GradeInput';
import { ReportsPage } from '@/components/reports/ReportsPage';
import { Class } from '@/types';

type ViewMode = 'dashboard' | 'configuration' | 'gradeInput' | 'reports';
type AuthMode = 'login' | 'register' | 'forgotPassword';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // Check authentication on mount
  useEffect(() => {
    // Auto-redirect logic can be added here
  }, [isAuthenticated]);

  const handleSelectClass = (classData: Class) => {
    setSelectedClass(classData);
    setCurrentView('gradeInput');
  };

  const handleConfigureClass = (classData: Class) => {
    setSelectedClass(classData);
    setCurrentView('configuration');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedClass(null);
  };

  const handleConfigurationComplete = () => {
    setCurrentView('gradeInput');
  };

  const handleViewReports = () => {
    setCurrentView('reports');
  };

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  // Show authentication pages if not authenticated
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        {authMode === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage
              onSwitchToRegister={() => setAuthMode('register')}
              onSwitchToForgotPassword={() => setAuthMode('forgotPassword')}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        )}
        
        {authMode === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterPage
              onSwitchToLogin={() => setAuthMode('login')}
              onRegisterSuccess={handleLoginSuccess}
            />
          </motion.div>
        )}
        
        {authMode === 'forgotPassword' && (
          <motion.div
            key="forgotPassword"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <ForgotPasswordPage
              onSwitchToLogin={() => setAuthMode('login')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Main application for authenticated users
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.50' }}>
      <Header />
      
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ClassDashboard
              onSelectClass={handleSelectClass}
              onConfigureClass={handleConfigureClass}
              onViewReports={handleViewReports}
            />
          </motion.div>
        )}
        
        {currentView === 'configuration' && selectedClass && (
          <motion.div
            key="configuration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GradeConfiguration
              classData={selectedClass}
              onBack={handleBackToDashboard}
              onSave={handleConfigurationComplete}
            />
          </motion.div>
        )}
        
        {currentView === 'gradeInput' && selectedClass && (
          <motion.div
            key="gradeInput"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GradeInput
              classData={selectedClass}
              onBack={handleBackToDashboard}
            />
          </motion.div>
        )}
        
        {currentView === 'reports' && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ReportsPage
              onBack={handleBackToDashboard}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
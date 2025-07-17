'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Mail as Email, ArrowLeft, School, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/authStore';
import { ResetPasswordData } from '@/types/auth';

interface ForgotPasswordPageProps {
  onSwitchToLogin: () => void;
}

export function ForgotPasswordPage({ onSwitchToLogin }: ForgotPasswordPageProps) {
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordData>();

  const onSubmit = async (data: ResetPasswordData) => {
    clearError();
    const success = await resetPassword(data.email);
    if (success) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: '24px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <CheckCircle size={40} color="white" />
              </Box>
              
              <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
                Email Terkirim!
              </Typography>
              
              <Typography variant="body1" color="text.secondary" mb={4}>
                Kami telah mengirimkan link reset password ke email Anda. 
                Silakan cek inbox dan ikuti instruksi yang diberikan.
              </Typography>
              
              <Button
                variant="contained"
                onClick={onSwitchToLogin}
                startIcon={<ArrowLeft size={20} />}
                sx={{
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  fontWeight: 'bold',
                }}
              >
                Kembali ke Login
              </Button>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: '24px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <School size={40} color="white" />
              </Box>
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Lupa Password?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password
              </Typography>
            </Box>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email', {
                  required: 'Email wajib diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format email tidak valid'
                  }
                })}
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email size={20} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '12px' }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  mb: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                  }
                }}
              >
                {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
              </Button>

              <Box textAlign="center">
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToLogin}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  <ArrowLeft size={16} />
                  Kembali ke Login
                </Link>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
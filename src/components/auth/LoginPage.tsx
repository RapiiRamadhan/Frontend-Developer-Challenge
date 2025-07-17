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
  IconButton,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { Mail as Email, Lock, Accessibility as Visibility, Accessibility as VisibilityOff, School, TrendingUp, Users, Award } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/authStore';
import { LoginCredentials } from '@/types/auth';

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  onLoginSuccess: () => void;
}

export function LoginPage({ onSwitchToRegister, onSwitchToForgotPassword, onLoginSuccess }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    clearError();
    const success = await login(data);
    if (success) {
      onLoginSuccess();
    }
  };

  const features = [
    {
      icon: <School className="w-8 h-8" />,
      title: 'Manajemen Kelas',
      description: 'Kelola semua kelas dengan mudah dan efisien'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Analisis Real-time',
      description: 'Lihat progress dan analisis nilai secara langsung'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Manajemen Mahasiswa',
      description: 'Input dan kelola nilai mahasiswa dengan sistem OBE'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Laporan Komprehensif',
      description: 'Generate laporan nilai dan analisis performa'
    }
  ];

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
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box display="flex" gap={4} alignItems="center" minHeight="80vh">
            {/* Left Side - Features */}
            <Box flex={1} display={{ xs: 'none', md: 'block' }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  color="white"
                  gutterBottom
                >
                  Grade Management System
                </Typography>
                <Typography
                  variant="h6"
                  color="rgba(255,255,255,0.9)"
                  mb={4}
                >
                  Sistem Manajemen Nilai OBE - BTIK UDINUS
                </Typography>
                
                <Box display="flex" flexDirection="column" gap={3}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: '12px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                              }}
                            >
                              {feature.icon}
                            </Box>
                            <Box>
                              <Typography variant="h6" color="white" fontWeight="bold">
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>

            {/* Right Side - Login Form */}
            <Box flex={{ xs: 1, md: 0.6 }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
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
                      Selamat Datang
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Masuk ke akun Anda untuk melanjutkan
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
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email size={20} />
                          </InputAdornment>
                        ),
                        sx: { borderRadius: '12px' }
                      }}
                    />

                    <TextField
                      {...register('password', {
                        required: 'Password wajib diisi',
                        minLength: {
                          value: 6,
                          message: 'Password minimal 6 karakter'
                        }
                      })}
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock size={20} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff size={20} /> : <Visibility size={20} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { borderRadius: '12px' }
                      }}
                    />

                    <Box textAlign="right" mb={3}>
                      <Link
                        component="button"
                        type="button"
                        onClick={onSwitchToForgotPassword}
                        sx={{ 
                          textDecoration: 'none',
                          fontWeight: 500,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Lupa Password?
                      </Link>
                    </Box>

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
                      {isLoading ? 'Memproses...' : 'Masuk'}
                    </Button>

                    <Divider sx={{ my: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        atau
                      </Typography>
                    </Divider>

                    <Box textAlign="center">
                      <Typography variant="body2" color="text.secondary">
                        Belum punya akun?{' '}
                        <Link
                          component="button"
                          type="button"
                          onClick={onSwitchToRegister}
                          sx={{ 
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Daftar Sekarang
                        </Link>
                      </Typography>
                    </Box>
                  </form>

                  {/* Demo Credentials */}
                  <Box mt={4} p={2} sx={{ backgroundColor: 'grey.50', borderRadius: '12px' }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Demo Credentials:
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Email: dosen@udinus.ac.id
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Password: password123
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
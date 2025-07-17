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
  MenuItem,
} from '@mui/material';
import { Mail as Email, Lock, Accessibility as Visibility, Accessibility as VisibilityOff, User, Building, School } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/lib/authStore';
import { RegisterData } from '@/types/auth';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

const departments = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Teknik Elektro',
  'Manajemen Informatika',
  'Desain Komunikasi Visual',
];

export function RegisterPage({ onSwitchToLogin, onRegisterSuccess }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterData>();
  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    clearError();
    const success = await registerUser(data);
    if (success) {
      onRegisterSuccess();
    }
  };

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
      <Container maxWidth="md">
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
              maxWidth: 500,
              mx: 'auto',
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
                Daftar Akun Baru
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Bergabung dengan sistem manajemen nilai UDINUS
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
                {...register('name', {
                  required: 'Nama lengkap wajib diisi',
                  minLength: {
                    value: 3,
                    message: 'Nama minimal 3 karakter'
                  }
                })}
                fullWidth
                label="Nama Lengkap"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '12px' }
                }}
              />

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
                {...register('department', {
                  required: 'Program studi wajib dipilih'
                })}
                fullWidth
                select
                label="Program Studi"
                error={!!errors.department}
                helperText={errors.department?.message}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Building size={20} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '12px' }
                }}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>

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

              <TextField
                {...register('confirmPassword', {
                  required: 'Konfirmasi password wajib diisi',
                  validate: value => value === password || 'Password tidak cocok'
                })}
                fullWidth
                label="Konfirmasi Password"
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff size={20} /> : <Visibility size={20} />}
                      </IconButton>
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
                {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
              </Button>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Sudah punya akun?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={onSwitchToLogin}
                    sx={{ 
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Masuk Sekarang
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
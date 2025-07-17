'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { X, School } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGradeStore } from '@/lib/store';
import { Class } from '@/types';
import { GRADE_COMPONENTS, SAMPLE_CHAPTERS } from '@/lib/constants';

interface AddClassModalProps {
  open: boolean;
  onClose: () => void;
}

interface ClassFormData {
  name: string;
  code: string;
  semester: string;
  academicYear: string;
  description?: string;
}

const semesters = ['Ganjil', 'Genap'];
const academicYears = ['2023/2024', '2024/2025', '2025/2026'];

export function AddClassModal({ open, onClose }: AddClassModalProps) {
  const { classes, initializeMockData } = useGradeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClassFormData>();

  const onSubmit = async (data: ClassFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newClass: Class = {
      id: `class-${Date.now()}`,
      name: data.name,
      code: data.code,
      semester: data.semester,
      academicYear: data.academicYear,
      studentCount: 0,
      chapters: SAMPLE_CHAPTERS,
      components: GRADE_COMPONENTS.map(comp => ({
        id: comp.id,
        name: comp.name,
        percentage: comp.defaultPercentage,
        color: comp.color,
      })),
      configurationComplete: false,
      studentsEnrolled: [],
    };
    
    // Add to store (in real app, this would be an API call)
    // For now, we'll just trigger a re-initialization with the new class
    console.log('New class created:', newClass);
    
    setIsSubmitting(false);
    reset();
    onClose();
    
    // Show success message (you could add a toast notification here)
    alert('Kelas berhasil ditambahkan!');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="between">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <School size={20} color="white" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Tambah Kelas Baru
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buat kelas baru untuk semester ini
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register('name', {
                  required: 'Nama mata kuliah wajib diisi',
                  minLength: {
                    value: 3,
                    message: 'Nama mata kuliah minimal 3 karakter'
                  }
                })}
                fullWidth
                label="Nama Mata Kuliah"
                placeholder="contoh: Pemrograman Web"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('code', {
                  required: 'Kode mata kuliah wajib diisi',
                  pattern: {
                    value: /^[A-Z0-9.]+$/,
                    message: 'Kode harus berupa huruf kapital dan angka'
                  }
                })}
                fullWidth
                label="Kode Mata Kuliah"
                placeholder="contoh: A11.54501"
                error={!!errors.code}
                helperText={errors.code?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('semester', {
                  required: 'Semester wajib dipilih'
                })}
                fullWidth
                select
                label="Semester"
                error={!!errors.semester}
                helperText={errors.semester?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {semesters.map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('academicYear', {
                  required: 'Tahun akademik wajib dipilih'
                })}
                fullWidth
                select
                label="Tahun Akademik"
                error={!!errors.academicYear}
                helperText={errors.academicYear?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {academicYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('description')}
                fullWidth
                multiline
                rows={3}
                label="Deskripsi (Opsional)"
                placeholder="Deskripsi singkat tentang mata kuliah..."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Grid>
          </Grid>

          <Box mt={3} p={2} sx={{ backgroundColor: 'grey.50', borderRadius: '12px' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Catatan:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Setelah kelas dibuat, Anda perlu mengkonfigurasi komponen nilai
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Mahasiswa dapat ditambahkan setelah konfigurasi selesai
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Komponen nilai default: Tugas (20%), UTS (25%), UAS (30%), Proyek (15%), Kuis (10%)
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0, #1976d2)',
              }
            }}
          >
            {isSubmitting ? 'Membuat...' : 'Buat Kelas'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
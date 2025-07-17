import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  Zoom,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Plus, BookOpen, Users, Settings, TrendingUp, FileText } from 'lucide-react';
import { useGradeStore } from '@/lib/store';
import { StatCard } from './ui/StatCard';
import { ClassCard } from './ClassCard';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { AddClassModal } from './modals/AddClassModal';
import { Class } from '@/types';

interface ClassDashboardProps {
  onSelectClass: (classData: Class) => void;
  onConfigureClass: (classData: Class) => void;
  onViewReports: () => void;
}

export function ClassDashboard({ onSelectClass, onConfigureClass, onViewReports }: ClassDashboardProps) {
  const { classes, dashboardStats, loading, initializeMockData } = useGradeStore();
  const [addClassModalOpen, setAddClassModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (classes.length === 0) {
      initializeMockData();
    }
  }, [classes.length, initializeMockData]);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={2}
          mb={4}
        >
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Grade Management Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Outcome Based Education (OBE) - BTIK UDINUS
            </Typography>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={<FileText size={20} />}
              onClick={onViewReports}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                minWidth: { xs: '100%', sm: 'auto' },
              }}
            >
              Laporan
            </Button>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setAddClassModalOpen(true)}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                minWidth: { xs: '100%', sm: 'auto' },
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                },
              }}
            >
              Tambah Kelas
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Statistik */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Kelas" value={dashboardStats.totalClasses} icon={<BookOpen size={24} />} color="primary" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Mahasiswa" value={dashboardStats.totalStudents} icon={<Users size={24} />} color="secondary" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Kelas Terkonfigurasi"
              value={dashboardStats.completedConfigurations}
              icon={<Settings size={24} />}
              color="success"
              subtitle={`${classes.length - dashboardStats.completedConfigurations} pending`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Nilai Pending"
              value={dashboardStats.pendingGrades}
              icon={<TrendingUp size={24} />}
              color="warning"
              subtitle="Mahasiswa belum dinilai"
            />
          </Grid>
        </Grid>
      </motion.div>

      {/* Panduan Cepat */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #1976d2, #42a5f5)', color: 'white', borderRadius: '16px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Panduan Cepat
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              1. Konfigurasi komponen nilai untuk setiap kelas <br />
              2. Atur bobot bab <br />
              3. Input nilai mahasiswa <br />
              4. Lihat kalkulasi real-time
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Kelas Anda */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Kelas Anda ({classes.length})
        </Typography>
      </motion.div>

      {classes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card sx={{ textAlign: 'center', py: 6, borderRadius: '16px' }}>
            <CardContent>
              <BookOpen size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <Typography variant="h6" gutterBottom>
                Belum ada kelas
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Mulai dengan menambahkan kelas pertama Anda untuk mengelola nilai
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={20} />}
                onClick={() => setAddClassModalOpen(true)}
                sx={{
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                  },
                  minWidth: { xs: '100%', sm: 'auto' },
                }}
              >
                Tambah Kelas Pertama
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          {classes.map((classData, index) => (
            <Grid item xs={12} sm={6} md={4} key={classData.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <ClassCard
                  classData={classData}
                  onConfigure={onConfigureClass}
                  onViewGrades={onSelectClass}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button (Mobile Only) */}
      <Zoom in={true}>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            display: { xs: 'flex', md: 'none' },
            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1565c0, #1976d2)',
            },
          }}
          onClick={() => setAddClassModalOpen(true)}
        >
          <Plus size={24} />
        </Fab>
      </Zoom>

      <AddClassModal open={addClassModalOpen} onClose={() => setAddClassModalOpen(false)} />
    </Container>
  );
}
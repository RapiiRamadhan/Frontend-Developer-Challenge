'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from '@mui/material';
import {
  ArrowLeft,
  Download,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  MoreVertical,
  Filter,
  Calendar,
  Search,
} from 'lucide-react';
import { useGradeStore } from '@/lib/store';
import { useGradeCalculations } from '@/hooks/useGradeCalculations';
import { StatCard } from '../ui/StatCard';
import { Class } from '@/types';

interface ReportsPageProps {
  onBack: () => void;
}

export function ReportsPage({ onBack }: ReportsPageProps) {
  const { classes } = useGradeStore();
  const [selectedClass, setSelectedClass] = useState<Class | null>(classes[0] || null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterSemester, setFilterSemester] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { calculations, classStats } = useGradeCalculations(selectedClass?.id);

  const handleExportMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format: string) => {
    // Simulate export functionality
    console.log(`Exporting ${selectedClass?.name} grades as ${format}`);
    handleExportClose();
  };

  const filteredStudents = selectedClass?.studentsEnrolled.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.npm.includes(searchTerm)
  ) || [];

  const getGradeColor = (grade: string) => {
    if (grade === 'A' || grade === 'A-') return 'success';
    if (grade.startsWith('B')) return 'primary';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <IconButton onClick={onBack}>
            <ArrowLeft size={24} />
          </IconButton>
          <Box flex={1}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Laporan Nilai
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Analisis dan laporan komprehensif nilai mahasiswa
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            onClick={handleExportMenu}
          >
            Export
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleExportClose}
          >
            <MenuItem onClick={() => handleExport('PDF')}>
              <FileText size={18} style={{ marginRight: 8 }} />
              Export PDF
            </MenuItem>
            <MenuItem onClick={() => handleExport('Excel')}>
              <BarChart3 size={18} style={{ marginRight: 8 }} />
              Export Excel
            </MenuItem>
            <MenuItem onClick={() => handleExport('CSV')}>
              <FileText size={18} style={{ marginRight: 8 }} />
              Export CSV
            </MenuItem>
          </Menu>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Pilih Kelas</InputLabel>
                  <Select
                    value={selectedClass?.id || ''}
                    onChange={(e) => {
                      const classData = classes.find(c => c.id === e.target.value);
                      setSelectedClass(classData || null);
                    }}
                    label="Pilih Kelas"
                  >
                    {classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name} ({cls.code})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>
                  <Select
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                    label="Semester"
                  >
                    <MenuItem value="all">Semua Semester</MenuItem>
                    <MenuItem value="ganjil">Ganjil</MenuItem>
                    <MenuItem value="genap">Genap</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Cari mahasiswa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {selectedClass && (
          <>
            {/* Statistics */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Mahasiswa"
                  value={selectedClass.studentsEnrolled.length}
                  icon={<Users size={24} />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Rata-rata Kelas"
                  value={classStats?.average ? `${classStats.average}%` : 'N/A'}
                  icon={<TrendingUp size={24} />}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Nilai Tertinggi"
                  value={classStats?.highest ? `${classStats.highest}%` : 'N/A'}
                  icon={<Award size={24} />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Lulus (≥60)"
                  value={calculations.filter(c => c.finalGrade >= 60).length}
                  icon={<Award size={24} />}
                  color="warning"
                  subtitle={`dari ${calculations.length} mahasiswa`}
                />
              </Grid>
            </Grid>

            {/* Grade Distribution */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Distribusi Nilai
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(classStats?.distribution || {}).map(([grade, count]) => (
                    <Grid item key={grade}>
                      <Chip
                        label={`${grade}: ${count}`}
                        color={getGradeColor(grade) as any}
                        variant="outlined"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Detailed Grades Table */}
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
                  <Typography variant="h6">
                    Detail Nilai - {selectedClass.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredStudents.length} dari {selectedClass.studentsEnrolled.length} mahasiswa
                  </Typography>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'grey.50' }}>
                        <TableCell>No</TableCell>
                        <TableCell>NPM</TableCell>
                        <TableCell>Nama Mahasiswa</TableCell>
                        {selectedClass.components.map((component) => (
                          <TableCell key={component.id} align="center">
                            {component.name}
                            <br />
                            <Typography variant="caption" color="text.secondary">
                              ({component.percentage}%)
                            </Typography>
                          </TableCell>
                        ))}
                        <TableCell align="center">Nilai Akhir</TableCell>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell align="center">Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStudents.map((student, index) => {
                        const calculation = calculations.find(c => c.studentId === student.id);
                        
                        return (
                          <TableRow key={student.id} hover>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {student.npm}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                            </TableCell>
                            {selectedClass.components.map((component) => {
                              const compScore = calculation?.componentScores.find(
                                cs => cs.componentId === component.id
                              );
                              const score = compScore?.maxScore > 0 
                                ? (compScore.totalScore / compScore.maxScore) * 100 
                                : 0;
                              
                              return (
                                <TableCell key={component.id} align="center">
                                  <Typography variant="body2">
                                    {score.toFixed(1)}
                                  </Typography>
                                </TableCell>
                              );
                            })}
                            <TableCell align="center">
                              <Typography variant="body2" fontWeight="bold">
                                {calculation?.finalGrade.toFixed(1) || '0.0'}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={calculation?.letterGrade || 'E'}
                                color={getGradeColor(calculation?.letterGrade || 'E') as any}
                                size="small"
                                sx={{ fontWeight: 'bold' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton size="small">
                                <MoreVertical size={16} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </>
        )}
      </motion.div>
    </Container>
  );
}
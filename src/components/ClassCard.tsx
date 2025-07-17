import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Tooltip,
  CardActions,
  Button,
} from '@mui/material';
import {
  Settings,
  GraduationCap,
  Users,
  CheckCircle,
  AlertCircle,
  Eye,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Class } from '@/types';

interface ClassCardProps {
  classData: Class;
  onConfigure: (classData: Class) => void;
  onViewGrades: (classData: Class) => void;
}

export function ClassCard({ classData, onConfigure, onViewGrades }: ClassCardProps) {
  const completionPercentage = classData.configurationComplete ? 100 : 0;
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          borderRadius: '16px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                {classData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {classData.code} • {classData.semester} {classData.academicYear}
              </Typography>
            </Box>
            <Tooltip title="Konfigurasi Kelas">
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  onConfigure(classData);
                }}
                sx={{ 
                  ml: 1,
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                  }
                }}
              >
                <Settings size={20} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Users size={16} color="#666" />
            <Typography variant="body2">
              {classData.studentCount} mahasiswa
            </Typography>
          </Box>

          <Box mb={2}>
            <Box display="flex" justifyContent="between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Konfigurasi
              </Typography>
              <Chip
                icon={classData.configurationComplete ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                label={classData.configurationComplete ? 'Selesai' : 'Pending'}
                color={classData.configurationComplete ? 'success' : 'warning'}
                size="small"
                sx={{ fontWeight: 'medium' }}
              />
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={completionPercentage}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            {classData.components.slice(0, 3).map((component) => (
              <Chip
                key={component.id}
                label={`${component.name} ${component.percentage}%`}
                size="small"
                sx={{
                  backgroundColor: `${component.color}15`,
                  color: component.color,
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                }}
              />
            ))}
            {classData.components.length > 3 && (
              <Chip
                label={`+${classData.components.length - 3} lainnya`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
        
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Eye size={18} />}
            onClick={() => onViewGrades(classData)}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 'medium',
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0, #1976d2)',
              }
            }}
          >
            Lihat Nilai
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
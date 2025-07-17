import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Alert,
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';
import { ArrowLeft, Save, Download, Users, TrendingUp, Award } from 'lucide-react';
import { Class } from '@/types';
import { useGradeStore } from '@/lib/store';
import { useGradeCalculations } from '@/hooks/useGradeCalculations';
import { StatCard } from './ui/StatCard';

interface GradeInputProps {
  classData: Class;
  onBack: () => void;
}

export function GradeInput({ classData, onBack }: GradeInputProps) {
  const { grades, updateStudentGrade } = useGradeStore();
  const { calculations, classStats } = useGradeCalculations(classData.id);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(classData.components[0]?.id || '');
  const [editingGrades, setEditingGrades] = useState<Record<string, string>>({});

  const currentComponent = classData.components.find(c => c.id === selectedComponent);
  const currentChapter = classData.chapters[selectedTab];

  const handleGradeChange = (studentId: string, value: string) => {
    const key = `${studentId}-${selectedComponent}-${currentChapter.id}`;
    setEditingGrades(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveGrade = (studentId: string) => {
    const key = `${studentId}-${selectedComponent}-${currentChapter.id}`;
    const value = editingGrades[key];
    
    if (value !== undefined) {
      const score = parseFloat(value);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        updateStudentGrade({
          studentId,
          componentId: selectedComponent,
          chapterId: currentChapter.id,
          score,
          maxScore: 100,
        });
        
        // Remove from editing state
        setEditingGrades(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
      }
    }
  };

  const getGradeValue = (studentId: string) => {
    const key = `${studentId}-${selectedComponent}-${currentChapter.id}`;
    
    // Check if currently editing
    if (editingGrades[key] !== undefined) {
      return editingGrades[key];
    }
    
    // Get from store
    const grade = grades.find(g => 
      g.studentId === studentId && 
      g.componentId === selectedComponent && 
      g.chapterId === currentChapter.id
    );
    
    return grade ? grade.score.toString() : '';
  };

  const completionRate = useMemo(() => {
    const totalGrades = classData.studentsEnrolled.length * classData.components.length * classData.chapters.length;
    const enteredGrades = grades.filter(g => 
      classData.studentsEnrolled.some(s => s.id === g.studentId)
    ).length;
    
    return totalGrades > 0 ? (enteredGrades / totalGrades) * 100 : 0;
  }, [grades, classData]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <IconButton onClick={onBack}>
          <ArrowLeft size={24} />
        </IconButton>
        <Box flex={1}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Grade Input & Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {classData.name} ({classData.code}) • {classData.studentsEnrolled.length} students
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Download size={20} />}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
        <Button
          variant="contained"
          startIcon={<Save size={20} />}
        >
          Save All
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={classData.studentsEnrolled.length}
            icon={<Users size={24} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Class Average"
            value={classStats?.average ? `${classStats.average}%` : 'N/A'}
            icon={<TrendingUp size={24} />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completion Rate"
            value={`${Math.round(completionRate)}%`}
            icon={<Award size={24} />}
            color="success"
            subtitle={`${classStats?.gradedStudents || 0}/${classData.studentsEnrolled.length} students`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Grade Distribution"
            value={classStats?.distribution?.A || 0}
            icon={<Award size={24} />}
            color="warning"
            subtitle="Students with A grade"
          />
        </Grid>
      </Grid>

      {/* Progress Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
            <Typography variant="h6">Grade Entry Progress</Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(completionRate)}% Complete
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={completionRate}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Grade Input Panel */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
                <Typography variant="h6">Grade Input</Typography>
                {!classData.configurationComplete && (
                  <Alert severity="warning" sx={{ py: 0 }}>
                    Complete class configuration first
                  </Alert>
                )}
              </Box>

              {/* Component Selection */}
              <Box mb={3}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Select Grade Component
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {classData.components.map((component) => (
                    <Chip
                      key={component.id}
                      label={`${component.name} (${component.percentage}%)`}
                      onClick={() => setSelectedComponent(component.id)}
                      color={selectedComponent === component.id ? 'primary' : 'default'}
                      sx={{
                        backgroundColor: selectedComponent === component.id 
                          ? component.color 
                          : undefined,
                        color: selectedComponent === component.id ? 'white' : undefined,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Chapter Tabs */}
              <Tabs
                value={selectedTab}
                onChange={(_, newValue) => setSelectedTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
              >
                {classData.chapters.map((chapter, index) => (
                  <Tab
                    key={chapter.id}
                    label={
                      <Box>
                        <Typography variant="body2">{chapter.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Weight: {(chapter.weight * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>

              {/* Grade Input Table */}
              {currentComponent && currentChapter && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>NPM</TableCell>
                        <TableCell align="center">
                          {currentComponent.name} Score
                        </TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classData.studentsEnrolled.map((student) => {
                        const gradeValue = getGradeValue(student.id);
                        const key = `${student.id}-${selectedComponent}-${currentChapter.id}`;
                        const isEditing = editingGrades[key] !== undefined;
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {student.npm}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                size="small"
                                type="number"
                                value={gradeValue}
                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                inputProps={{ min: 0, max: 100, step: 0.5 }}
                                sx={{ width: 100 }}
                                error={gradeValue !== '' && (isNaN(Number(gradeValue)) || Number(gradeValue) < 0 || Number(gradeValue) > 100)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {isEditing && (
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handleSaveGrade(student.id)}
                                  disabled={gradeValue === '' || isNaN(Number(gradeValue))}
                                >
                                  Save
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Final Grades Preview */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Final Grades Preview
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Real-time calculation based on current grades
              </Typography>

              <Box maxHeight={400} sx={{ overflowY: 'auto' }}>
                {calculations.map((calc) => {
                  const student = classData.studentsEnrolled.find(s => s.id === calc.studentId);
                  if (!student) return null;

                  return (
                    <Box
                      key={calc.studentId}
                      p={2}
                      mb={2}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        backgroundColor: calc.finalGrade > 0 ? 'background.paper' : 'grey.50',
                      }}
                    >
                      <Box display="flex" justifyContent="between" alignItems="center" mb={1}>
                        <Typography variant="body2" fontWeight="medium">
                          {student.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6" fontWeight="bold">
                            {calc.finalGrade.toFixed(1)}
                          </Typography>
                          <Chip
                            label={calc.letterGrade}
                            size="small"
                            color={calc.letterGrade === 'A' ? 'success' : calc.letterGrade.startsWith('B') ? 'primary' : 'default'}
                          />
                        </Box>
                      </Box>
                      
                      <Box>
                        {calc.componentScores.map((compScore) => {
                          const component = classData.components.find(c => c.id === compScore.componentId);
                          if (!component) return null;
                          
                          const componentGrade = compScore.maxScore > 0 
                            ? (compScore.totalScore / compScore.maxScore) * 100 
                            : 0;
                          
                          return (
                            <Box key={compScore.componentId} display="flex" justifyContent="between" alignItems="center">
                              <Typography variant="caption" color="text.secondary">
                                {component.name}:
                              </Typography>
                              <Typography variant="caption">
                                {componentGrade.toFixed(1)} ({component.percentage}%)
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
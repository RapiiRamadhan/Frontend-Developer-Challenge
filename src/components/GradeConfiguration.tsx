import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Slider,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { ArrowLeft, Save, RotateCcw, Eye } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Class, GradeComponent } from '@/types';
import { useGradeStore } from '@/lib/store';
import { validateComponentPercentages } from '@/lib/utils';

interface GradeConfigurationProps {
  classData: Class;
  onBack: () => void;
  onSave: () => void;
}

interface FormData {
  components: GradeComponent[];
}

export function GradeConfiguration({ classData, onBack, onSave }: GradeConfigurationProps) {
  const { updateClassComponents } = useGradeStore();
  const [previewMode, setPreviewMode] = useState(false);
  
  const { control, watch, setValue, handleSubmit, formState: { isDirty } } = useForm<FormData>({
    defaultValues: {
      components: classData.components,
    },
  });

  const watchedComponents = watch('components');
  const isValid = validateComponentPercentages(watchedComponents);
  const totalPercentage = watchedComponents.reduce((sum, comp) => sum + comp.percentage, 0);

  const handlePercentageChange = (index: number, value: number) => {
    const updatedComponents = [...watchedComponents];
    updatedComponents[index] = { ...updatedComponents[index], percentage: value };
    setValue('components', updatedComponents);
  };

  const handleReset = () => {
    setValue('components', classData.components);
  };

  const onSubmit = (data: FormData) => {
    if (isValid) {
      updateClassComponents(classData.id, data.components);
      onSave();
    }
  };

  const sampleCalculation = {
    tugas: 85,
    uts: 78,
    uas: 82,
    proyek: 90,
    kuis: 88,
  };

  const calculateSampleFinal = () => {
    return watchedComponents.reduce((total, comp) => {
      const score = sampleCalculation[comp.id as keyof typeof sampleCalculation] || 0;
      return total + (score * comp.percentage / 100);
    }, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <IconButton onClick={onBack}>
          <ArrowLeft size={24} />
        </IconButton>
        <Box flex={1}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Grade Configuration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {classData.name} ({classData.code})
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Eye size={20} />}
          onClick={() => setPreviewMode(!previewMode)}
          sx={{ mr: 1 }}
        >
          {previewMode ? 'Edit Mode' : 'Preview'}
        </Button>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Component Configuration */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Grade Components Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Set the percentage weight for each grade component. Total must equal 100%.
                </Typography>

                {!isValid && (
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    Total percentage is {totalPercentage}%. Please adjust to equal 100%.
                  </Alert>
                )}

                <Grid container spacing={3}>
                  {watchedComponents.map((component, index) => (
                    <Grid item xs={12} md={6} key={component.id}>
                      <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              backgroundColor: component.color,
                              borderRadius: '4px',
                            }}
                          />
                          <Typography variant="h6" fontWeight="bold">
                            {component.name}
                          </Typography>
                        </Box>

                        <Controller
                          name={`components.${index}.percentage`}
                          control={control}
                          render={({ field }) => (
                            <Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Percentage Weight
                              </Typography>
                              <Box display="flex" alignItems="center" gap={2}>
                                <Slider
                                  {...field}
                                  min={0}
                                  max={50}
                                  step={1}
                                  disabled={previewMode}
                                  onChange={(_, value) => handlePercentageChange(index, value as number)}
                                  sx={{ flex: 1 }}
                                  color="primary"
                                />
                                <TextField
                                  value={field.value}
                                  onChange={(e) => handlePercentageChange(index, Number(e.target.value))}
                                  type="number"
                                  size="small"
                                  disabled={previewMode}
                                  sx={{ width: 80 }}
                                  InputProps={{
                                    endAdornment: '%',
                                  }}
                                />
                              </Box>
                            </Box>
                          )}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box mt={3} p={2} sx={{ backgroundColor: 'grey.50', borderRadius: 1 }}>
                  <Box display="flex" justifyContent="between" alignItems="center">
                    <Typography variant="body1" fontWeight="bold">
                      Total Percentage:
                    </Typography>
                    <Chip
                      label={`${totalPercentage}%`}
                      color={isValid ? 'success' : 'error'}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Preview & Actions */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Configuration Preview
                </Typography>
                
                <Box mb={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Grade Component Breakdown
                  </Typography>
                  {watchedComponents.map((component) => (
                    <Box key={component.id} display="flex" justifyContent="between" alignItems="center" py={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            backgroundColor: component.color,
                            borderRadius: '2px',
                          }}
                        />
                        <Typography variant="body2">{component.name}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {component.percentage}%
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sample Calculation
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Example with sample scores:
                </Typography>
                
                {Object.entries(sampleCalculation).map(([key, score]) => {
                  const component = watchedComponents.find(c => c.id === key);
                  if (!component) return null;
                  
                  const contribution = (score * component.percentage / 100).toFixed(1);
                  
                  return (
                    <Box key={key} display="flex" justifyContent="between" alignItems="center" py={0.5}>
                      <Typography variant="caption">
                        {component.name}: {score}
                      </Typography>
                      <Typography variant="caption" fontWeight="bold">
                        +{contribution}
                      </Typography>
                    </Box>
                  );
                })}
                
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="between" alignItems="center">
                  <Typography variant="body2" fontWeight="bold">
                    Final Grade:
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {calculateSampleFinal().toFixed(1)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box mt={3} display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<RotateCcw size={20} />}
                onClick={handleReset}
                disabled={!isDirty || previewMode}
                fullWidth
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save size={20} />}
                disabled={!isValid || !isDirty}
                fullWidth
              >
                Save Configuration
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
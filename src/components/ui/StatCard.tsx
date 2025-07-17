import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  subtitle?: string;
}

export function StatCard({ title, value, icon, color = 'primary', subtitle }: StatCardProps) {
  const colorMap = {
    primary: '#1976d2',
    secondary: '#00695c',
    success: '#2e7d32',
    warning: '#f57c00',
    error: '#d32f2f',
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: '12px', 
              backgroundColor: `${colorMap[color]}15`,
              color: colorMap[color],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Box flex={1}>
            <Typography variant="h4" component="div" fontWeight="bold" color={colorMap[color]}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
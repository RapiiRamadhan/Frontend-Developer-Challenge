'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  School,
  Bell,
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/authStore';

interface HeaderProps {
  onToggleTheme?: () => void;
  isDarkMode?: boolean;
}

export function Header({ onToggleTheme, isDarkMode }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuthStore();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <School size={24} color="white" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="white">
                Grade Management
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.8)">
                BTIK UDINUS
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Box flex={1} />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {/* Notifications */}
            <Tooltip title="Notifikasi">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <Bell size={20} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Theme Toggle */}
            {onToggleTheme && (
              <Tooltip title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}>
                <IconButton color="inherit" onClick={onToggleTheme}>
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </IconButton>
              </Tooltip>
            )}

            {/* Settings */}
            <Tooltip title="Pengaturan">
              <IconButton color="inherit">
                <Settings size={20} />
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: '12px',
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }
              }}
            >
              <Box px={2} py={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {user?.department}
                </Typography>
              </Box>
              
              <Divider />
              
              <MenuItem onClick={handleMenuClose}>
                <User size={18} style={{ marginRight: 12 }} />
                Profil Saya
              </MenuItem>
              
              <MenuItem onClick={handleMenuClose}>
                <Settings size={18} style={{ marginRight: 12 }} />
                Pengaturan
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogOut size={18} style={{ marginRight: 12 }} />
                Keluar
              </MenuItem>
            </Menu>
          </Box>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}
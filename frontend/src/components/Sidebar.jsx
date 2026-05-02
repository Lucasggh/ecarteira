import React, { useState, useContext } from 'react';
import { 
    Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, 
    Box, Divider, Avatar, Menu, MenuItem, Switch, useTheme 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../App';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
    const location = useLocation();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    
    // Settings Menu State
    const [anchorEl, setAnchorEl] = useState(null);
    const openSettings = Boolean(anchorEl);

    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setAnchorEl(null);
    };

    const { logout } = useAuth();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Transactions', icon: <ReceiptLongIcon />, path: '/transactions' },
        { text: 'Operations', icon: <AccountBalanceWalletIcon />, path: '/operations' },
        { text: 'Transfer', icon: <AccountBalanceWalletIcon />, path: '/transfer' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: theme.palette.mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
                    backgroundColor: theme.palette.background.paper
                },
            }}
        >
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)'
                }}>
                    <AccountBalanceWalletIcon sx={{ color: 'white' }} fontSize="small" />
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '-0.5px' }}>
                    Banquexx
                </Typography>
            </Box>

            <List sx={{ px: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem
                            button
                            key={item.text}
                            component={NavLink}
                            to={item.path}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                backgroundColor: isActive ? 'primary.main' : 'transparent',
                                color: isActive ? 'white' : 'text.secondary',
                                '&:hover': {
                                    backgroundColor: isActive ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
                                    color: isActive ? 'white' : 'primary.main',
                                    '& .MuiListItemIcon-root': {
                                        color: isActive ? 'white' : 'primary.main',
                                    }
                                },
                            }}
                        >
                            <ListItemIcon sx={{
                                color: isActive ? 'white' : 'inherit',
                                minWidth: 40
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: '0.95rem'
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ mx: 2, my: 2 }} />

            <List sx={{ px: 2, pb: 2 }}>
                <ListItem
                    button
                    onClick={handleSettingsClick}
                    sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Settings"
                        primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                    />
                </ListItem>
                <ListItem
                    button
                    onClick={logout}
                    sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                    />
                </ListItem>
            </List>

            {/* Settings Menu Popup */}
            <Menu
                anchorEl={anchorEl}
                open={openSettings}
                onClose={handleSettingsClose}
                PaperProps={{
                    sx: {
                        mt: -2,
                        ml: 2,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)'
                    }
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                        APPEARANCE
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {theme.palette.mode === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                            <Typography variant="body2" fontWeight="medium">
                                Dark Mode
                            </Typography>
                        </Box>
                        <Switch 
                            checked={theme.palette.mode === 'dark'} 
                            onChange={colorMode.toggleColorMode} 
                            size="small"
                        />
                    </Box>
                </Box>
            </Menu>

            <Box sx={{ 
                p: 2, m: 2, 
                bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a', 
                borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, 
                border: theme.palette.mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155' 
            }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light' }}>L</Avatar>
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold" display="block">
                        Lucas
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Pro Plan
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;

import React, { useState, useContext } from 'react';
import { 
    Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, 
    Box, Divider, Avatar, Menu, MenuItem, Switch, useTheme, useMediaQuery,
    IconButton, AppBar, Toolbar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { NavLink, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../App';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Transactions', icon: <ReceiptLongIcon />, path: '/transactions' },
    { text: 'Operations', icon: <AccountBalanceWalletIcon />, path: '/operations' },
    { text: 'Transfer', icon: <CompareArrowsIcon />, path: '/transfer' },
];

// Shared sidebar content — rendered inside both permanent and temporary drawers
const SidebarContent = ({ onClose }) => {
    const location = useLocation();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { logout, user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const openSettings = Boolean(anchorEl);

    const handleSettingsClick = (e) => setAnchorEl(e.currentTarget);
    const handleSettingsClose = () => setAnchorEl(null);

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo */}
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

            {/* Main nav */}
            <List sx={{ px: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem
                            button
                            key={item.text}
                            component={NavLink}
                            to={item.path}
                            onClick={handleNavClick}
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
                            <ListItemIcon sx={{ color: isActive ? 'white' : 'inherit', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: '0.95rem' }}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ mx: 2, my: 2 }} />

            {/* Bottom actions */}
            <List sx={{ px: 2, pb: 2 }}>
                <ListItem
                    button
                    onClick={handleSettingsClick}
                    sx={{ borderRadius: 2, mb: 0.5, color: 'text.secondary', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }} />
                </ListItem>
                <ListItem
                    button
                    onClick={() => { logout(); if (onClose) onClose(); }}
                    sx={{ borderRadius: 2, mb: 0.5, color: 'text.secondary', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }} />
                </ListItem>
            </List>

            {/* Settings popup */}
            <Menu
                anchorEl={anchorEl}
                open={openSettings}
                onClose={handleSettingsClose}
                PaperProps={{ sx: { mt: -2, ml: 2, minWidth: 200, borderRadius: 2, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)' } }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
                        APPEARANCE
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {useTheme().palette.mode === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                            <Typography variant="body2" fontWeight="medium">Dark Mode</Typography>
                        </Box>
                        <Switch
                            checked={useTheme().palette.mode === 'dark'}
                            onChange={colorMode.toggleColorMode}
                            size="small"
                        />
                    </Box>
                </Box>
            </Menu>

            {/* User card */}
            <Box sx={{ 
                p: 2, m: 2,
                bgcolor: useTheme().palette.mode === 'light' ? '#f8fafc' : '#0f172a',
                borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2,
                border: useTheme().palette.mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155'
            }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light' }}>{initial}</Avatar>
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold" display="block">
                        {user?.name || 'Usuário'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Pro Plan
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

    // ── Desktop: permanent drawer ──────────────────────────────────
    if (!isMobile) {
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
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
            >
                <SidebarContent />
            </Drawer>
        );
    }

    // ── Mobile: hamburger + temporary drawer ───────────────────────
    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderBottom: theme.palette.mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerToggle}
                        aria-label="Abrir menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{
                            bgcolor: 'primary.main',
                            borderRadius: 1.5,
                            p: 0.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <AccountBalanceWalletIcon sx={{ color: 'white' }} fontSize="small" />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '-0.5px' }}>
                            Banquexx
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Temporary drawer slides in from left */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
            >
                <SidebarContent onClose={handleDrawerToggle} />
            </Drawer>
        </>
    );
};

export default Sidebar;

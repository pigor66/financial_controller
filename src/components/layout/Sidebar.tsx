/**
 * Menu lateral de navegação - Dark Mode
 */

'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Toolbar,
    Divider,
    Typography,
    Box,
    Avatar,
} from '@mui/material';

const drawerWidth = 240;

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: '📊' },
    { text: 'Transações', path: '/transactions', icon: '💰' },
    { text: 'Nova Transação', path: '/transactions/new', icon: '➕' },
    { text: 'Relatórios', path: '/reports', icon: '📈' },
];

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    const drawerContent = (
        <Box sx={{ height: '100%', backgroundColor: '#1a1a1a' }}>
            {/* Logo/Brand */}
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: '#ff4444',
                        fontWeight: 'bold',
                        fontFamily: 'monospace'
                    }}
                >
                    DarkPan
                </Typography>
            </Box>

            {/* User Profile */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#ff4444'
                    }}
                >
                    P
                </Avatar>
                <Box>
                    <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                        Pigor
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                        Admin
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: '#333333' }} />

            {/* Navigation Menu */}
            <List sx={{ px: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={pathname === item.path}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                borderRadius: 1,
                                backgroundColor: pathname === item.path ? '#333333' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#333333',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#333333',
                                    '& .MuiListItemIcon-root': {
                                        color: '#ff4444',
                                    },
                                    '& .MuiListItemText-primary': {
                                        color: '#ff4444',
                                        fontWeight: 'bold',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Typography sx={{ fontSize: '1.2rem' }}>{item.icon}</Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: '#ffffff',
                                        fontSize: '0.9rem'
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: '#1a1a1a',
                        borderRight: '1px solid #333333'
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1a1a1a',
                        borderRight: '1px solid #333333'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}


/**
 * Layout principal do dashboard - Dark Mode
 */

'use client';

import * as React from 'react';
import { Box, Toolbar } from '@mui/material';
import { AppBar } from './AppBar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: '#000000',
            minHeight: '100vh'
        }}>
            <AppBar onMenuClick={handleDrawerToggle} />

            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 240px)` },
                    minHeight: '100vh',
                    backgroundColor: '#000000',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}


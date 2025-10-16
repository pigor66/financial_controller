/**
 * Barra de navegação principal - Dark Mode
 */

'use client';

import * as React from 'react';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Avatar,
    Badge,
    InputBase,
    alpha,
} from '@mui/material';

interface AppBarProps {
    onMenuClick: () => void;
}

export function AppBar({ onMenuClick }: AppBarProps) {
    return (
        <MuiAppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: '#0a0a0a',
                borderBottom: '1px solid #1a1a1a',
                boxShadow: 'none'
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    ☰
                </IconButton>

                {/* Search Bar */}
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 1,
                        backgroundColor: alpha('#ffffff', 0.1),
                        '&:hover': {
                            backgroundColor: alpha('#ffffff', 0.15),
                        },
                        marginRight: 2,
                        marginLeft: 0,
                        width: '100%',
                        maxWidth: 300,
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    <Box
                        sx={{
                            padding: '0 12px',
                            height: '100%',
                            position: 'absolute',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{ color: '#b0b0b0' }}>🔍</Typography>
                    </Box>
                    <InputBase
                        placeholder="Search..."
                        sx={{
                            color: 'inherit',
                            '& .MuiInputBase-input': {
                                padding: '8px 8px 8px 40px',
                                transition: 'width 0.2s',
                                width: '100%',
                            },
                        }}
                    />
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Right side icons and profile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <Typography sx={{ fontSize: '1.2rem' }}>💬</Typography>
                        </Badge>
                    </IconButton>

                    <IconButton color="inherit">
                        <Badge badgeContent={3} color="error">
                            <Typography sx={{ fontSize: '1.2rem' }}>🔔</Typography>
                        </Badge>
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#ff4444'
                            }}
                        >
                            P
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                            Pigor
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
}


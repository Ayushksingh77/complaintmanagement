'use client';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ReactNode, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Particles from "react-tsparticles";

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useMemo(() => createTheme({
    palette: { mode: 'light' },
    typography: { fontFamily: inter.style.fontFamily },
  }), []);

  return (
    <html>
      <body className={inter.className} style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Animated background */}
          <Box sx={{ position: 'fixed', inset: 0, zIndex: 0 }}>
            <Particles
              id="tsparticles"
              options={{
                fullScreen: false,
                background: { color: '#f4f7f6' },
                particles: {
                  number: { value: 40 },
                  color: { value: '#1976d2' },
                  shape: { type: 'circle' },
                  opacity: { value: 0.2 },
                  size: { value: 3 },
                  move: { enable: true, speed: 0.5 },
                  links: { enable: true, color: '#1976d2', opacity: 0.1 },
                },
                detectRetina: true,
              }}
            />
          </Box>
          {/* Main content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
import * as React from 'react';
import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        position: 'relative',
      }}
    >
      <Avatar
        src='/avatar.png'
        alt='Twoje zdjęcie'
        sx={{ width: 120, height: 120, mb: 3, boxShadow: 3 }}
      />
      <Typography variant='h1' sx={{ fontSize: { xs: 36, md: 56 }, mb: 2 }}>
        Cześć, jestem <span style={{ color: '#00bcd4' }}>Twoje Imię</span>
      </Typography>
      <Typography variant='h5' sx={{ mb: 4, color: 'text.secondary' }}>
        Frontend Developer | React | Next.js
      </Typography>
      <Stack direction='row' spacing={2} justifyContent='center'>
        <Button
          variant='contained'
          color='primary'
          size='large'
          href='#projects'
        >
          Zobacz projekty
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          href='#contact'
        >
          Kontakt
        </Button>
      </Stack>
    </Box>
  );
}

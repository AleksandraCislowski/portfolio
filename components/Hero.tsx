import * as React from 'react';
import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

export default function Hero() {
  const dict = useTranslation();
  if (!dict) return null;
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
        alt='avatar'
        sx={{ width: 120, height: 120, mb: 3, boxShadow: 3 }}
      />
      <Typography variant='h1' sx={{ fontSize: { xs: 36, md: 56 }, mb: 2 }}>
        {dict.hero.greeting
          .replace('<1>', '<span style={{ color: "#00bcd4" }}>')
          .replace('</1>', '</span>')}
      </Typography>
      <Typography variant='h5' sx={{ mb: 4, color: 'text.secondary' }}>
        {dict.hero.subtitle}
      </Typography>
      <Stack direction='row' spacing={2} justifyContent='center'>
        <Button
          variant='contained'
          color='primary'
          size='large'
          href='#projects'
        >
          {dict.hero.seeProjects}
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          href='#contact'
        >
          {dict.hero.contact}
        </Button>
      </Stack>
    </Box>
  );
}

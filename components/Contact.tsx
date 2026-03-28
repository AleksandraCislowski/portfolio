import * as React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useTranslation } from '../i18n/useTranslation';

export default function Contact() {
  const dict = useTranslation();
  if (!dict) return null;
  return (
    <Box
      id='contact'
      sx={{
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h3' sx={{ fontWeight: 700, mb: 2 }}>
        {dict.contact.title}
      </Typography>
      <Box component='form' sx={{ width: '100%', maxWidth: 400 }}>
        <Stack spacing={3}>
          <TextField
            label={dict.contact.name}
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            label={dict.contact.email}
            variant='outlined'
            type='email'
            fullWidth
            required
          />
          <TextField
            label={dict.contact.message}
            variant='outlined'
            fullWidth
            required
            multiline
            rows={4}
          />
          <Button
            variant='contained'
            color='primary'
            size='large'
            type='submit'
          >
            {dict.contact.send}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

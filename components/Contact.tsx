import * as React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

export default function Contact() {
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
        Kontakt
      </Typography>
      <Box component='form' sx={{ width: '100%', maxWidth: 400 }}>
        <Stack spacing={3}>
          <TextField label='Imię' variant='outlined' fullWidth required />
          <TextField
            label='Email'
            variant='outlined'
            type='email'
            fullWidth
            required
          />
          <TextField
            label='Wiadomość'
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
            Wyślij
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

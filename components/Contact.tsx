import * as React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useTranslation } from '../i18n/useTranslation';

export default function Contact() {
  const t = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Email: ${email}\n\n${message}`);

    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

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
      <Typography variant='h3' sx={{ mb: 2 }}>
        {t.contact.title}
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: 400 }}
      >
        <Stack spacing={3}>
          <TextField
            name='name'
            label={t.contact.name}
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            name='email'
            label={t.contact.email}
            variant='outlined'
            type='email'
            fullWidth
            required
          />
          <TextField
            name='message'
            label={t.contact.message}
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
            disabled={isSubmitting}
          >
            {t.contact.send}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

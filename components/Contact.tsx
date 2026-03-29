import * as React from 'react';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DESIGN_TOKENS } from '../theme/tokens';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const ContactForm = styled('form')(() => ({
  width: '100%',
  maxWidth: DESIGN_TOKENS.size.contactFormMaxWidth,
}));

const ContactTitle = styled(Typography)(() => ({
  marginBottom: 16,
}));

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

    window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  return (
    <Section id={SITE_CONFIG.sectionIds.contact} centered>
      <ContactTitle variant='h3'>
        {t.contact.title}
      </ContactTitle>
      <ContactForm onSubmit={handleSubmit}>
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
      </ContactForm>
    </Section>
  );
}

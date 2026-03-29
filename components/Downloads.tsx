import * as React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from '../i18n/useTranslation';

export default function Downloads() {
  const t = useTranslation();

  return (
    <Box
      id='downloads'
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        textAlign: 'center',
      }}
    >
      <Typography variant='h3' sx={{ mb: 2 }}>
        {t.downloads.title}
      </Typography>
      <Typography variant='body2' sx={{ maxWidth: 720, mx: 'auto', mb: 4 }}>
        {t.downloads.description}
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent='center'
      >
        <Button variant='outlined' startIcon={<DownloadIcon />} disabled>
          {t.downloads.cv}
        </Button>
        <Button variant='outlined' startIcon={<DownloadIcon />} disabled>
          {t.downloads.portfolio}
        </Button>
        <Button variant='text' disabled>
          {t.downloads.other}
        </Button>
      </Stack>
    </Box>
  );
}

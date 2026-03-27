import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
} from '@mui/material';

export default function Projects() {
  // Placeholder: przykładowe karty projektów
  return (
    <Box id='projects' sx={{ py: 8, px: { xs: 2, md: 6 } }}>
      <Typography
        variant='h3'
        sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}
      >
        Projekty
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ flex: '1 1 300px', maxWidth: 400, minWidth: 260 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.04)' },
              }}
            >
              <Skeleton variant='rectangular' height={160} animation='wave' />
              <CardContent>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  Przykładowy projekt {i}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Opis projektu. Tutaj pojawi się krótki opis Twojego projektu.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

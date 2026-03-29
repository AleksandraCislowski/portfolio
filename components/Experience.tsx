import * as React from 'react';
import { Box, Typography, Card, CardContent, Divider, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const Timeline = styled(Box)(() => ({
  display: 'grid',
  gap: 20,
}));

const RoleMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 8,
}));

export default function Experience() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.experience}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        {t.experience.title}
      </Typography>
      <Timeline>
        {t.experience.roles.map((role) => (
          <Card key={`${role.company}-${role.period}`}>
            <CardContent>
              <Typography variant='h5'>{role.title}</Typography>
              <RoleMeta variant='subtitle2'>
                {role.company} · {role.location} · {role.period}
              </RoleMeta>
              <Typography variant='body2' sx={{ mb: 1.5 }}>
                {role.summary}
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <List dense>
                {role.achievements.map((achievement) => (
                  <ListItem key={achievement} disableGutters>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Timeline>
    </Section>
  );
}

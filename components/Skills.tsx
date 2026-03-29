import * as React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const SkillsGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 20,
}));

const ChipsWrap = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
}));

const Certifications = styled(Box)(() => ({
  marginTop: 24,
}));

export default function Skills() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.skills}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        {t.skills.title}
      </Typography>

      <SkillsGrid>
        {t.skills.groups.map((group) => (
          <Card key={group.title}>
            <CardContent>
              <Typography variant='h6' sx={{ mb: 1.5 }}>
                {group.title}
              </Typography>
              <ChipsWrap>
                {group.items.map((item) => (
                  <Chip key={item} label={item} variant='outlined' />
                ))}
              </ChipsWrap>
            </CardContent>
          </Card>
        ))}
      </SkillsGrid>

      <Certifications>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {t.skills.certificationsTitle}
        </Typography>
        <ChipsWrap>
          {t.skills.certifications.map((certification) => (
            <Chip key={certification} label={certification} />
          ))}
        </ChipsWrap>
      </Certifications>
    </Section>
  );
}

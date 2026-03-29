import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/useTranslation';

const SectionTitle = styled(Typography)(() => ({
  marginBottom: 24,
}));

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

const CardTitle = styled(Typography)(() => ({
  marginBottom: 12,
}));

const LanguagesPanel = styled(Box)(() => ({
  marginTop: 24,
  display: 'grid',
  gap: 12,
}));

const LanguageRow = styled(Box)(() => ({
  display: 'grid',
  gap: 6,
}));

const LanguageHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Certifications = styled(Box)(() => ({
  marginTop: 24,
}));

export default function Skills() {
  const t = useTranslation();

  return (
    <Section id={SITE_CONFIG.sectionIds.skills}>
      <SectionTitle variant='h3'>{t.skills.title}</SectionTitle>

      <SkillsGrid>
        {t.skills.groups.map((group) => (
          <Card key={group.title}>
            <CardContent>
              <CardTitle variant='h6'>{group.title}</CardTitle>
              <ChipsWrap>
                {group.items.map((item) => (
                  <Chip key={item} label={item} variant='outlined' />
                ))}
              </ChipsWrap>
            </CardContent>
          </Card>
        ))}
      </SkillsGrid>

      <LanguagesPanel>
        <Typography variant='h5'>{t.skills.languagesTitle}</Typography>
        {t.skills.languageLevels.map((language) => (
          <LanguageRow key={language.name}>
            <LanguageHeader>
              <Typography variant='body2'>{language.name}</Typography>
              <Typography variant='body2'>{language.level}</Typography>
            </LanguageHeader>
            <LinearProgress
              variant='determinate'
              value={language.percent}
              sx={{ height: 10, borderRadius: 999 }}
            />
          </LanguageRow>
        ))}
      </LanguagesPanel>

      <Certifications>
        <CardTitle variant='h5'>{t.skills.certificationsTitle}</CardTitle>
        <ChipsWrap>
          {t.skills.certifications.map((certification) => (
            <Chip key={certification} label={certification} />
          ))}
        </ChipsWrap>
      </Certifications>
    </Section>
  );
}

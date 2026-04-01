import * as React from 'react';
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { DESIGN_TOKENS } from '../theme/tokens';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const MotionBox = motion.create(Box);

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

const mediaVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -42,
    y: 10,
    scale: 0.92,
    rotate: -4,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.72,
      ease: 'easeOut',
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
    y: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const AboutShell = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 980,
  marginInline: 'auto',
  [theme.breakpoints.up('lg')]: {
    paddingInline: theme.spacing(2),
  },
}));

const AboutLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    gap: theme.spacing(6),
  },
}));

const AboutContent = styled(Box)(() => ({
  minWidth: 0,
  width: '100%',
}));

const AboutMedia = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
  },
}));

const AboutAvatar = styled(Avatar)(({ theme }) => ({
  width: 132,
  height: 132,
  marginBottom: 0,
  [theme.breakpoints.up('md')]: {
    width: 156,
    height: 156,
  },
}));

const AboutDescription = styled(Typography)(() => ({
  maxWidth: DESIGN_TOKENS.size.aboutDescriptionMaxWidth,
  marginBottom: 16,
}));

const AboutTitle = styled(Typography)(() => ({
  marginBottom: 8,
}));

const HighlightsList = styled(List)(() => ({
  width: '100%',
  maxWidth: DESIGN_TOKENS.size.downloadsDescriptionMaxWidth,
  marginBottom: 16,
}));

export default function About() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <Section id={SITE_CONFIG.sectionIds.about}>
      <MotionBox
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.35 }}
      >
        <AboutShell>
          <AboutLayout>
            <MotionBox variants={shouldReduceMotion ? undefined : mediaVariants}>
              <AboutMedia>
                <AboutAvatar src={SITE_CONFIG.avatarImage} alt='Profile photo' />
              </AboutMedia>
            </MotionBox>

            <MotionBox
              variants={shouldReduceMotion ? undefined : contentVariants}
            >
              <AboutContent>
                <AboutTitle variant='h3'>
                  {t.about.title}
                </AboutTitle>
                <AboutDescription variant='body2'>
                  {t.about.description}
                </AboutDescription>
                <HighlightsList dense>
                  {t.about.highlights.map((highlight) => (
                    <ListItem key={highlight} disableGutters>
                      <ListItemText primary={highlight} />
                    </ListItem>
                  ))}
                </HighlightsList>
                <Stack direction='row' spacing={2}>
                  <IconButton
                    color='primary'
                    href={SITE_CONFIG.socialLinks.linkedIn}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Open LinkedIn profile'
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    color='primary'
                    href={SITE_CONFIG.socialLinks.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Open GitHub profile'
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    color='primary'
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    aria-label='Send email'
                  >
                    <EmailIcon />
                  </IconButton>
                </Stack>
              </AboutContent>
            </MotionBox>
          </AboutLayout>
        </AboutShell>
      </MotionBox>
    </Section>
  );
}

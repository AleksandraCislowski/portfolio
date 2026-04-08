import * as React from 'react';
import {
  Box,
  Typography,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { DESIGN_TOKENS } from '../theme/tokens';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';
import { useSectionAnimationReplay } from './sectionAnimationReplay';

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

const AboutPanel = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: 30,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.65)}`,
  background: `linear-gradient(145deg, ${alpha('#101A33', 0.84)} 0%, ${alpha('#16264B', 0.68)} 100%)`,
  boxShadow: '0 20px 48px rgba(2, 6, 23, 0.32)',
  backdropFilter: 'blur(18px)',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background:
      'radial-gradient(circle at 0% 0%, rgba(96,165,250,0.16), transparent 30%), radial-gradient(circle at 100% 100%, rgba(196,181,253,0.1), transparent 28%)',
  },
}));

const AboutLayout = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
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

const AboutAvatarFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  borderRadius: 32,
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.background.paper, 0.92)} 100%)`,
  boxShadow: '0 22px 36px rgba(2, 6, 23, 0.34)',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -10,
    borderRadius: 40,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
    pointerEvents: 'none',
  },
}));

const AboutAvatar = styled(Avatar)(({ theme }) => ({
  width: 132,
  height: 132,
  marginBottom: 0,
  borderRadius: 24,
  border: `3px solid ${alpha(theme.palette.common.white, 0.12)}`,
  '& .MuiAvatar-img': {
    objectFit: 'cover',
    objectPosition: 'center top',
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.up('md')]: {
    width: 156,
    height: 156,
  },
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  maxWidth: DESIGN_TOKENS.size.aboutDescriptionMaxWidth,
  marginBottom: 16,
  color: theme.palette.text.secondary,
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 8,
  textWrap: 'balance',
  color: theme.palette.text.primary,
}));

const HighlightsList = styled(List)(() => ({
  width: '100%',
  maxWidth: DESIGN_TOKENS.size.downloadsDescriptionMaxWidth,
  marginBottom: 16,
  paddingTop: 0,
  paddingBottom: 0,
}));

const HighlightItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1.2),
  paddingInline: 0,
  paddingBlock: theme.spacing(0.85),
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.background.paper, 0.18),
  border: `1px solid ${alpha(theme.palette.divider, 0.35)}`,
  boxShadow: '0 10px 24px rgba(2, 6, 23, 0.16)',
}));

const HighlightText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  paddingInline: theme.spacing(1.75),
  '& .MuiListItemText-primary': {
    color: theme.palette.text.primary,
    fontWeight: 500,
    lineHeight: 1.65,
  },
}));

const SocialLinks = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(1.5),
  flexWrap: 'wrap',
}));

const SocialButton = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: 16,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.24),
  boxShadow: '0 14px 28px rgba(2, 6, 23, 0.2)',
  backdropFilter: 'blur(10px)',
  transition:
    'transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease, background-color 200ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(theme.palette.primary.main, 0.42),
    backgroundColor: alpha(theme.palette.background.paper, 0.34),
    boxShadow: `0 18px 34px ${alpha(theme.palette.primary.main, 0.16)}`,
  },
}));

export default function About() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const replayKey = useSectionAnimationReplay(SITE_CONFIG.sectionIds.about);

  return (
    <Section id={SITE_CONFIG.sectionIds.about}>
      <MotionBox
        key={`about-${replayKey}`}
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.35 }}
      >
        <AboutShell>
          <AboutPanel>
            <AboutLayout>
              <MotionBox variants={shouldReduceMotion ? undefined : mediaVariants}>
                <AboutMedia>
                  <AboutAvatarFrame>
                    <AboutAvatar
                      src={SITE_CONFIG.avatarImage}
                      alt={t.accessibility.profilePhoto}
                    />
                  </AboutAvatarFrame>
                </AboutMedia>
              </MotionBox>

              <MotionBox
                variants={shouldReduceMotion ? undefined : contentVariants}
              >
                <AboutContent>
                  <AboutTitle as='h2' variant='h3'>
                    {t.about.title}
                  </AboutTitle>
                  <AboutDescription variant='body2'>
                    {t.about.description}
                  </AboutDescription>
                  <HighlightsList dense>
                    {t.about.highlights.map((highlight) => (
                      <HighlightItem key={highlight} disableGutters>
                        <HighlightText primary={highlight} />
                      </HighlightItem>
                    ))}
                  </HighlightsList>
                  <SocialLinks>
                    <SocialButton
                      href={`mailto:${SITE_CONFIG.contactEmail}`}
                      aria-label={t.accessibility.sendEmail}
                    >
                      <EmailIcon />
                    </SocialButton>
                    <SocialButton
                      href={SITE_CONFIG.socialLinks.linkedIn}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={t.accessibility.openLinkedIn}
                    >
                      <LinkedInIcon />
                    </SocialButton>
                    <SocialButton
                      href={SITE_CONFIG.socialLinks.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={t.accessibility.openGitHub}
                    >
                      <GitHubIcon />
                    </SocialButton>
                    <SocialButton
                      href={SITE_CONFIG.socialLinks.lovorda}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={t.accessibility.openLovorda}
                    >
                      <TravelExploreRoundedIcon />
                    </SocialButton>
                  </SocialLinks>
                </AboutContent>
              </MotionBox>
            </AboutLayout>
          </AboutPanel>
        </AboutShell>
      </MotionBox>
    </Section>
  );
}

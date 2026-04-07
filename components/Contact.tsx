import { Box, Typography, Button, Stack, Link } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { DESIGN_TOKENS } from '../theme/tokens';
import { useTranslation } from '../i18n/useTranslation';
import Section from './Section';
import { SITE_CONFIG } from '../config/site';

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -32, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.68, ease: 'easeOut' },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, x: 34, y: 18 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.76, ease: 'easeOut' },
  },
};

const ContactShell = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1080,
  marginInline: 'auto',
  display: 'grid',
  gap: theme.spacing(3),
  alignItems: 'stretch',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1.18fr) minmax(280px, 0.82fr)',
    gap: theme.spacing(4),
    alignItems: 'center',
  },
}));

const MotionContactShell = motion.create(ContactShell);

const ContactContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: 28,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha('#16264B', 0.64)} 100%)`,
  boxShadow: '0 20px 46px rgba(2, 6, 23, 0.28)',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background:
      'radial-gradient(circle at top left, rgba(96,165,250,0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(196,181,253,0.12), transparent 30%)',
  },
}));

const MotionContactContent = motion.create(ContactContent);

const ContactContentInner = styled(Box)(() => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const ContactEyebrow = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.25),
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: alpha(theme.palette.primary.light, 0.84),
  fontSize: '0.76rem',
  fontWeight: 700,
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  maxWidth: 520,
  textWrap: 'balance',
}));

const ContactDescription = styled(Typography)(({ theme }) => ({
  maxWidth: 560,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const ContactActions = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: DESIGN_TOKENS.size.aboutDescriptionMaxWidth,
  gap: theme.spacing(1.25),
  alignItems: 'flex-start',
  marginTop: 'auto',
}));

const ContactHelper = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ContactVisual = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 320,
  borderRadius: 28,
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
  boxShadow: '0 20px 46px rgba(2, 6, 23, 0.28)',
  [theme.breakpoints.up('md')]: {
    minHeight: 440,
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: 480,
  },
}));

const MotionContactVisual = motion.create(ContactVisual);

const ContactVisualImage = styled('img')(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 42%',
  transform: 'scale(1.05)',
  filter: 'saturate(0.98) contrast(1.02) brightness(1.04)',
}));

const ContactVisualOverlay = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  background: `
    linear-gradient(180deg, ${alpha('#071022', 0.08)} 0%, ${alpha('#071022', 0.22)} 100%),
    radial-gradient(circle at center, transparent 0%, ${alpha('#071022', 0.04)} 56%, ${alpha('#071022', 0.28)} 100%)
  `,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(7,16,34,0) 0%, rgba(7,16,34,0.04) 48%, rgba(7,16,34,0.34) 100%)',
  },
}));

export default function Contact() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const mailtoHref = `mailto:${SITE_CONFIG.contactEmail}`;

  return (
    <Section id={SITE_CONFIG.sectionIds.contact}>
      <MotionContactShell
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
      >
        <MotionContactContent variants={shouldReduceMotion ? undefined : contentVariants}>
          <ContactContentInner>
            <ContactEyebrow variant='caption'>
              {t.contact.kicker}
            </ContactEyebrow>
            <ContactTitle variant='h3'>
              {t.contact.title}
            </ContactTitle>
            <ContactDescription variant='body1'>
              {t.contact.description}
            </ContactDescription>
            <ContactActions>
              <Stack direction='row' justifyContent='flex-start'>
                <Button
                  component={Link}
                  href={mailtoHref}
                  variant='contained'
                  color='primary'
                  size='large'
                  underline='none'
                >
                  {t.contact.send}
                </Button>
              </Stack>
              <ContactHelper variant='body2'>
                {t.contact.helper}
              </ContactHelper>
            </ContactActions>
          </ContactContentInner>
        </MotionContactContent>
        <MotionContactVisual variants={shouldReduceMotion ? undefined : visualVariants}>
          <ContactVisualImage
            src='/images/profile/contact.png'
            alt='Contact illustration'
          />
          <ContactVisualOverlay />
        </MotionContactVisual>
      </MotionContactShell>
    </Section>
  );
}

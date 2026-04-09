export const heroSectionSx = {
  position: 'relative',
  overflowX: 'clip',
  overflowY: 'visible',
  px: 0,
  pt: {
    xs: 'calc(env(safe-area-inset-top, 0px) + 72px)',
    md: 4,
  },
  pb: {
    xs: 4,
    md: 6,
  },
} as const;

import * as React from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { DESIGN_TOKENS } from '../theme/tokens';

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  centered?: boolean;
  textAlign?: React.CSSProperties['textAlign'];
  sx?: SxProps<Theme>;
};

export default function Section({
  id,
  children,
  centered = false,
  textAlign,
  sx,
}: SectionProps) {
  return (
    <Box
      component='section'
      id={id}
      sx={{
        py: {
          xs: DESIGN_TOKENS.section.paddingYMobile,
          md: DESIGN_TOKENS.section.paddingYDesktop,
        },
        px: {
          xs: DESIGN_TOKENS.section.paddingXMobile,
          md: DESIGN_TOKENS.section.paddingXDesktop,
        },
        ...(centered
          ? {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }
          : null),
        ...(textAlign ? { textAlign } : null),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

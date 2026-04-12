'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

type DeferredSectionProps = {
  children: React.ReactNode;
  id?: string;
  minHeight?: number | string | { xs?: number | string; sm?: number | string; md?: number | string; lg?: number | string };
  rootMargin?: string;
  sx?: SxProps<Theme>;
};

export default function DeferredSection({
  children,
  id,
  minHeight = 320,
  rootMargin = '320px 0px',
  sx,
}: DeferredSectionProps) {
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isVisible) {
      return;
    }

    const node = anchorRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        rootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  if (isVisible) {
    return <>{children}</>;
  }

  return (
    <Box
      ref={anchorRef}
      id={id}
      aria-hidden='true'
      sx={{
        scrollMarginTop: {
          xs: '88px',
          md: '96px',
        },
        minHeight,
        width: '100%',
        ...sx,
      }}
    />
  );
}

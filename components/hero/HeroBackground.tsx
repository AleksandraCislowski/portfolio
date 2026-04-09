import * as React from 'react';
import {
  HeroBackdrop,
  HeroBackgroundVideo,
} from './Hero.styles';

type HeroBackgroundProps = {
  deferVideo: boolean;
};

export function HeroBackground({ deferVideo }: HeroBackgroundProps) {
  const [shouldRenderVideo, setShouldRenderVideo] = React.useState(!deferVideo);

  React.useEffect(() => {
    if (!deferVideo) {
      setShouldRenderVideo(true);
      return;
    }

    setShouldRenderVideo(false);

    const revealVideo = () => {
      setShouldRenderVideo(true);
    };
    const browserWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (typeof browserWindow.requestIdleCallback === 'function') {
      const idleId = browserWindow.requestIdleCallback(revealVideo, { timeout: 1800 });

      return () => {
        browserWindow.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = browserWindow.setTimeout(revealVideo, 1200);

    return () => {
      browserWindow.clearTimeout(timeoutId);
    };
  }, [deferVideo]);

  return (
    <HeroBackdrop>
      {shouldRenderVideo ? (
        <HeroBackgroundVideo
          autoPlay
          muted
          loop
          playsInline
          preload={deferVideo ? 'none' : 'metadata'}
          aria-hidden='true'
        >
          <source src='/images/profile/hero-background.mp4' type='video/mp4' />
        </HeroBackgroundVideo>
      ) : null}
    </HeroBackdrop>
  );
}

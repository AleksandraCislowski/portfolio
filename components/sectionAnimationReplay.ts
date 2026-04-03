import * as React from 'react';

export const HOME_SECTION_REPLAY_ID = 'home';
const SECTION_ANIMATION_REPLAY_EVENT = 'portfolio:section-animation-replay';

type SectionAnimationReplayDetail = {
  sectionId: string;
};

export function replaySectionAnimation(href: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const sectionId = href === '#' ? HOME_SECTION_REPLAY_ID : href.replace(/^#/, '');

  window.dispatchEvent(
    new CustomEvent<SectionAnimationReplayDetail>(SECTION_ANIMATION_REPLAY_EVENT, {
      detail: { sectionId },
    }),
  );
}

export function useSectionAnimationReplay(sectionId: string) {
  const [replayKey, setReplayKey] = React.useState(0);

  React.useEffect(() => {
    const handleReplay = (event: Event) => {
      const customEvent = event as CustomEvent<SectionAnimationReplayDetail>;

      if (customEvent.detail?.sectionId !== sectionId) {
        return;
      }

      setReplayKey((current) => current + 1);
    };

    window.addEventListener(SECTION_ANIMATION_REPLAY_EVENT, handleReplay);

    return () => {
      window.removeEventListener(SECTION_ANIMATION_REPLAY_EVENT, handleReplay);
    };
  }, [sectionId]);

  return replayKey;
}

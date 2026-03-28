import * as React from 'react';
import { Joyride, STATUS, type EventData } from 'react-joyride';
import { useTranslation } from '../i18n/useTranslation';

export default function PortfolioJoyride() {
  const dict = useTranslation();
  const [run, setRun] = React.useState(true);
  if (!dict) return null;
  const steps = [
    {
      target: 'main',
      content: dict.joyride.welcome,
      disableBeacon: true,
    },
    {
      target: '#projects',
      content: dict.joyride.projects,
    },
    {
      target: '#contact',
      content: dict.joyride.contact,
    },
  ];
  const handleJoyrideCallback = (data: EventData) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      locale={{
        back: dict.joyride.back,
        close: dict.joyride.close,
        last: dict.joyride.last,
        next: dict.joyride.next,
        skip: dict.joyride.skip,
      }}
      onEvent={handleJoyrideCallback}
    />
  );
}

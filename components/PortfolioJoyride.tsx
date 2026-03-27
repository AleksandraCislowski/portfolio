import * as React from 'react';
import { Joyride, STATUS, type EventData } from 'react-joyride';

const steps = [
  {
    target: 'main',
    content: 'Witaj w moim portfolio! Przewiń w dół, aby zobaczyć więcej.',
    disableBeacon: true,
  },
  {
    target: '#projects',
    content: 'Tutaj znajdziesz moje projekty. Kliknij, aby zobaczyć szczegóły!',
  },
  {
    target: '#contact',
    content: 'Masz pytania? Skorzystaj z formularza kontaktowego!',
  },
];

export default function PortfolioJoyride() {
  const [run, setRun] = React.useState(true);
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
        back: 'Wstecz',
        close: 'Zamknij',
        last: 'Koniec',
        next: 'Dalej',
        skip: 'Pomiń',
      }}
      onEvent={handleJoyrideCallback}
    />
  );
}

import React from 'react';

import { StoryProvider } from './context';
import { Intersection } from './Intersection';

export default function App(): JSX.Element {
  return (
    <StoryProvider>
      <Intersection />
    </StoryProvider>
  );
}

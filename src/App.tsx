import React from 'react';
import styled from 'styled-components';
import { StoryProvider } from './context';

const StyledBox = styled.div`
  background-color: white;
  color: black;
`;

StyledBox.displayName = 'StyledBox';

export default function App(): JSX.Element {
  return (
    <StoryProvider>
      <StyledBox>Hi Mom</StyledBox>
    </StoryProvider>
  );
}

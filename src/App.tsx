import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  background-color: green;
  color: black;
`;

StyledBox.displayName = 'StyledBox';

const App: React.FC = () => <StyledBox>Hi Everyone</StyledBox>;

export default App;

import React from 'react';
import styled from 'styled-components';

const StyledTopLine = styled.small`
  color: rgb(207, 219, 213);
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
`;

StyledTopLine.displayName = 'StyledTopLine';

export const TopLine: React.FC = props => (
  <StyledTopLine>{props.children}</StyledTopLine>
);

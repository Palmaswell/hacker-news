import React from 'react';
import styled from 'styled-components';

const StyledSubLine = styled.small`
  display: block;
  color: rgb(224, 122, 95);
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  text-align: right;
`;

StyledSubLine.displayName = 'StyledSubLine';

export const SubLine: React.FC = props => (
  <StyledSubLine>{props.children}</StyledSubLine>
);

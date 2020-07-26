import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledItem = styled.li`
  box-sizing: border-box;
  height: 10vh;
  padding: 0 20px;
  animation: 500ms ${fadeIn} ease-out;
`;

StyledItem.displayName = 'StyledItem';

export const Item: React.FC = props => (
  <StyledItem>{props.children}</StyledItem>
);

Item.displayName = 'Story.Item';

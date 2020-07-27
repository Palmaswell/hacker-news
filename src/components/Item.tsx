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
  position: relative;
  box-sizing: border-box;
  min-height: 10vh;
  padding: 20px 20px 20px 0;
  border-bottom: 1px solid rgb(207, 219, 213);
  animation-name: ${fadeIn};
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

StyledItem.displayName = 'StyledItem';

export const Item: React.FC = props => (
  <StyledItem>{props.children}</StyledItem>
);

Item.displayName = 'Story.Item';

import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;

StyledList.displayName = 'StyledList';

export const List: React.FC = props => (
  <StyledList>{props.children}</StyledList>
);

List.displayName = 'Story.List';

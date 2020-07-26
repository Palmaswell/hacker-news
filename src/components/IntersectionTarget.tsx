import React from 'react';
import styled from 'styled-components';

const StyledTarget = styled.div`
  padding: 10vh;
`;

StyledTarget.displayName = 'StyledTarget';

export const IntersectionTarget = React.forwardRef<HTMLDivElement, unknown>(
  (props, ref) => <StyledTarget ref={ref}>{props.children}</StyledTarget>,
);

IntersectionTarget.displayName = 'IntersectionTarget';

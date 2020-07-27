import React from 'react';
import styled from 'styled-components';

export interface LinkProps {
  readonly href: string;
  readonly target: LinkTarget;
}

export type LinkTarget = '_self' | '_blank' | '_top' | '_parent';

const StyledLink = styled.a`
  color: currentColor;
  text-decoration: none;
  transition: color 300ms ease-out;
  :hover {
    color: rgb(51, 53, 51);
  }
`;

StyledLink.displayName = 'StyledLink';

export const Link: React.FC<LinkProps> = props => (
  <StyledLink href={props.href} target={props.target}>
    {props.children}
  </StyledLink>
);

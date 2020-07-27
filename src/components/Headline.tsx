import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export interface HeadlineProps {
  readonly tag: HeadlineTag;
  readonly size: HeadlineSize;
}

export interface StyledHeadlineProps {
  readonly size: HeadlineSize;
}

export enum HeadlineSize {
  s = 's',
  m = 'm',
  l = 'l',
}
export type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const createSizeStyles = (size: HeadlineSize): FlattenSimpleInterpolation => {
  switch (size) {
    case HeadlineSize.s:
      return css`
        font-size: 18px;
      `;
    case HeadlineSize.m:
      return css`
        font-size: 24px;
      `;
    case HeadlineSize.l:
      return css`
        font-size: 32px;
      `;
    default:
      return css`
        font-size: 16px;
      `;
  }
};

const StyledHeadline = styled.h1<StyledHeadlineProps>`
  padding-bottom: 10px;
  margin: 0;
  color: rgb(36, 36, 35);
  line-height: 1.5;
  font-family: 'Libre Baskerville', serif;
  font-weight: 100;
  ${props => createSizeStyles(props.size)}
`;
StyledHeadline.displayName = 'StyledHeadline';

export const Headline: React.FC<HeadlineProps> = props => (
  <StyledHeadline as={props.tag} size={props.size}>
    {props.children}
  </StyledHeadline>
);

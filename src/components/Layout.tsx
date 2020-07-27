import React from 'react';
import styled from 'styled-components';

export interface StoryLayout {
  readonly header: JSX.Element;
}

export const BREAKPOINT = 960;

const LayoutWrapper = styled.div`
  max-width: ${BREAKPOINT}px;
  margin: 0 auto;
  padding-right: 40px;
  @media (min-width: ${BREAKPOINT}px) {
    padding-right: 60px;
  }
`;

const LayoutSlot = styled.div`
  padding: 0 0 0 40px;
  border-right: 1px solid rgb(207, 219, 213);
  @media (min-width: ${BREAKPOINT}px) {
    padding: 0 0 0 60px;
  }
`;
LayoutSlot.displayName = 'LayoutSlot';

const HeaderSlot = styled.header`
  position: relative;
  padding: 0px 20px 30px;
  border-color: rgb(207, 219, 213);
  border-style: solid;
  border-width: 0 1px 1px 0;
  margin: 30px 0 0 40px;
  text-align: right;
  @media (min-width: ${BREAKPOINT}px) {
    margin-left: 60px;
  }
`;
HeaderSlot.displayName = 'HeaderSlot';

export const Layout: React.FC<StoryLayout> = props => (
  <LayoutWrapper>
    <HeaderSlot>{props.header}</HeaderSlot>
    <LayoutSlot>{props.children}</LayoutSlot>
  </LayoutWrapper>
);

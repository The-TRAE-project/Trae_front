import styled, { css } from 'styled-components';

import { Title } from '../styles';

export const Wrapper = styled.div`
  width: 5%;
  position: relative;
  ${({ theme }) => theme.mixins.column};
  align-items: center;
  justify-content: center;
  padding: 39px 8px 9px 0;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  background: var(--white);
`;

export const TotalListItem = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.column};
`;

type TotalTitleProps = {
  $isFirst?: boolean;
};

export const TotalTitle = styled(Title)`
  height: 99px;
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fCenter};
  word-break: break-all;
  border-left: 1px solid var(--green);
  border-bottom: 1px solid var(--green);

  &:first-child {
    border-top: 1px solid var(--green);
  }

  ${(props: TotalTitleProps) =>
    props.$isFirst &&
    css`
      height: 69px;
      word-break: normal;
      border: none;
      padding-left: 6px;

      &:first-child {
        border: none;
      }
    `}
`;

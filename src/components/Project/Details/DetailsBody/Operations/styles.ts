import styled, { css } from 'styled-components';

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  padding: 0 40px;
  overflow: hidden;
`;

type DividerProps = {
  $isLeft?: boolean;
  $isRight?: boolean;
};

export const Divider = styled.div`
  width: 100%;
  border: 2px solid var(--gray2);
  transform: rotate(90deg);
  position: absolute;
  top: 170px;

  ${(props: DividerProps) =>
    props.$isLeft &&
    css`
      left: -170px;
    `}

  ${(props: DividerProps) =>
    props.$isRight &&
    css`
      right: -170px;
    `}
`;

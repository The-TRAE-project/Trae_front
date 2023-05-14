import styled, { css } from 'styled-components';

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
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
      left: -165px;
    `}

  ${(props: DividerProps) =>
    props.$isRight &&
    css`
      right: -165px;
    `}
`;

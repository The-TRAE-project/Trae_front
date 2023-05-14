import styled, { css } from 'styled-components';

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  &::before,
  &::after {
    content: '';
    border: 2px solid var(--gray2);
  }

  &::before {
    width: 100%;
    position: absolute;
    top: 34px;
  }

  &::after {
    width: 22%;
    position: absolute;
    top: 60px;
    left: 37.6px;
    transform: rotate(90deg);
  }
`;

export const DateTitle = styled.p`
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--black);
  text-align: center;
`;

type DateTextProps = {
  $isWithBorder?: boolean;
};

export const DateText = styled(DateTitle)`
  font-family: var(--font-roboto);
  font-weight: 500;

  ${(props: DateTextProps) =>
    props.$isWithBorder &&
    css`
      font-weight: 600;
      border-bottom: 2px solid var(--orange);
    `}
`;

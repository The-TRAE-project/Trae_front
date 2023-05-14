import styled, { css } from 'styled-components';

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin: 0 28px;

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
    left: 92px;
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
  $isColorGreen?: boolean;
};

export const DateText = styled(DateTitle)`
  font-family: var(--font-roboto);
  font-weight: 500;

  ${(props: DateTextProps) =>
    props.$isColorGreen &&
    css`
      background: linear-gradient(
        97.03deg,
        var(--green) 7.5%,
        var(--gradient-green3) 94.35%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    `}
`;

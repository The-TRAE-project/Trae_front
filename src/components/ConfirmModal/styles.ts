import styled, { css } from 'styled-components';

export const Title = styled.p`
  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize40};
  font-weight: 500;
  color: var(--white-black);
  text-align: center;
`;

type ButtonProps = {
  $width?: number;
};

export const Button = styled.button`
  position: relative;
  min-height: 61px;
  ${(props: ButtonProps) =>
    props.$width &&
    css`
      width: ${props.$width}px;
    `};
  ${({ theme }) => theme.mixins.fCenter};
  padding: 14px 32px;
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
  border: none;
  border-radius: 10px;

  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize28};
  font-weight: 500;
  text-align: center;
  color: var(--white);
  &:hover {
    box-shadow: var(--box-shadow);
  }

  &:is(:focus, :focus-within, :active) {
    outline: none;
  }

  &:disabled {
    padding: 0;
  }
`;

import styled, { css } from 'styled-components';

type TextProps = {
  $fw: number;
  $isApart?: boolean;
  $isFlexStart?: boolean;
  $isWithBorder?: boolean;
  $isColorGreen?: boolean;
};

export const Text = styled.p`
  ${({ theme }) => theme.mixins.fCenter};
  ${(props: TextProps) =>
    props.$isApart &&
    css`
      ${({ theme }) => theme.mixins.apart}
    `}
  ${(props: TextProps) =>
    props.$isFlexStart &&
    css`
      display: flex;
      justify-content: flex-start;
    `}
  gap: 10px;
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--black);

  strong {
    font-family: var(--font-roboto);
    font-weight: ${(props: TextProps) => props.$fw};
    word-break: break-word;

    ${(props: TextProps) =>
      props.$isWithBorder &&
      css`
        border-bottom: 2px solid var(--orange);
      `}

    ${(props: TextProps) =>
      props.$isColorGreen &&
      css`
        font-weight: 400;
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
  }
`;

import styled from 'styled-components';

type Props = {
  isWhite: boolean;
};

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.fCenter};
`;

export const Button = styled.button`
  height: 38px;
  width: 22px;
  background: none;
  border: none;

  svg {
    fill: ${(props: Props) =>
      props.isWhite ? 'var(--white)' : 'var(--white-black)'};
  }

  &:disabled {
    svg {
      opacity: 0.6;
    }
    cursor: not-allowed;
  }
`;

export const InformTitle = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: ${(props: Props) =>
    props.isWhite ? 'var(--white)' : 'var(--white-black)'};
`;

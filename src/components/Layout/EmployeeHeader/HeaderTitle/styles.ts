import styled from 'styled-components';

type TitleProps = {
  isWhite: boolean;
};

export const Title = styled.h1`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize48};
  color: ${(props: TitleProps) =>
    props.isWhite ? 'var(--white)' : 'var(--white-black)'};
`;

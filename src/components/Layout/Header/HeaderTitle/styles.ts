import styled from 'styled-components';

type TitleProps = {
  path: boolean;
};

export const Title = styled.h1`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize48};
  color: ${(props: TitleProps) =>
    props.path ? 'var(--white)' : 'var(--white-black)'};
`;

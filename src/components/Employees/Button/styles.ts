import styled from 'styled-components';

type WrapperProps = {
  $width: number;
};

export const Wrapper = styled.button`
  width: ${(props: WrapperProps) => `${props.$width}px`};
  height: 123px;
  padding: 38px 24px;
  border-radius: var(--border-radius);
  background: var(--white);
  border: 1px solid transparent;
  transition: var(--transition);
  ${({ theme }) => theme.mixins.fCenter};

  font-weight: 500;
  color: var(--white-black);
  ${({ theme }) => theme.mixins.fontSize40};
`;

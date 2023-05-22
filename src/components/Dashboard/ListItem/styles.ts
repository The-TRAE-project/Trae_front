import styled from 'styled-components';

export const Wrapper = styled.div`
  --mt: clamp(3.13rem, calc(-5.35rem + 9.93vw), 6.56rem);
  --c-gap: clamp(1.88rem, calc(0.33rem + 1.81vw), 2.5rem);
  --r-gap: clamp(3.75rem, calc(-0.1rem + 4.51vw), 5.31rem);

  margin-top: var(--mt);
  ${({ theme }) => theme.mixins.fCenter};
  flex-wrap: wrap;
  column-gap: var(--c-gap);
  row-gap: var(--r-gap);
`;

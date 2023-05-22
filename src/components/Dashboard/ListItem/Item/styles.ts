import styled from 'styled-components';

export const Wrapper = styled.div`
  --wd: clamp(21.25rem, calc(12rem + 10.83vw), 25rem);
  --ht: clamp(8.75rem, calc(-0.5rem + 10.83vw), 12.5rem);
  --pt: clamp(2.88rem, calc(1.95rem + 1.08vw), 3.25rem);
  --pb: clamp(3rem, calc(2.08rem + 1.08vw), 3.38rem);

  position: relative;
  width: var(--wd);
  height: var(--ht);
  ${({ theme }) => theme.mixins.fCenter};
  padding: var(--pt) 4px var(--pb);
  background: var(--gray-shadow);
  backdrop-filter: blur(40px);
  border-radius: var(--border-radius);

  @media (min-width: 1532px) {
    width: 355px;
  }

  @media (min-width: 1632px) {
    width: 345px;
  }

  @media (min-width: 1732px) {
    width: 354px;
  }

  @media ${({ theme }) => theme.bp.bpXlarge} {
    width: 400px;
  }
`;

export const Title = styled.p`
  --wd: clamp(18.75rem, calc(7.96rem + 12.64vw), 23.13rem);

  max-width: var(--wd);
  text-align: center;
  font-weight: 500;
  font-size: var(--fs-40);
  line-height: var(--fs-40-lh);
  color: var(--white);
`;

export const Quantity = styled.p`
  --fs-60: clamp(2.19rem, calc(-1.67rem + 4.51vw), 3.75rem);

  position: absolute;
  top: -35px;
  left: 20px;
  font-family: var(--font-roboto);
  font-weight: 400;
  font-size: var(--fs-60);
  line-height: 70px;
  color: var(--white2);
`;

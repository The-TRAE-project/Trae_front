import { css, keyframes } from 'styled-components';

const mixins = {
  apart: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  column: css`
    display: flex;
    flex-direction: column;
  `,

  center: css`
    display: flex;
    align-items: center;
  `,

  fCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  fontSize22: css`
    font-size: 22px;
    line-height: 26px;
  `,

  fontSize24: css`
    font-size: 24px;
    line-height: 28px;
  `,

  fontSize26: css`
    font-size: 26px;
    line-height: 30px;
  `,

  fontSize28: css`
    font-size: 28px;
    line-height: 33px;
  `,

  fontSize30: css`
    font-size: 30px;
    line-height: 35px;
  `,

  fontSize32: css`
    font-size: 32px;
    line-height: 38px;
  `,

  fontSize40: css`
    font-size: 40px;
    line-height: 47px;
  `,

  fontSize48: css`
    font-size: 48px;
    line-height: 56px;
  `,

  // components
  orangeCircle: css`
    height: 82px;
    width: 80px;
    font-family: var(--font-roboto);
    font-weight: 500;
    ${({ theme }) => theme.mixins.fontSize28};
    color: var(--white);
    ${({ theme }) => theme.mixins.fCenter};
    background-color: var(--orange);
    outline: 7px solid var(--green);
    border-radius: 50%;
  `,

  wrapper: css`
    position: relative;
    min-height: calc(100vh - 336px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
  `,

  // animations
  loader: keyframes`
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  `,
};

export default mixins;

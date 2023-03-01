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

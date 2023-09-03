import { css } from 'styled-components';

const variables = css`
  :root {
    --white: #ffff;
    --white2: #fcf8f8;
    --secondary-white: #fafafa;
    --secondary-white2: #fffefe;
    --white-gradient: rgba(255, 253, 253, 0.6);
    --black: #000000;
    --secondary-black: rgba(0, 0, 0, 0.54);
    --white-black: #2a302b;
    --black-shadow: rgba(0, 0, 0, 0.25);
    --black-gradient: rgba(255, 255, 255, 0);
    --dark-purple: rgba(27, 31, 59, 0.8);
    --orange: #ff9a4a;
    --orange2: rgba(255, 154, 74, 0.8);
    --red: #da1212;
    --red2: #f93c3c;
    --green: #42894d;
    --green2: rgba(131, 204, 140, 0.6);
    --green3: #68a56e;
    --gradient-green1: #508255;
    --gradient-green2: #419149;
    --gradient-green3: #367345;
    --light-green: #83cc8c;
    --light-green2: #8fb398;
    --gray: #909491;
    --gray2: rgba(144, 148, 145, 0.5);
    --gray-shadow: rgba(255, 255, 255, 0.2);

    --font-roboto: 'Roboto', sans-serif;
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;
    --border-radius: 15px;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.4s linear 0.2s;

    --fs-24: clamp(1.13rem, calc(0.2rem + 1.08vw), 1.5rem);
    --fs-24-lh: clamp(1.38rem, calc(0.45rem + 1.08vw), 1.75rem);
    --fs-28: clamp(1.38rem, calc(0.45rem + 1.08vw), 1.75rem);
    --fs-28-lh: clamp(1.88rem, calc(1.46rem + 0.49vw), 2.06rem);
    --fs-30: clamp(1.5rem, calc(0.58rem + 1.08vw), 1.88rem);
    --fs-30-lh: clamp(1.56rem, calc(0.18rem + 1.63vw), 2.19rem);
    --fs-40: clamp(1.56rem, calc(-0.75rem + 2.71vw), 2.5rem);
    --fs-40-lh: clamp(1.69rem, calc(-1.39rem + 3.61vw), 2.94rem);

    --fs-24-label: clamp(1.25rem, calc(0.7rem + 0.65vw), 1.5rem);
    --fs-24-label-lh: clamp(1.38rem, calc(2.58rem + -0.98vw), 1.75rem);

    --lgn-form-input-wd: clamp(23.06rem, calc(18.76rem + 5.04vw), 25rem);
    --lgn-form-input-ht: clamp(4.06rem, calc(2.95rem + 1.3vw), 4.56rem);
    --lgn-form-input-pd: clamp(0.94rem, calc(0.24rem + 0.81vw), 1.25rem);
    --lgn-form-label-pm: clamp(0.63rem, calc(0.49rem + 0.16vw), 0.69rem);

    --gap-40: clamp(1.88rem, calc(0.33rem + 1.81vw), 2.5rem);
    --gap-50: clamp(2.5rem, calc(0.96rem + 1.81vw), 3.13rem);

    --right-icon-wh: clamp(1.75rem, calc(0.78rem + 1.14vw), 2.19rem);
    --bg-white-card-ht: clamp(4.38rem, calc(2.99rem + 1.62vw), 4.94rem);
    --bg-white-card-ptb: clamp(1.38rem, calc(0.45rem + 1.08vw), 1.75rem);
    --bg-white-card-plr: clamp(1.5rem, calc(0.58rem + 1.08vw), 1.88rem);
    --checkbox-wd-th: clamp(1.56rem, calc(0.64rem + 1.08vw), 1.94rem);
    --checkbox-i-wd-ht: clamp(0.94rem, calc(0.32rem + 0.72vw), 1.19rem);
    --menu-ptb: clamp(1.13rem, calc(0.2rem + 1.08vw), 1.5rem);
    --menu-plr: clamp(1.5rem, calc(0.58rem + 1.08vw), 1.88rem);
  }
`;

export default variables;

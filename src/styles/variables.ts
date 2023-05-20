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
  }
`;

export default variables;

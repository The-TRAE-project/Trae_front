import { createGlobalStyle } from 'styled-components';
import variables from './variables';

const GlobalStyles = createGlobalStyle`
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    font-family: 'Raleway, sans-serif',
  }

  body {
    padding: 0;
    background: linear-gradient(
      264.53deg,
      var(--gradient-green1) 2.46%,
      var(--gradient-green2) 70.65%
    );

    margin: 0 calc(-1 * (100vw - 100%)) 0 0 !important;
    overflow-x: hidden;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  button {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
    
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: rgba(42, 48, 43, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 15px; 
    background-color: rgba(42, 48, 43, 0.4);
  }
`;

export default GlobalStyles;

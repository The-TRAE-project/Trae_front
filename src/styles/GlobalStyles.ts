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
    margin: 0;
    padding: 0;
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

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
  // react calendar timeline styles
  .react-calendar-timeline {
    width: 95%;
    overflow: hidden;
    background: var(--white);
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    padding: 36px 0px 10px 8px;
  }

  .react-calendar-timeline .rct-calendar-header {
    border: none!important;
  }

  .react-calendar-timeline .rct-header-root {
    background: var(--white) !important;
  }

  .react-calendar-timeline .rct-dateHeader {
    font-family: var(--font-roboto);
    font-size: 20px !important;
    font-weight: 500;
    color: var(--white);
    background: var(--orange) !important;
    border-bottom-color: var(--green) !important;
  }

  .react-calendar-timeline .rct-dateHeader-primary {
    font-weight: 700;
    line-height: 23px;
    padding: 6px 0;
    border: none !important;
    border-radius: 15px 15px 0px 0px;
    background: linear-gradient(97.03deg, var(--green) 7.5%, var(--gradient-green3) 94.35%) !important;
  }

  .react-calendar-timeline .rct-sidebar {
    border-right: 1px solid var(--green) !important;
  }

  .react-calendar-timeline .rct-vertical-lines .rct-vl {
    border-bottom: 1px solid var(--green) !important;
  }

  .react-calendar-timeline .rct-sidebar .rct-sidebar-row {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var(--black);
    text-align: center;
    border-bottom-color: var(--green) !important;

    &:first-child {
      border-top: 1px solid var(--green) !important;
    }
  }
  
  .react-calendar-timeline .rct-horizontal-lines .rct-hl-even {
    border-bottom-color: var(--green) !important;
  }

  .react-calendar-timeline .rct-horizontal-lines .rct-hl-odd  {
    border-bottom-color: var(--green) !important;
  }

  .shift-day {
    font-family: var(--font-roboto);
    font-weight: 400;
    font-size: 18px !important;
    text-align: center;
    color: var(--black) !important;
    border: none !important;
  }

  .auto-closed {
    font-weight: 500;
    color: var(--white) !important;
    background: var(--red) !important;
  }
`;

export default GlobalStyles;

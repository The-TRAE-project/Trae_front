import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  align-items: stretch;
  // react calendar timeline styles
  .react-calendar-timeline {
    width: 95%;
    overflow: hidden;
    background: var(--white);
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    padding: 36px 0px 10px 8px;
  }

  .react-calendar-timeline .rct-calendar-header {
    border: none !important;
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
    background: linear-gradient(
      97.03deg,
      var(--green) 7.5%,
      var(--gradient-green3) 94.35%
    ) !important;
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

  .react-calendar-timeline .rct-horizontal-lines .rct-hl-odd {
    border-bottom-color: var(--green) !important;
  }

  .shift-day {
    font-family: var(--font-roboto);
    font-weight: 400;
    font-size: 18px !important;
    text-align: center;
    color: var(--black) !important;
    border: none !important;
    background: transparent !important;
  }

  .auto-closed {
    font-weight: 500;
    color: var(--white) !important;
    background: var(--red) !important;
  }
`;

export const LeftSideWrapper = styled.div`
  position: relative;
`;

export const HorizontalDivider = styled.div`
  position: absolute;
  top: 30px;
  width: 105%;
  height: 1px;
  background: var(--green);
  transform: rotate(21.54deg);
`;

export const Title = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize20}
  color: var(--black);
  text-align: center;
`;

export const DateTitle = styled(Title)`
  position: absolute;
  top: 0;
  right: 23px;
`;

export const EmployeeTitle = styled(Title)`
  position: absolute;
  bottom: 2px;
  left: 0;
`;

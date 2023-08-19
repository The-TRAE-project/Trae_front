import styled from 'styled-components';

export const Wrapper = styled.section`
  width: fit-content;
  max-width: 100%;
  max-height: 535px;
  background: var(--white);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  padding: 36px 8px 10px 8px;
  display: flex;
  align-items: stretch;
`;

export const ScrollWrapper = styled.div`
  overflow: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;

  thead {
    background-color: var(--white);
    position: sticky;
    top: 0;
    z-index: 2;
  }

  thead th:first-child {
    position: sticky;
    background-color: var(--white);
    left: 0;
    z-index: 3;
  }

  tbody td:first-child {
    position: sticky;
    left: 0;
    background-color: var(--white);
    z-index: 1;
  }
`;

export const TableRow = styled.tr`
  height: 97px;
`;

export const TableCellContent = styled.p`
  font-family: var(--font-roboto);
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: var(--black);
`;

export const TableCell = styled.td`
  border: 1px solid grey;
  border-top: 2px solid var(--green);
  border-bottom: 2px solid var(--green);
  min-width: 31px;

  :first-child {
    width: 191px;
    border-right: 2px solid var(--green);
    border-left: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var(--black);
    text-align: center;
  }

  :last-child {
    border-left: 2px solid var(--green);
    border-right: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var(--black);
    text-align: center;
  }
`;

// TODO: better border for header cells
export const TableCellHeader = styled.th`
  padding: 0 1px;
  position: relative;

  :nth-child(-n + 5) {
    border-right: 2px solid var(--green);
    border-left: none;
    padding: 0;
  }
`;

export const TableMonthHeader = styled.div`
  height: 100%;
  font-weight: 700;
  line-height: 23px;
  padding: 6px 0;
  border: none;
  color: var(--white);
  border-radius: 15px 15px 0px 0px;
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
`;

export const TableDayHeader = styled.div`
  margin: auto;
  height: 47px;
  width: 31px;
  line-height: 47px;
  text-align: center;
  vertical-align: middle;
  font-family: var(--font-roboto);
  font-size: 20px;
  font-weight: 500;
  color: var(--white);
  background: var(--orange);
  border-bottom-color: var(--green);
`;

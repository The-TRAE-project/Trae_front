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
    z-index: 5;
  }
`;

export const TableRow = styled.tr`
  height: 97px;
`;

export const TableCellContent = styled.div`
  height: 95px;

  font-family: var(--font-roboto);
  font-weight: 400;
  font-size: 18px;
  display: flex;
  place-items: center;
  justify-content: center;

  position: absolute;
  left: 0;
  top: 0;
`;

export const TableCell = styled.td`
  border: 2px solid var(--green);
  background-color: var(--white);
  min-width: 31px;
  position: relative;

  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: var(--black);
  text-align: center;
`;

export const TableCellHeader = styled.th`
  padding: 0 1px;
  position: relative;
`;
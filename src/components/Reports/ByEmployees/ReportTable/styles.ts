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

    th:first-child {
      position: sticky;
      background-color: var(--white);
      left: 0;
      z-index: 3;
      min-width: 191px;
    }

    th:last-child {
      min-width: 50px;
      max-width: 50px;
    }
  }

  tbody td:first-child {
    position: sticky;
    left: 0;
    background-color: var(--white);
    z-index: 1;
    min-width: 191px;
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
  width: 31px;

  :has(> .autoClosed) {
    background-color: var(--red);
  }

  .autoClosed {
    color: var(--white);
  }

  :first-child {
    width: 191px;
    border-left: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var(--black);
    text-align: center;
  }

  :last-child {
    min-width: 50px;
    border-left: 2px solid var(--green);
    border-right: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var(--black);
    text-align: center;
  }
`;

export const TableCellHeader = styled.th`
  padding: 0 1px;
  position: relative;

  :nth-last-child(2) {
    padding: 0 0 0 1px;
  }
`;

export const TableStickyCellContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-right: 2px solid var(--green);
  width: 191px;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
`;

export const TableRightHeaderContent = styled.div`
  border-left: 2px solid var(--green);
  min-width: 50px;
  position: relative;
  left: -2px;
`;

interface TableMonthHeaderProps {
  $span: number;
}

export const TableMonthHeader = styled.div<TableMonthHeaderProps>`
  height: 100%;
  ${(props) => `width: ${props.$span * 32 + props.$span - 1}px;`}
  overflow: hidden;
  text-overflow: ellipsis;

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
  width: 100%;
  line-height: 47px;
  text-align: center;
  vertical-align: middle;
  font-family: var(--font-roboto);
  font-size: 20px;
  font-weight: 500;
  color: var(--white);
  background: var(--orange);
`;

export const HorizontalDivider = styled.div`
  position: absolute;
  top: 15px;
  left: 6px;
  width: 100%;
  height: 2px;
  background: var(--green);
  transform: rotate(20deg);
`;

export const Title = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize20}
  color: var(--black);
  text-align: center;
`;

export const DateTitle = styled(Title)`
  position: absolute;
  top: -15px;
  right: 23px;
`;

export const EmployeeTitle = styled(Title)`
  position: absolute;
  bottom: 4px;
  left: 3px;
`;

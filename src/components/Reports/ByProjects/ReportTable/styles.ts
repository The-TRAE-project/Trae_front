import styled from 'styled-components';

const rightPartTableWidths = (cellType: 'th' | 'td') => {
  const sizes = [50, 150, 100, 70, 200];

  let styles = '';

  sizes.forEach((width, index) => {
    styles += `${cellType}:nth-child(${index + 1}) {
      min-width: ${width}px;
      max-width: ${width}px;
      word-break: break-all;
      overflow-wrap: break-word;
      padding: 0;
      box-sizing: content-box;
    }`;
  });

  return styles;
};

const rightPartTableOffsets = (cellType: 'th' | 'td') => {
  const offsets = [0, 50, 200, 300, 370];

  let styles = '';

  offsets.forEach((offset, index) => {
    styles += `${cellType}:nth-child(${index + 1}) {
      left: ${offset}px;
    }`;
  });

  return styles;
};

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

    ${rightPartTableWidths('th')}
    ${rightPartTableOffsets('th')}

    th:nth-child(-n + 5) {
      position: sticky;
      background-color: var(--white);
      z-index: 6;
      padding: 0;
    }
  }

  tbody {
    ${rightPartTableWidths('td')}
    ${rightPartTableOffsets('td')}

    td:nth-child(-n + 5) {
      position: sticky;
      background-color: var(--white);
      z-index: 4;

      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: var(--black);
      text-align: center;
    }
  }
`;

export const TableRow = styled.tr`
  height: 97px;
`;

export const TableCellContent = styled.div<{
  $isEnded?: boolean;
  $inWork?: boolean;
  $readyToAcceptance?: boolean;
  $length?: number;
  $isEndDateInContract?: boolean;
}>`
  background-color: ${(props) => {
    if (props.$isEnded) {
      return 'var(--green2)';
    }
    if (props.$readyToAcceptance) {
      return 'var(--green)';
    }
    if (props.$inWork) {
      return 'var(--orange)';
    }
    if (props.$length) {
      return 'var(--white)';
    }
    return 'var(--grey2)';
  }};

  border: ${(props) =>
    !props.$isEnded &&
    !props.$readyToAcceptance &&
    !props.$inWork &&
    props.$length
      ? '2px solid var(--orange)'
      : ''};
  height: ${(props) => (props.$isEndDateInContract ? '29px' : '95px')};
  color: ${(props) =>
    props.$readyToAcceptance ? 'var(--white)' : 'var(--black)'};
  width: ${(props) => `${(props.$length ?? 1) * 33}px`};

  z-index: 3;
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

export const OverdueWrapper = styled.div<{
  $isOverdue?: boolean;
}>`
  overflow-x: hidden;
  ${(props) => {
    if (props.$isOverdue) {
      return `
        background-color: var(--white);
        border-radius: 10px;
        color: var(--red);
      `;
    }
    return '';
  }}
`;

export const TableStickyCellContent = styled.div<{
  $isOverdueByProject?: boolean;
  $isOverdueByOperations?: boolean;
}>`
  ${(props) => {
    if (props.$isOverdueByProject) return 'background-color: var(--red);';
    if (props.$isOverdueByOperations) return 'color: var(--red);';

    return '';
  }}

  border-right: 2px solid var(--green);
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  overflow-y: auto;

  display: flex;
  place-items: center;
  justify-content: center;
`;

export const TableCell = styled.td`
  border-top: 2px solid var(--green);
  border-bottom: 2px solid var(--green);
  background-color: var(--gray2);
  min-width: 31px;
  position: relative;
`;

export const TableCellHeader = styled.th`
  padding: 0 1px;
  position: relative;
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

export const TableDayHeader = styled.div<{
  $isToday?: boolean;
}>`
  margin: auto;
  height: 47px;
  width: 31px;
  line-height: 47px;
  text-align: center;
  vertical-align: middle;
  font-family: var(--font-roboto);
  font-size: 20px;
  font-weight: 500;

  ${(props) =>
    props.$isToday
      ? `color: var(--green);
  background: var(--white);`
      : `color: var(--white);
  background: var(--orange);`}
`;

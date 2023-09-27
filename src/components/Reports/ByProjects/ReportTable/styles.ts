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

export const TableCellContent = styled.div<{
  $isEnded?: boolean;
  $inWork?: boolean;
  $readyToAcceptance?: boolean;
  $length?: number | null;
  $isEndDateInContract?: boolean;
}>`
  background-color: ${(props) => {
    if (props.$isEnded) {
      return 'var(--light-green)';
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
  height: 95px;
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.$readyToAcceptance || props.$inWork
      ? 'var(--white)'
      : props.$isEnded
      ? 'var(--black)'
      : 'var(--orange)'};
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

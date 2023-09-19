import { IoIosArrowUp } from 'react-icons/io';
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: fit-content;
  width: 100%;
  max-height: 535px;
  background: var(--white);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  padding: 43px 40px 10px 40px;
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
  border-top: 2px solid var(--green);
  :nth-child(-n + 5) {
    border-right: 2px solid var(--green);
  }
  background-color: var(--white);
  min-width: 190px;
  position: relative;

  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: var(--black);
  text-align: center;
`;

export const TableCellHeader = styled.th`
  position: relative;

  :nth-child(-n + 5) {
    border-right: 2px solid var(--green);
  }
`;

export const SortButton = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  color: var(--black);
  text-align: center;
  font-family: var(--font-raleway);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

type SortArrowProps = { $isOpen: boolean };

export const SortArrow = styled(IoIosArrowUp)`
  position: relative;
  top: 5px;
  transform: ${(props: SortArrowProps) =>
    props.$isOpen ? 'rotate(0)' : 'rotate(180deg)'};
`;

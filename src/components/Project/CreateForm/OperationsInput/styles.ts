import { createStyles } from '@mantine/core';
import styled from 'styled-components';
import { IoIosArrowUp } from 'react-icons/io';

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.column};
  gap: 13px;
`;

export const Label = styled.p`
  ${({ theme }) => theme.mixins.fontSize24};
  font-weight: 400;
  color: var(--white);
  padding-left: 14px;
`;

export const DisplayInput = styled.div`
  position: relative;
  min-height: 73px;
  ${({ theme }) => theme.mixins.center};
  flex-wrap: wrap;
  column-gap: 22px;
  row-gap: 16px;
  padding: 11px 84px 11px 22px;
  background: var(--white);
  border-radius: var(--border-radius);

  input {
    display: none;
  }
`;

export const useMenuStyles = createStyles(() => ({
  dropdown: {
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    minWidth: 620,
    maxWidth: 620,
    minHeight: 438,
    padding: '30px 25px',
  },

  divider: {
    opacity: 0.5,
    border: '2px solid var(--gray)',
    marginTop: '0.95rem',
    marginBottom: '0.95rem',
  },
}));

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 21px;
  max-height: 240px;
  overflow: auto;
`;

export const ActiveCircle = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  ${({ theme }) => theme.mixins.fCenter};
  font-family: var(--font-roboto);
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: var(--white);
  background: var(--orange);
  border-radius: 20px;
`;

export const NotActiveCircle = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  border: 1.5px solid var(--gray);
  border-radius: 20px;
`;

type ArrowProps = {
  $isOpen?: boolean;
};

export const Arrow = styled(IoIosArrowUp)`
  position: absolute;
  right: 29px;
  transform: ${(props: ArrowProps) =>
    props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  color: var(--white-black);
`;

import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const Title = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--black);
  text-align: center;
`;

export const Group = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Divider = styled.div`
  width: 177px;
  position: absolute;
  top: 118px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border: 2px solid var(--gray2);
  transform: rotate(90deg);
`;

export const DateBadge = styled.p`
  width: 94px;
  height: 43px;
  ${({ theme }) => theme.mixins.fCenter};
  background: var(--orange2);
  border-radius: var(--border-radius);

  font-family: var(--font-roboto);
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize20};
  color: var(--white);
`;

export const useSelectMenuStyles = createStyles(() => ({
  dropdown: {
    background: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    minWidth: 620,
    maxWidth: 620,
    minHeight: 438,
    padding: '30px 25px',
    top: '130px !important',
  },

  divider: {
    opacity: 0.5,
    border: '2px solid var(--gray)',
    marginTop: '0.95rem',
    marginBottom: '0.95rem',
  },

  item: {
    padding: 0,
  },

  itemLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 11,
    fontSize: 22,
    lineHeight: '26px',
    fontWeight: 400,
    color: 'var(--white-black)',
  },
}));

export const SelectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0px;
  row-gap: 15px;
  max-height: 240px;
  overflow: auto;
`;

export const ExtraStageButton = styled.button`
  ${({ theme }) => theme.mixins.center};
  gap: 11px;
  border: none;
  background: none;

  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize22};
  color: var(--white-black);
  padding: 0;
`;

export const useExtraStageInputStyles = createStyles(() => ({
  label: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '23px',
    color: 'var(--white-black)',
    paddingLeft: 12,
    marginBottom: 8,
  },

  input: {
    width: '100%',
    minWidth: 277,
    maxWidth: 277,
    height: 40,
    minHeight: 40,
    padding: '8px 12px 9px',
    border: '1.5px solid var(--gray)',
    borderRadius: 'var(--border-radius)',
    fontFamily: 'var(--font-roboto)',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '23px',
    color: 'var(--black)',
  },

  error: {
    maxWidth: 277,
    fontFamily: 'var(--font-roboto)',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '18px',
    color: 'var(--red)',
  },

  rightSection: {
    right: 5,
    transform: 'rotate(180deg)',
  },

  itemsWrapper: {
    padding: 24,
    gap: 16,
  },

  dropdown: {
    background: 'var(--white)',
    boxShadow: '2px -1px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 'var(--border-radius)',
  },

  dropdownItem: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '23px',
    color: 'var(--white-black)',
    padding: 0,
  },
}));

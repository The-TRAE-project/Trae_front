import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 88px;
  width: 463px;
  margin-bottom: 180px;
`;

export const GroupForm = styled.form`
  position: relative;
  ${({ theme }) => theme.mixins.center};
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  position: absolute;
  right: 0;
  z-index: 2;
  height: 90px;
  width: 253px;
  width: 253px;
  padding: 25px 30px 28px;
  background: var(--orange);
  border: none;
  border-radius: var(--border-radius);

  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize30};
  text-align: center;
  color: var(--white);
`;

export const useTextInputStyles = createStyles(() => ({
  input: {
    position: 'absolute',
    top: -44,
    left: 0,
    zIndex: 1,
    minHeight: 88,
    maxHeight: 88,
    height: 88,
    width: 220,
    padding: '27px 30px 28px',
    border: 'none',
    borderRadius: '15px 0 0 15px',

    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: 28,
    lineHeight: '33px',
    textAlign: 'center',
    color: 'var(--white-black)',

    '&::focus': {
      outline: 'none',
    },
  },
}));

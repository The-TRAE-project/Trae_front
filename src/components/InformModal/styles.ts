import { createStyles } from '@mantine/core';
import styled from 'styled-components';

export const useModalStyles = createStyles(() => ({
  close: {
    color: 'var(--white-black)',
    opacity: 0.9,
    height: 30,
    width: 30,
    fontSize: 30,
    padding: 0,

    svg: {
      width: 30,
      height: 30,
    },
  },

  content: {
    position: 'relative',
    padding: '30px !important',
    background: 'var(--white)',
    boxShadow: '0px 6px 9px var(--black-shadow)',
    borderRadius: 10,
    height: 555,
  },

  header: {
    marginBottom: 4,
  },

  title: {
    fontFamily: 'var(--font-roboto)',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 48,
    lineHeight: '56px',
    color: 'var(--white-black)',
    opacity: 0.9,
  },

  body: {
    padding: '32px 0 !important',
    height: '40.5vh',
  },
}));

export const Title = styled.p`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  color: var(--white-black);
`;

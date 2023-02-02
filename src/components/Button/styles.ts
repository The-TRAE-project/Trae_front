import styled from 'styled-components';
import { mediaQueries } from '../../constants/breakpoints';

export const Wrapper = styled.button`
  font-family: 'Raleway';
  font-weight: 600;
  color: #2a302b;
  border-radius: 15px;
  background: #ffffff;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.4s linear;

  &:is(:hover, :focus, :active) {
    outline: none;
    border: 1px solid #2a302b;
    background: #2a302b;
    color: #ffffff;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: #ffffff;
    border: 1px solid transparent;
    color: #2a302b;
  }

  @media ${mediaQueries.mqMedium} {
    padding: 18px 30px;
    font-size: 1.9em;
    line-height: 1;
  }

  @media ${mediaQueries.mqLarge} {
    padding: 28px 50px;
    font-size: 2.2em;
    line-height: 1.1;
  }

  @media ${mediaQueries.mqXlarge} {
    padding: 38px 70px;
    font-size: 2.5em;
    line-height: 1.2;
  }
`;

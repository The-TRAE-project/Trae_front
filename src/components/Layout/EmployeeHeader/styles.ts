import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 40px;
    top: 36px;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;

  svg {
    @media ${({ theme }) => theme.bp.bpXlarge} {
      width: 50px;
      height: 50px;
    }
  }
`;

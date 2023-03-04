import styled from 'styled-components';

type DisplayProps = {
  isWhiteBlack: boolean;
};

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

export const DisplayGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 40px;
`;

export const DisplayTime = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  font-size: 54px;
  line-height: 63px;
  color: ${(props: DisplayProps) =>
    props.isWhiteBlack ? 'var(--white-black)' : 'var(--white)'};
  opacity: 0.9;
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 63px;
  text-align: center;
  color: ${(props: DisplayProps) =>
    props.isWhiteBlack ? 'var(--white-black)' : 'var(--white)'};
  opacity: 0.9;
`;

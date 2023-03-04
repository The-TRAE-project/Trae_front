import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: 158px;
  ${({ theme }) => theme.mixins.column};
  gap: 18px;
  align-items: center;
  padding: 22px 20px 24px;
  border-radius: 10px;
  background: var(--white);
  filter: drop-shadow(0px 4px 8px var(--black-shadow));

  &.completed {
    background: var(--light-green);
  }

  &.readyToAcceptance {
    background: linear-gradient(
      97.03deg,
      var(--green) 7.5%,
      var(--gradient-green3) 94.35%
    );
  }

  &.inWork {
    background: var(--orange);
  }
`;

export const StageName = styled.button`
  ${({ theme }) => theme.mixins.fCenter}
  padding: 12px 10px;
  width: 226px;
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28}
  text-align: center;
  color: var(--white);
  background-color: var(--orange);
  border: none;
  border-radius: 10px;
  cursor: not-allowed;

  &.completed {
    cursor: not-allowed;
    color: var(--white-black);
    background-color: var(--white);
  }

  &.readyToAcceptance {
    cursor: pointer;
    color: var(----white-black);
    background-color: var(--white);
  }

  &.inWork {
    cursor: not-allowed;
    color: var(----white-black);
    background-color: var(--white);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Employee = styled.p`
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  text-align: center;
  color: var(--white-black);
`;

export const StatusArrowDown = styled.div`
  position: absolute;
  bottom: -7.4rem;
`;

export const StatusArrowUp = styled.div`
  position: absolute;
  top: -7.4rem;
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 85%;
  height: max-content;
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
  position: relative;
  border: none;
  border-radius: 10px;

  font-family: var(--font-roboto);
  ${({ theme }) => theme.mixins.fontSize28};
  font-weight: 500;
  text-align: center;
  color: var(--white);
`;

export const ProjectInformation = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const Title = styled.span`
  color: var(--white);
  font-family: var(--font-raleway);
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const OperationsWrapper = styled.div`
  position: relative;
  min-height: 73px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 12px;
  padding: 11px 30px 11px 22px;
`;

export const Operation = styled.p`
  height: 51px;
  ${({ theme }) => theme.mixins.center};
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid var(--gray);
  border-radius: var(--border-radius);
  color: var(--white-black);
  background-color: var(--white);

  span {
    font-family: var(--font-roboto);
    ${({ theme }) => theme.mixins.fontSize22};
    font-weight: 500;
    white-space: nowrap;
  }
`;

export const OperationNumber = styled.span`
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

export const ProjectNumber = styled.p`
  ${({ theme }) => theme.mixins.orangeCircle};
  outline-color: var(--white);
  position: absolute;
  top: -17%;
  left: 10%;
  z-index: 2000;
`;

import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import {
  fColumn,
  fontSize28,
  fontSize30,
  fCenter,
} from '../../../helpers/cssFragments';

export const Wrapper = styled.div`
  position: relative;
  padding: 61px 20px 18px;
  background-color: ${colors.secondaryWhite};
  ${fColumn};
  gap: 0.9rem;
  border-radius: 15px;
  box-shadow: 0px 4px 6px ${colors.blackShadow};
  text-align: center;
`;

export const ProjectNumber = styled.p`
  height: 82px;
  width: 80px;
  font-family: 'Roboto, san-serif';
  font-weight: 500;
  ${fontSize28};
  color: ${colors.white};
  position: absolute;
  top: -16%;
  left: 0;
  right: 0;
  margin: 0 auto;
  ${fCenter};
  background-color: ${colors.orange};
  outline: 7px solid ${colors.green};
  border-radius: 50%;
`;

export const Employee = styled.p`
  font-weight: 400;
  color: ${colors.black};
  ${fontSize30};
  margin: 0;
`;

export const ProjectName = styled.p`
  font-weight: 600;
  ${fontSize30};
  color: ${colors.black};
  width: 182px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
`;

export const ProjectStatus = styled.p`
  font-weight: 600;
  ${fontSize30};
  color: ${colors.green};
  margin: 0;
`;

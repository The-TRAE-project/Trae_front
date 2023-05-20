import { ReactNode } from 'react';

import { Wrapper, ProjectNumber } from './styles';

interface Props {
  projectNumber: number;
  children: ReactNode;
}

const DetailsCard = ({ projectNumber, children }: Props) => {
  return (
    <Wrapper>
      <ProjectNumber>{projectNumber}</ProjectNumber>
      {children}
    </Wrapper>
  );
};

export default DetailsCard;

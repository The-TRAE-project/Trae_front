import { ReactNode } from 'react';
import { BsPencilFill } from 'react-icons/bs';

import { Button, CardBody, CardHeader, Wrapper } from './styles';

interface Props {
  title: string;
  children: ReactNode;
  onClick?: () => void;
  isWithEditButton?: boolean;
  lastFullWidth?: boolean;
}

const StageCard = ({
  title,
  children,
  onClick,
  isWithEditButton = true,
  lastFullWidth,
}: Props) => {
  return (
    <Wrapper $lastFullWidth={lastFullWidth}>
      <CardHeader>
        <span>{title}</span>
        {isWithEditButton && (
          <Button onClick={onClick} type="button">
            <BsPencilFill size={24} color="var(--orange)" />
          </Button>
        )}
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Wrapper>
  );
};

export default StageCard;

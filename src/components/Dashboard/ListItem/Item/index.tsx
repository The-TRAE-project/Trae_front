import { Quantity, Title, Wrapper } from './styles';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
}

const Item = ({ project }: Props) => {
  return (
    <Wrapper>
      <Quantity>{project.quantity}</Quantity>
      <Title>{project.title}</Title>
    </Wrapper>
  );
};

export default Item;

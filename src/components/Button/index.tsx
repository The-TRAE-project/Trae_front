import { Wrapper } from './styles';

interface Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ title, onClick, disabled }: Props) => {
  return (
    <Wrapper onClick={onClick} disabled={disabled}>
      {title}
    </Wrapper>
  );
};

export default Button;

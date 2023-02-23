import { Wrapper } from './styles';

interface Props {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  width: number;
}

const Button = ({ title, onClick, disabled, width }: Props) => {
  return (
    <Wrapper onClick={onClick} disabled={disabled} width={width}>
      {title}
    </Wrapper>
  );
};

export default Button;

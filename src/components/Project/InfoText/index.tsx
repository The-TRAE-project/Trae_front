import { Text } from './styles';

interface Props {
  label: string;
  text: string;
  fw?: number;
  isApart?: boolean;
  isFlexStart?: boolean;
  isWithBorder?: boolean;
  isColorGreen?: boolean;
}

const InfoText = ({
  label,
  text,
  fw,
  isApart,
  isFlexStart,
  isWithBorder,
  isColorGreen,
}: Props) => {
  return (
    <Text
      $fw={fw || 500}
      $isApart={isApart}
      $isFlexStart={isFlexStart}
      $isWithBorder={isWithBorder}
      $isColorGreen={isColorGreen}
    >
      <span>{label}</span>
      <strong>{text}</strong>
    </Text>
  );
};

export default InfoText;

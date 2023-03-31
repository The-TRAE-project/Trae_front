import { Label, Text, Stack } from './styles';

interface Props {
  label: string;
  text: string;
}

const DetailsCard = ({ label, text }: Props) => {
  return (
    <Stack>
      <Label>{label}</Label>
      <Text>{text || ''}</Text>
    </Stack>
  );
};

export default DetailsCard;

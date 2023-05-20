import { Label, Text, Stack, TextWrapper } from './styles';

interface Props {
  label: string;
  text: string;
}

const DetailsCard = ({ label, text }: Props) => {
  return (
    <Stack>
      <Label>{label}</Label>
      <TextWrapper>
        <Text>{text || ''}</Text>
      </TextWrapper>
    </Stack>
  );
};

export default DetailsCard;

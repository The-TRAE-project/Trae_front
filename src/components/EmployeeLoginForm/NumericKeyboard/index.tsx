import { useId, Dispatch, SetStateAction } from 'react';
import { FlexContainer, KeyboardBtn, Wrapper } from './styles';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  pinCode: string;
  setPinCode: Dispatch<SetStateAction<string>>;
}

const NumericKeyboard = ({ isOpen, onClose, pinCode, setPinCode }: Props) => {
  const keyboard = [
    {
      id: useId(),
      value: 1,
    },
    {
      id: useId(),
      value: 2,
    },
    {
      id: useId(),
      value: 3,
    },
    {
      id: useId(),
      value: 4,
    },
    {
      id: useId(),
      value: 5,
    },
    {
      id: useId(),
      value: 6,
    },
    {
      id: useId(),
      value: 7,
    },
    {
      id: useId(),
      value: 8,
    },
    {
      id: useId(),
      value: 9,
    },
    {
      id: useId(),
      value: 0,
    },
    {
      id: useId(),
      value: 'Удалить',
    },
  ];

  const handleOnChangeKeyboard = (value: number | string) => {
    setPinCode(String(...pinCode, value));
  };

  return (
    <Wrapper isOpen={isOpen}>
      <FlexContainer>
        {keyboard.map((keyboardIt) => (
          <KeyboardBtn
            key={keyboardIt.id}
            type="button"
            onClick={() => handleOnChangeKeyboard(keyboardIt.value)}
          >
            {keyboardIt.value}
          </KeyboardBtn>
        ))}
      </FlexContainer>
    </Wrapper>
  );
};

export default NumericKeyboard;

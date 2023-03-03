import { useEffect, useId, useState } from 'react';
import { FlexContainer, KeyboardBtn, Wrapper } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleOnKeyboardChange: (pinCode: string) => void;
  reset: () => void;
}

const NumericKeyboard = ({
  isOpen,
  onClose,
  handleOnKeyboardChange,
  reset,
}: Props) => {
  const [pinCode, setPinCode] = useState<string>('');

  const keyboard = [
    {
      id: useId(),
      value: 1,
      title: '1',
    },
    {
      id: useId(),
      value: 2,
      title: '2',
    },
    {
      id: useId(),
      value: 3,
      title: '3',
    },
    {
      id: useId(),
      value: 4,
      title: '4',
    },
    {
      id: useId(),
      value: 5,
      title: '5',
    },
    {
      id: useId(),
      value: 6,
      title: '6',
    },
    {
      id: useId(),
      value: 7,
      title: '7',
    },
    {
      id: useId(),
      value: 8,
      title: '8',
    },
    {
      id: useId(),
      value: 9,
      title: '9',
    },
    {
      id: useId(),
      value: 0,
      title: '0',
    },
    {
      id: useId(),
      value: 'Delete',
      title: 'Удалить',
    },
  ];

  const handleReset = () => {
    reset();
    setPinCode('');
  };

  const handleOnChange = (value: number | string) => {
    if (value === 'Delete') {
      handleReset();
      return;
    }
    setPinCode((prevPinCode) => prevPinCode + value);
  };

  useEffect(() => {
    handleOnKeyboardChange(String(pinCode));

    if (pinCode.length === 3) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinCode]);

  return (
    <Wrapper isOpen={isOpen}>
      <FlexContainer>
        {keyboard.map((keyboardIt) => (
          <KeyboardBtn
            key={keyboardIt.id}
            type="button"
            onClick={() => handleOnChange(keyboardIt.value)}
          >
            {keyboardIt.title}
          </KeyboardBtn>
        ))}
      </FlexContainer>
    </Wrapper>
  );
};

export default NumericKeyboard;

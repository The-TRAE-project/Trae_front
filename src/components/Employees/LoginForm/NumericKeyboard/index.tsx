import { Dispatch, useEffect, useId, SetStateAction } from 'react';
import { FlexContainer, KeyboardBtn, Wrapper } from './styles';

interface Props {
  pinCode: string;
  setPinCode: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  onClose: () => void;
  handleOnKeyboardChange: (pinCode: string) => void;
  reset: () => void;
}

const NumericKeyboard = ({
  pinCode,
  setPinCode,
  isOpen,
  onClose,
  handleOnKeyboardChange,
  reset,
}: Props) => {
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

  const handleOnChange = (value: number | string) => {
    if (value === 'Delete') {
      reset();
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

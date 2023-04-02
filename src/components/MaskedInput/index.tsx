import { Ref } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { IMaskMixin } from 'react-imask';

const MaskedTextInput = IMaskMixin(
  ({
    inputRef,
    ...props
  }: TextInputProps & { inputRef?: Ref<HTMLInputElement> }) => (
    <TextInput {...props} ref={inputRef} />
  )
);

export default MaskedTextInput;

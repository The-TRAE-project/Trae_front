import { Ref } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IMaskMixin } from 'react-imask';

const MaskedTextInput = IMaskMixin(
  ({
    inputRef,
    ...props
  }: TextInputProps & { inputRef?: Ref<HTMLInputElement> }) => (
    <TextInput
      {...props}
      ref={inputRef} // bind internal input (if you use styled-components V4, use "ref" instead "innerRef")
    />
  )
);

export default MaskedTextInput;

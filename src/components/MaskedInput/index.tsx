import { Ref } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { IMaskMixin } from 'react-imask';

const MaskedTextInput = IMaskMixin(
  ({
    inputRef,
    ...props
  }: TextInputProps & { inputRef?: Ref<HTMLInputElement> }) => (
    <TextInput
      {...props}
      ref={inputRef}
      styles={{
        label: {
          fontWeight: 400,
          fontSize: 24,
          lineHeight: '28px',
          color: 'var(--white)',
          marginBottom: 13,
          paddingLeft: 14,
        },

        input: {
          minHeight: 73,
          height: 73,
          background: 'var(--white)',
          border: 'none',
          borderRadius: 'var(--border-radius)',
          padding: '20px 12px',
          fontFamily: 'var(--font-roboto)',
          fontWeight: 500,
          fontSize: 28,
          lineHeight: '33px',
          color: 'var(--white-black)',

          '&::focus': {
            outline: 'none',
          },
        },

        error: {
          fontSize: 24,
          lineHeight: '26px',
          wordBreak: 'break-word',
        },
      }}
    />
  )
);

export default MaskedTextInput;

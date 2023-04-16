import { forwardRef, Ref } from 'react';
import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core';

const TextInput = forwardRef(
  ({
    inputRef,
    ...props
  }: TextInputProps & { inputRef?: Ref<HTMLInputElement> }) => (
    <MantineTextInput
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
          fontFamily: 'var(--font-roboto)',
          fontSize: 24,
          fontWeight: 500,
          lineHeight: '26px',
          wordBreak: 'break-word',
          color: 'var(--red)',
          letterSpacing: '1px',
        },
      }}
    />
  )
);

TextInput.displayName = 'TextInput';

export default TextInput;

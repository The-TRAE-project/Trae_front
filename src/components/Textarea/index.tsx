import { forwardRef, Ref } from 'react';
import { Textarea as MantineTextarea, TextareaProps } from '@mantine/core';

const Textarea = (props: TextareaProps, ref: Ref<HTMLTextAreaElement>) => (
  <MantineTextarea
    {...props}
    ref={ref}
    autosize
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
        height: 'auto !important',
        background: 'var(--white)',
        border: 'none',
        borderRadius: 'var(--border-radius)',
        padding: '20px 12px !important',
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
);

Textarea.displayName = 'Textarea';

export default forwardRef(Textarea);

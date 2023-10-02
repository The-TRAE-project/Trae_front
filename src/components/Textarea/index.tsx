import { forwardRef, Ref } from 'react';
import { Textarea as MantineTextarea, TextareaProps } from '@mantine/core';

const Textarea = (props: TextareaProps, ref: Ref<HTMLTextAreaElement>) => (
  <MantineTextarea
    {...props}
    ref={ref}
    autosize
    styles={{
      label: {
        oder: 2,
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

      wrapper: {
        order: 3,
      },

      root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      },

      error: {
        order: 1,

        position: 'relative',
        right: '0px',
        alignSelf: 'end',

        width: 'fit-content',
        minHeight: '35px',
        padding: '8px 10px',

        backgroundColor: 'var(--white)',
        borderRadius: '15px',
        fontFamily: 'var(--font-roboto)',
        fontSize: 24,
        fontWeight: 500,
        lineHeight: '26px',
        wordBreak: 'break-word',
        color: 'var(--red)',
        letterSpacing: '1px',

        '&::after': {
          content: `url("data:image/svg+xml,%3Csvg width='25' height='9' viewBox='0 0 25 9' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M11 9C9 3 2.83333 0.5 0 0H24.5L11 9Z' fill='white' /%3E%3C/svg%3E")`,
          position: 'absolute',
          bottom: '-14px',
          left: '30%',
        },
      },
    }}
  />
);

Textarea.displayName = 'Textarea';

export default forwardRef(Textarea);

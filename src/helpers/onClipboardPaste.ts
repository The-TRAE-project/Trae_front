import { ClipboardEvent } from 'react';

export const onClipboardPaste = (
  event: ClipboardEvent<HTMLInputElement>,
  fn: (value: string) => void
) => {
  const clipboardData = event.clipboardData.getData('Text');
  fn(clipboardData);
};

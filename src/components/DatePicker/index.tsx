import { Indicator } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { FC } from 'react';

import { useDateInputStyles, useIndicatorStyles } from './styles';

interface Props {
  title: string;
  disabled?: boolean;
}

const DatePicker: FC<Props> = ({ title, disabled = false, ...props }) => {
  const {
    classes: {
      root,
      input,
      label,
      error,

      calendarHeaderControl,
      calendarHeaderLevel,
      weekday,
      day,
      rightSection,
    },
  } = useDateInputStyles();
  const {
    classes: { indicator },
  } = useIndicatorStyles();

  return (
    <DatePickerInput
      {...props}
      label={title}
      disabled={disabled}
      placeholder="Выберите дату"
      clearable
      valueFormat="DD.MM.YYYY"
      classNames={{
        root,
        calendarHeaderControl,
        calendarHeaderLevel,
        weekday,
        day,
        label,
        input,
        error,
        rightSection,
      }}
      renderDay={(date) => {
        const data = date.getDate();

        return (
          <Indicator
            size={6}
            color="red"
            position="bottom-center"
            disabled={data !== new Date().getDate()}
            classNames={{ indicator }}
          >
            <div>{data}</div>
          </Indicator>
        );
      }}
    />
  );
};

export default DatePicker;

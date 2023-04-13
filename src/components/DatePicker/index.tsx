import { Indicator } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { FC } from 'react';

import { useDateInputStyles, useIndicatorStyles } from './styles';

interface Props {
  defaultValue?: DateValue;
  title: string;
}

const DatePicker: FC<Props> = ({ defaultValue, title, ...props }) => {
  const {
    classes: {
      input,
      label,
      error,
      wrapper,
      calendar,
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
      defaultValue={defaultValue}
      label={title}
      placeholder="Выберите дату"
      clearable
      valueFormat="DD.MM.YYYY"
      classNames={{
        wrapper,
        calendar,
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

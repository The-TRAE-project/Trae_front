import { DatePickerInput } from '@mantine/dates';

import { useDateInputStyles } from './styles';

interface Props {
  defaultValue?: Date;
}

const DatePicker = ({ defaultValue, ...props }: Props) => {
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

  return (
    <DatePickerInput
      {...props}
      defaultValue={defaultValue}
      label="Дата регистрации"
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
    />
  );
};

export default DatePicker;

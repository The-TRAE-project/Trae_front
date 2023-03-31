import { DatePickerInput } from '@mantine/dates';

import { useDateInputStyles } from '../../../styles';
import { useSelectStyles, useTextInputStyles } from '../styles';

const DatePicker = ({ ...props }) => {
  const {
    classes: { label, error },
  } = useTextInputStyles();
  const {
    classes: { selectInput },
  } = useSelectStyles();
  const {
    classes: {
      wrapper,
      calendar,
      calendarHeaderControl,
      calendarHeaderLevel,
      weekday,
      day,
      dataInputRightSection,
    },
  } = useDateInputStyles();

  return (
    <DatePickerInput
      {...props}
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
        input: selectInput,
        error,
        rightSection: dataInputRightSection,
      }}
    />
  );
};

export default DatePicker;

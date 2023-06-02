/* eslint-disable react/prop-types */
import { Box } from '@mantine/core';
import {
  ReactCalendarItemRendererProps,
  TimelineItemBase,
} from 'react-calendar-timeline';

interface Props {
  props: ReactCalendarItemRendererProps<TimelineItemBase<number>>;
}

const ItemRenderer = ({ props }: Props) => {
  const { item, getItemProps } = props;

  return (
    <Box
      {...getItemProps({
        style: {
          borderRadius: 0,
        },
      })}
      sx={{
        height: 30,
        minHeight: 30,
      }}
    >
      {item.title}
    </Box>
  );
};

export default ItemRenderer;

import { useEffect, useState } from 'react';
import Timeline, {
  TimelineHeaders,
  DateHeader,
  ReactCalendarItemRendererProps,
  TimelineItemBase,
} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import 'moment/locale/ru';

import { ProjectInfo } from '../../../../../store/apis/reports/types';
import ItemRenderer from './ItemRenderer';
import { convertToDate } from '../../../../../helpers/convertToDate';

moment().locale('ru');

interface Props {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  projects: ProjectInfo[];
}

interface TimeLineGroup {
  id: string;
  title: string;
  rightTitle: string;
  bgColor: string;
}

interface TimeLineItem {
  id: string;
  group: string;
  title: string;
  start: number;
  end: number;
  className: string;
}

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

const TimelineCalendar = ({
  defaultTimeStart,
  defaultTimeEnd,
  projects,
}: Props) => {
  const [groups, setGroups] = useState<TimeLineGroup[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<TimeLineItem[] | any>([]);

  useEffect(() => {
    const modifiedGroups = projects.map((item) => ({
      id: String(item.id),
      title: '',
      rightTitle: '',
      bgColor: 'var(--white)',
    }));

    setGroups(modifiedGroups);

    const modifiedItems = projects
      .map((it) => {
        return it.operations.map((op) => {
          return {
            id: String(op.id),
            group: String(it.id),
            title: `${op.name}`,
            start: convertToDate(op.startDate).getTime(),
            end: convertToDate(op.plannedEndDate).getTime(),
            className: 'shift-day auto-closed',
          };
        });
      })
      .flat();
    setItems(modifiedItems);
  }, [projects]);

  const handleItemRenderer = (
    props: ReactCalendarItemRendererProps<TimelineItemBase<number>>
  ) => {
    return <ItemRenderer props={props} />;
  };

  const onTimeChange = (
    start: number,
    end: number,
    updateScrollCanvas: any
  ) => {
    updateScrollCanvas(start, end, true);
  };

  return (
    <Timeline
      groups={groups}
      items={items}
      keys={keys}
      sidebarContent={<div>Above The Left</div>}
      // itemsSorted={true}
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      // showCursorLine
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      lineHeight={99}
      itemRenderer={handleItemRenderer}
      onTimeChange={onTimeChange}
    >
      <TimelineHeaders className="sticky">
        <DateHeader unit="primaryHeader" height={35} />
        <DateHeader height={35} />
      </TimelineHeaders>
    </Timeline>
  );
};

export default TimelineCalendar;

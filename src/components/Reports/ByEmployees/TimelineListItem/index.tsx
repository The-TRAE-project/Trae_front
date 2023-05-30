import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

import { convertToDate } from '../../../../helpers/convertToDate';
import {
  ShortEmployeeInfo,
  ShortWorkingShiftInfo,
} from '../../../../store/apis/reports/types';
import {
  LeftSideWrapper,
  HorizontalDivider,
  DateTitle,
  EmployeeTitle,
  RightSideWrapper,
  Title,
  TotalListItem,
  TotalTitle,
} from './styles';

interface Props {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  employeeGroups: ShortEmployeeInfo[];
  employeeItems: ShortWorkingShiftInfo[];
}

interface Group {
  id: string;
  title: string;
  rightTitle: string;
  bgColor: string;
}

interface Item {
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

const TimelineListItem = ({
  defaultTimeStart,
  defaultTimeEnd,
  employeeGroups,
  employeeItems,
}: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<Item[] | any>([]);

  useEffect(() => {
    const modifiedGroups = employeeGroups.map((item) => ({
      id: String(item.id),
      title: `${item.firstName} ${item.lastName}`,
      rightTitle: `${item.firstName} ${item.lastName}`,
      bgColor: 'var(--white)',
    }));

    setGroups(modifiedGroups);

    const modifiedItems = employeeItems.map((item) => ({
      id: String(item.employeeId),
      group: String(item.employeeId),
      title: `${item.partOfShift}`,
      start: convertToDate(item.shiftDate).getTime(),
      end: dayjs(convertToDate(item.shiftDate))
        .add(24, 'hours')
        .toDate()
        .getTime(),
      className: item.autoClosed ? 'shift-day auto-closed' : 'shift-day',
    }));
    setItems(modifiedItems);
  }, [employeeGroups, employeeItems]);

  return (
    <Timeline
      groups={groups}
      items={items}
      keys={keys}
      rightSidebarWidth={64}
      rightSidebarContent={<div>Above The Right</div>}
      sidebarContent={<div>Above The Left</div>}
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      lineHeight={99}
    >
      <TimelineHeaders className="sticky">
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <LeftSideWrapper {...getRootProps()}>
                <HorizontalDivider />
                <DateTitle>Дата</DateTitle>
                <EmployeeTitle>Сотрудник</EmployeeTitle>
              </LeftSideWrapper>
            );
          }}
        </SidebarHeader>
        <SidebarHeader variant="right">
          {({ getRootProps }) => {
            return (
              <RightSideWrapper {...getRootProps()}>
                <Title>Итого смен</Title>
                <TotalListItem>
                  {/* <TotalTitle>fefef</TotalTitle>
                  <TotalTitle>fefefdfsd</TotalTitle>
                  <TotalTitle>fefefdsfd</TotalTitle> */}
                </TotalListItem>
              </RightSideWrapper>
            );
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  );
};

export default TimelineListItem;

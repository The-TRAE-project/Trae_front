import { useState, useEffect } from 'react';
import { Group } from '@mantine/core';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import dayjs from 'dayjs';

import { convertToDate } from '../../../../helpers/convertToDate';
import {
  ShortEmployeeInfo,
  EmployeeWorkingShiftInfo,
  EmployeeTotalShiftInfo,
} from '../../../../store/apis/reports/types';
import RightSideBar from './RightSideBar';
import {
  LeftSideWrapper,
  HorizontalDivider,
  DateTitle,
  EmployeeTitle,
} from './styles';

interface Props {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  employees: ShortEmployeeInfo[];
  employeeWorkingShifts: EmployeeWorkingShiftInfo[];
  employeeTotalShifts: EmployeeTotalShiftInfo[];
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

const TimelineListItem = ({
  defaultTimeStart,
  defaultTimeEnd,
  employees,
  employeeWorkingShifts,
  employeeTotalShifts,
}: Props) => {
  const [groups, setGroups] = useState<TimeLineGroup[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<TimeLineItem[] | any>([]);

  useEffect(() => {
    const modifiedGroups = employees.map((item) => ({
      id: String(item.id),
      title: `${item.firstName} ${item.lastName}`,
      rightTitle: `${item.firstName} ${item.lastName}`,
      bgColor: 'var(--white)',
    }));

    setGroups(modifiedGroups);

    const modifiedItems = employeeWorkingShifts.map((item) => ({
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
  }, [employees, employeeWorkingShifts]);

  return (
    <Group spacing={0}>
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
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
          <DateHeader unit="primaryHeader" height={35} />
          <DateHeader height={35} />
        </TimelineHeaders>
      </Timeline>
      <RightSideBar totalShifts={employeeTotalShifts} />
    </Group>
  );
};

export default TimelineListItem;

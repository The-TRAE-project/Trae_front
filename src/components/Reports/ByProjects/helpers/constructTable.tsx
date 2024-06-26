import {
  CellContext,
  ColumnDef,
  Row,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs , { Dayjs } from 'dayjs';
import classNames from 'classnames';
import { ProjectsReportTableData } from '../ReportTable';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToDate } from '../../../../helpers/convertToDate';
import { convertToString } from '../../../../helpers/convertToString';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import { calculateDeviation } from '../../helpers/calculateDeviation';
import { getCeilLength } from './getCeilLength';
import { getOperationDateRange } from './getOperationDateRange';
import { getProjectDaysOverdue } from './getProjectDaysOverdue';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { DateCell } from '../ReportTable/DateCell/DateCell';
import styles from '../ReportTable/ReportTable.module.scss';
import { TableMonthHeader } from '../ReportTable/styles';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export interface OperationCellInfo {
  projectId: number;
  id: number;
  name: string;
  length: number | null;
  inWork: boolean;
  isEnded: boolean;
  readyToAcceptance: boolean;
  isOverdue: boolean;
  isOverlapping: boolean;
  isEndDateInContract: boolean;
}

export interface NumberCellInfo {
  number: number;
  isOverdueByOperations: boolean;
  isOverdueByProject: boolean;
  projectIsEnded: boolean;
}

export interface TableData {
  [key: string]:
    | string
    | number
    | null
    | Partial<OperationCellInfo>
    | NumberCellInfo
    | OperationCellInfo;
}

function constructTableData(data: ProjectsReportTableData) {
  const todayDate = dayjs().format('YYYY-MM-DD');
  const datesArray = getDatesBetween(data.dateStart, data.dateEnd);

  return data.projects.map((project) => {
    const {
      name,
      number,
      comment,
      customer,
      id: projectId,
      endDateInContract,
      operationPeriod,
      operations,
    } = project;
    const endDateInContractAsString = convertToString(endDateInContract);

    const shippingOperation = operations.find(
      (op) => op.name === 'Отгрузка'
    ) as ProjectOperation;
    let realEndDate: number[] | undefined;
    if (shippingOperation.isEnded && !shippingOperation.acceptanceDate) {
      realEndDate = shippingOperation.realEndDate as number[];
    } else if (shippingOperation.isEnded || shippingOperation.inWork) {
      realEndDate = shippingOperation.acceptanceDate as number[];
    } else {
      realEndDate = shippingOperation.startDate;
    }
    let deviation = -0;    
    let isOverdueByOperations = false;
    const row: TableData = {};

    datesArray.forEach((date) => {
		const isEndDateInContract = endDateInContractAsString === date;
		row[date] = { isEndDateInContract, projectId };
    });

	//	--getProjectDaysOverdue
	var overdueDays:number = getProjectDaysOverdue (operations);
	/*
	console.log(
		"Project number: "+project.number
		+"; isEnded: "+project.isEnded
		+"; ContractDate: "+convertToDayjs(project.endDateInContract).format("YYYY-MM-DD")
		+"; overdue days: "+overdueDays
	);
	*/
	
	var maxPlannedEndDate:Dayjs = convertToDayjs(project.endDateInContract);	
	operations.forEach((currentOperation, operationIndex) => {		
		var operationDateRange:Dayjs[] = getOperationDateRange(currentOperation, overdueDays)!;
		var startDate:Dayjs = operationDateRange[0];
		var plannedEndDate:Dayjs = operationDateRange[1];
		maxPlannedEndDate = (plannedEndDate.isAfter(maxPlannedEndDate) ? plannedEndDate : maxPlannedEndDate);
	  	  
        const isOverdue =
        (currentOperation.isEnded &&
          plannedEndDate.isBefore(
            convertToDayjs(currentOperation.realEndDate as number[])
          )) ||
        ((currentOperation.inWork || currentOperation.readyToAcceptance) &&
          plannedEndDate.isBefore(todayDate));

      isOverdueByOperations = isOverdue ? true : isOverdueByOperations;
      
		/*console.log(
			"Operation: "+currentOperation.name
			+"; planedStartDate: "+convertToString(currentOperation.startDate)
			+"; plannedEndDate: "+ convertToString(currentOperation.plannedEndDate)
			+"; newStartDate: "+startDate.format("YYYY-MM-DD")			
			+"; newPlannedEndDate: "+ plannedEndDate.format("YYYY-MM-DD")
			+"; realEndDate: "+ (currentOperation.realEndDate ? convertToString(currentOperation.realEndDate) : '')
		);
		*/
	  
      const isInReport = row[startDate.format('YYYY-MM-DD')] !== undefined;

      if (isInReport) {
        const nextOperation = operations.find((op) => {
          return (
            op.priority >= currentOperation.priority &&
            convertToDayjs(op.startDate).isAfter(
              convertToDayjs(currentOperation.startDate)
            )
          );
        });
        const length =
          operationIndex === operations.length - 1
            ? 1
            : getCeilLength(               
				startDate,
				plannedEndDate,
				convertToDayjs(data.dateStart),
				convertToDayjs(data.dateEnd)
              );
        const isEndDateInContract = endDateInContractAsString === startDate.format('YYYY-MM-DD');

        const isOverlapping =
          (row[startDate.format('YYYY-MM-DD')] as Partial<OperationCellInfo>).id !== undefined;

        row[startDate.format('YYYY-MM-DD')] = {
          isEndDateInContract,
          projectId,
          id: currentOperation.id,
          inWork: currentOperation.inWork,
          isEnded: currentOperation.isEnded,
          readyToAcceptance: currentOperation.readyToAcceptance,
          name: currentOperation.name,
          isOverdue,
          isOverlapping,
          length,
        };
      }
    });
	deviation = (maxPlannedEndDate.isAfter(convertToDayjs(project.endDateInContract)) ? 
		maxPlannedEndDate.diff(convertToDayjs(project.endDateInContract), 'd') :
		convertToDayjs(project.endDateInContract).diff(maxPlannedEndDate, 'd')
	);
	const isOverdueByProject = convertToDayjs(endDateInContract).isBefore(maxPlannedEndDate,'d');
	const projectIsEnded:boolean = project.isEnded;
	//console.log("isOverdueByProject: "+isOverdueByProject);
	//console.log("isEnded: "+project.isEnded);
	//console.log("endDateInContract: "+convertToDayjs(project.endDateInContract).format("YYYY-MM-DD")+"; maxPlannedEndDate: "+maxPlannedEndDate.format("YYYY-MM-DD"));
	//console.log("deviation: "+deviation);
	//console.log("-----------------------------------------------");
	
	
    row.name = name;
    row.number = { number, isOverdueByOperations, isOverdueByProject, projectIsEnded};
    row.comment = comment;
    row.customer = customer;
    row.deviation = deviation;
    row.contractDate = endDateInContractAsString;
    row.shipmentDate = convertToString(project.plannedEndDate);

    return row;
  });
}

function constructTableColumns(dateStart: number[], dateEnd: number[]) {
  function constructDateColumns() {
    let currentDate = convertToDayjs(dateStart);
    const lastDate = convertToDayjs(dateEnd);
    const todayDate = dayjs();

    const result: ColumnDef<TableData>[] = [];

    while (!currentDate.isAfter(lastDate, 'day')) {
      const currentMonth = currentDate.month();
      const currentYear = currentDate.year();

      const columnsForDays: {
        accessorKey: string;
        header: () => JSX.Element;
        cell: (info: CellContext<TableData, OperationCellInfo>) => JSX.Element;
      }[] = [];

      const length =
        currentMonth === lastDate.month() && currentYear === lastDate.year()
          ? lastDate.date() - currentDate.date() + 1
          : currentDate.daysInMonth() - currentDate.date() + 1;

      for (let i = 0; i < length; i += 1) {
        const currentDay = currentDate.date();
        const isToday = currentDate.isSame(todayDate, 'day');

        columnsForDays.push({
          accessorKey: currentDate.format('YYYY-MM-DD'),
          header: () => (
            <div
              className={`${styles.table__header_day} ${
                isToday ? styles.table__header_day__today : ''
              }`}
            >
              {currentDay}
            </div>
          ),
          cell: (info: CellContext<TableData, OperationCellInfo>) => (
            <DateCell
              isEndDateInContract={info.getValue().isEndDateInContract}
              isEnded={info.getValue().isEnded}
              isOverdue={info.getValue().isOverdue}
              inWork={info.getValue().inWork}
              readyToAcceptance={info.getValue().readyToAcceptance}
              isOverlapping={info.getValue().isOverlapping}
              projectId={info.getValue().projectId}
              length={info.getValue().length}
              name={info.getValue().name}
            />
          ),
        });

        currentDate = currentDate.add(1, 'day');
      }

      result.push({
        id: `${currentYear}-${currentMonth}`,
        header: () => (
          <TableMonthHeader $span={columnsForDays.length}>
            {convertMonthToString(currentMonth)}
          </TableMonthHeader>
        ),
        columns: columnsForDays,
      });
    }

    return result;
  }

  const columnHelper = createColumnHelper<TableData>();

  const columns = [
    columnHelper.accessor('number', {
      header: () => <div className={styles.table__stickyCell}>№</div>,
      id: 'number',
      sortingFn: (
        rowA: Row<TableData>,
        rowB: Row<TableData>,
        columnId: string
      ): number => {
        const aValue = rowA.getValue(columnId) as NumberCellInfo;
        const bValue = rowB.getValue(columnId) as NumberCellInfo;
        // eslint-disable-next-line no-nested-ternary
        return aValue.number < bValue.number
          ? -1
          : aValue.number === bValue.number
          ? 0
          : 1;
      },
      cell: (info: CellContext<TableData, NumberCellInfo>) => {		
		//console.log("getValue: "+JSON.stringify(info.getValue())); 
        return (
          <div
            className={classNames(
				styles.table__stickyCell,
				info.getValue().projectIsEnded ? styles.table__stickyCell_finishedProject : (				
					info.getValue().isOverdueByProject ? styles.table__stickyCell_overdueProject : (
						info.getValue().isOverdueByOperations ? styles.table__stickyCell_overdueOperations : ''
					)
			    )                
            )}
          >
            {info.getValue()?.number}			
          </div>
        );
      },
    }),
    columnHelper.accessor('customer', {
      header: () => <div className={styles.table__stickyCell}>Клиент</div>,
      id: 'customer',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('name', {
      header: () => <div className={styles.table__stickyCell}>Изделие</div>,
      id: 'name',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('deviation', {
      header: () => (
        <div
          className={classNames(
            styles.table__stickyCell,
            styles.table__stickyCell_deviation
          )}
        >
          Отклонение
        </div>
      ),
      id: 'deviation',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('comment', {
      header: () => <div className={styles.table__stickyCell}>Комментарий</div>,
      id: 'comment',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    ...constructDateColumns(),

    columnHelper.accessor('contractDate', {
      header: '1',
      id: 'contractDate',
      enableHiding: true,
    }),

    columnHelper.accessor('shipmentDate', {
      header: '2',
      id: 'shipmentDate',
      enableHiding: true,
    }),
  ];

  return columns;
}

export function constructTable(
  props: ProjectsReportTableData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [TableData[], ColumnDef<TableData, any>[]] {
  const data = constructTableData(props);
  const columns = constructTableColumns(props.dateStart, props.dateEnd);

  return [data, columns];
}

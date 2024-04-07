import dayjs , { Dayjs } from 'dayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';
import { getOperationStartDate } from './getOperationStartDate';

export function getCeilLength(
	startDate: Dayjs,
	plannedEndDate: Dayjs,
	dateStart: Dayjs,
	dateEnd: Dayjs
): number {
	var fullLength: number;   
	if ((plannedEndDate.isAfter(dateEnd, 'd'))&&((startDate.isBefore(dateEnd, 'd'))||(startDate.isSame(dateEnd, 'd')))){
		fullLength = dateEnd.diff(startDate,'d')+1;
	} else {
		fullLength = plannedEndDate.diff(startDate,'d')+1;
	}
	if (fullLength < 1){
		fullLength = 1;
	}
	//console.log(startDate+"; "+plannedEndDate.format("YYYY-MM-DD")+"; "+fullLength);
 	return fullLength;
}

import dayjs from 'dayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';
import { getOperationStartDate } from './getOperationStartDate';

export function getCeilLength(
	startDate: string,
	plannedEndDate: string
) {
	let fullLength;
   
	fullLength = plannedEndDate.diff(
		dayjs(startDate),
		'd'
	);
	if (fullLength < 1){
		fullLength = 1;
	}
	//console.log(startDate+"; "+plannedEndDate.format("YYYY-MM-DD")+"; "+fullLength);
 	return fullLength;
}

import dayjs , { Dayjs } from 'dayjs';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getProjectDaysOverdue(
	operations: ProjectOperation[]
): number {	
	var FutureOperationsStartDates:Dayjs[] = [];
	var FutureOperationsEndDates:Dayjs[] = [];	
	var overdueDays:number = 0;
	operations.forEach((currentOperation, operationIndex) => {
		if ((currentOperation.isEnded == false)&&(currentOperation.inWork == false)){	
			FutureOperationsStartDates.push(convertToDayjs([currentOperation.startDate[0], currentOperation.startDate[1], currentOperation.startDate[2]]));
			FutureOperationsEndDates.push(convertToDayjs([currentOperation.plannedEndDate[0],currentOperation.plannedEndDate[1],currentOperation.plannedEndDate[2]]));		
			//console.log(currentOperation.name + ": StartDate: "+convertToDayjs(currentOperation.startDate).format('YYYY-MM-DD') + "; EndDate: " + convertToDayjs(currentOperation.plannedEndDate).format('YYYY-MM-DD'));
		}
	});
	
	const now = new Date();
	const today = convertToDayjs([now.getFullYear(), now.getMonth()+1, now.getDate()]);
	if (FutureOperationsStartDates.length > 0){
		var FutureOperationsMinStartDate:Dayjs = FutureOperationsStartDates.reduce(function(a, b) { return a < b ? a : b; });		
		overdueDays = today.diff(FutureOperationsMinStartDate, 'd');
		//console.log("Today: "+today.format('YYYY-MM-DD')+"; FutureOperationsMinStartDate: "+FutureOperationsMinStartDate.format('YYYY-MM-DD')+"; overdueDays: "+ overdueDays);
		if (overdueDays < 0) {
		  overdueDays = 0;
		}
	}
	return overdueDays;
}
import dayjs , { Dayjs } from 'dayjs';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getOperationDateRange (
	operation: ProjectOperation,
	overdueDays: number
){
	const now = new Date();
	var today =  convertToDayjs([now.getFullYear(), now.getMonth()+1, now.getDate(), 0, 0, 0] as number[]);
	var operationStartDate:Dayjs = convertToDayjs(operation.startDate);
	var operationEndDate:Dayjs = convertToDayjs(operation.plannedEndDate);
  
	//Calculate operation duration in days
	var dateStart:Dayjs = convertToDayjs([operation.startDate[0], operation.startDate[1], operation.startDate[2],0,0,0]);
	var dateEnd:Dayjs = convertToDayjs([operation.plannedEndDate[0], operation.plannedEndDate[1], operation.plannedEndDate[2],0,0,0]);
	var operationDuration:number = dateEnd.diff(dateStart, 'd')+1;
	//console.log(
	//	"dateStart: "+dateStart.format("YYYY-MM-DD")
	//	+"; dateEnd: "+dateEnd.format("YYYY-MM-DD")
	//	+"; operationDuration: "+operationDuration
	//);
	  
	if (operation.isEnded == true){
		if (operation.acceptanceDate !== null){
		  operationStartDate = convertToDayjs(operation.acceptanceDate);
		} else {
		  operationStartDate = convertToDayjs(operation.startDate);
		} 
		if (operation.realEndDate !== null){
		  operationEndDate = convertToDayjs(operation.realEndDate);
		} else {
		  operationEndDate = convertToDayjs(operation.plannedEndDate);
		} 	
		//console.log(operation.name+"; "+operation.realEndDate+"; "+operation.plannedEndDate+"; "+operationEndDate.format("YYYY-MM-DD"));
		return [operationStartDate, operationEndDate];
	}
    
	if (operation.inWork == true){
		if (operation.acceptanceDate !== null){
			operationStartDate = convertToDayjs(operation.acceptanceDate);
		} else {
			operationStartDate = convertToDayjs(operation.startDate);
		} 
		operationEndDate = (
			operationStartDate.add(operationDuration-1, 'day').isAfter(today) ?
			operationStartDate.add(operationDuration-1, 'day') :
			today
		);
		return [operationStartDate, operationEndDate];
	}
  
	if ((operation.inWork == false)&&(operation.isEnded == false)){
		if (operation.readyToAcceptance == true){
			operationStartDate = convertToDayjs([now.getFullYear(), now.getMonth()+1, now.getDate(), 0, 0, 0] as number[]);	
			operationEndDate = operationStartDate.add(operationDuration-1, 'day');
			return [operationStartDate, operationEndDate];	  
		} else {
			operationStartDate = dateStart.add(overdueDays, 'day');      
			operationEndDate = operationStartDate.add(operationDuration-1, 'day');		  			
			return [operationStartDate, operationEndDate];
		}
	}  
}

import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { convertToString } from '../../../../helpers/convertToString';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getOperationDateRange(
  repStartDate: number[],
  operation: ProjectOperation,
  overdueDays: number
) {
  const now = new Date();
  let operationStartDate: string;
  let operationEndDate: string;
  
  //Calculate operation duration in days
  let dateStart = new Date(String(operation.startDate[0])+'-'+String(operation.startDate[1])+'-'+String(operation.startDate[2]));
  let dateEnd = new Date(String(operation.plannedEndDate[0])+'-'+String(operation.plannedEndDate[1])+'-'+String(operation.plannedEndDate[2]));
  const operationDuration = Math.ceil((dateEnd - dateStart)/(1000*60*60*24))+1; 
  //console.log("Operation name: "+operation.name+"; operationPlanedStartDate: "+dateStart.toLocaleString()+"; operationPlanedEndDate: "+dateEnd.toLocaleString()+"; operationDuration: "+operationDuration);
  
  if (operation.isEnded == true){
    if (operation.acceptanceDate !== null){
	  operationStartDate = convertToString(operation.acceptanceDate);
	} else {
	  operationStartDate = convertToString(operation.startDate);
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
	  operationStartDate = convertToString(operation.acceptanceDate);
	} else {
	  operationStartDate = convertToString(operation.startDate);
	} 
	//dateEnd = new Date(operationStartDate);
	//dateEnd.setDate(dateEnd.getDate() + operationDuration);
	//console.log(operation.name+"; "+dateEnd);
	operationEndDate = convertToDayjs([now.getFullYear(), now.getMonth()+1, now.getDate(), 0, 0, 0] as number[]);
	return [operationStartDate, operationEndDate];
  }
  
  if ((operation.inWork == false)&&(operation.isEnded == false)){
    if (operation.readyToAcceptance == true){
	  operationStartDate = convertToString([now.getFullYear(), now.getMonth()+1, now.getDate(), 0, 0, 0] as number[]);	
	  dateEnd = new Date(operationStartDate);
	  dateEnd.setDate(now.getDate() + operationDuration-1);
	  operationEndDate = convertToDayjs([dateEnd.getFullYear(), dateEnd.getMonth()+1, dateEnd.getDate(), 0, 0, 0] as number[]);
	  return [operationStartDate, operationEndDate];	  
	} else {
	  dateStart.setDate(dateStart.getDate() + overdueDays);	  
	  operationStartDate = convertToString([dateStart.getFullYear(), dateStart.getMonth()+1, dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes(), dateStart.getSeconds()] as number[]);
	  
	  dateEnd = new Date(operationStartDate);
	  dateEnd.setDate(dateEnd.getDate() + operationDuration - 1);
	  operationEndDate = convertToDayjs([dateEnd.getFullYear(), dateEnd.getMonth()+1, dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes(), dateEnd.getSeconds()] as number[]);
	  return [operationStartDate, operationEndDate];
	}
  }  
}

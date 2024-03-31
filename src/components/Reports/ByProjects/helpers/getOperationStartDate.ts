import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { convertToString } from '../../../../helpers/convertToString';
import { ProjectOperation } from '../../../../store/apis/reports/types';

export function getOperationStartDate(
  repStartDate: number[],
  operation: ProjectOperation,
  overdueDays: number
) {
  const now = new Date();
  //console.log([now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()] as number[]);
  
  
  if (operation.inWork || operation.isEnded){
	if (operation.acceptanceDate !== null){
	  return convertToString(operation.acceptanceDate);
	} else {
	  return convertToString(operation.startDate);
	}
  }
  
  if (operation.inWork == false){
    if (operation.readyToAcceptance){
	  const startDate = convertToString([now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()] as number[]);	
	  console.log("readyToAcceptance; "+now.getFullYear()+"-"+String(now.getMonth()+1)+"-"+now.getDate()+"; "+operation.name+"; "+startDate);
      return startDate
	  
	} else {	  
	  const planedStartDate = new Date (String(operation.startDate[0])+'-'+String(operation.startDate[1])+'-'+String(operation.startDate[2]));	  
	  let planedStartDateShift = new Date(String(operation.startDate[0])+'-'+String(operation.startDate[1])+'-'+String(operation.startDate[2]));
	  planedStartDateShift.setDate(planedStartDateShift.getDate() + overdueDays);	  
	  return convertToString([planedStartDateShift.getFullYear(), planedStartDateShift.getMonth()+1, planedStartDateShift.getDate(), planedStartDateShift.getHours(), planedStartDateShift.getMinutes(), planedStartDateShift.getSeconds()] as number[]);
	}
  }
  
}

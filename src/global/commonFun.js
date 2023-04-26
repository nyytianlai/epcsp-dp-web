export const formatWithToLocalString = (
    number,
    maximumFractionDigits
  ) =>{
    if (number === 0 || (number && Number(number) && number !== 'undefined' && number !== 'NaN' && number !== 'null') ) {
        return Number(number).toLocaleString('en-us', {
          maximumFractionDigits: maximumFractionDigits || 2,
          minimumFractionDigits: 0,
        });
    }else{
        return '--'
    }
}
  
export const tableColumnFun = (row, column, cellValue, index) => {
  // console.log(row, column, cellValue, index);
  if (cellValue === '' || cellValue === null) {
    return '--'
  }
  return cellValue
}
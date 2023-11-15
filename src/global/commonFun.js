export const formatWithToLocalString = (number, maximumFractionDigits) => {
  if (number === 0 || number === '0') {
    return 0;
  }
  if (number && number !== 'undefined' && number !== 'NaN' && number !== 'null') {
    if (Number(number)) {
      return Number(number).toLocaleString('en-us', {
        maximumFractionDigits: maximumFractionDigits || 2,
        minimumFractionDigits: 0
      });
    } else {
      return number;
    }
  } else {
    return '--';
  }
};

export const tableColumnFun = (row, column, cellValue, index) => {
  // console.log(row, column, cellValue, index);
  if (!cellValue && cellValue !== 0) {
    return '--';
  }
  return cellValue;
};

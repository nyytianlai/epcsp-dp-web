/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-20 16:46:37
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-04 15:40:10
 * @FilePath: \epcsp-dp-web\src\global\commonFun.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const formatWithToLocalString = (
    number,
    maximumFractionDigits
) => {
    if (number === 0 || number === '0') {
        return 0
    }
    if (number && number !== 'undefined' && number !== 'NaN' && number !== 'null') {
      if (Number(number)) {
        return Number(number).toLocaleString('en-us', {
          maximumFractionDigits: maximumFractionDigits || 2,
          minimumFractionDigits: 0,
        });
      } else {
        return number
      }
    } else {
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
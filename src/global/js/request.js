/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-05-16 15:52:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-16 15:53:08
 * @FilePath: \epcsp-dp-web\src\global\js\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request, {
  // 如果有自定义拦截器的需求，可以用它
  axios
} from '@sutpc/axios';
request.config({
  requestPre: import.meta.env.VITE_API_BASEPATH,
  contentType: 'json',
  loading: false
  // 如果要自定义返回的拦截器，记得把它设置为false
  // interceptor: false
});
// axios.interceptors.request.use(
//   (config) => {
//     //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
//     config.data&&(config.data = JSON.stringify(setObject(config.data)))
//     console.log('config',config)
//     // config.data&&console.log('md5',md5(config.data))
//     // config.data = JSON.stringify(config.data) //数据转化,也可以使用qs转换
//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )
// // 将参数转成md5
// function setObject(obj){
//   let temp = JSON.parse(obj)
//   for(let i in temp){
//     temp[i] = md5(temp[i])
//   }
//   return temp
// }
// 允许业务自定义返回的拦截器
// axios.interceptors.request.use();
// axios.interceptors.response.use();
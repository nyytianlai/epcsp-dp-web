import { createStore } from 'vuex';
import getters from './getters';

// 自动引入
const modules = {};
const modulesObj = import.meta.glob('./modules/*.js');
// 获取文件名
function getFileName(fileName) {
  const startIndex = fileName.lastIndexOf('/');
  const endIndex = fileName.lastIndexOf('.');
  return fileName.substring(startIndex + 1, endIndex);
}
for (const path in modulesObj) {
  const mod = await modulesObj[path]();
  const key = getFileName(path);
  modules[key] = mod.default;
}

export default createStore({
  modules,
  getters
});

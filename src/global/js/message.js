/**重置message，防止重复点击重复弹出message弹框 */
import { ElMessage } from 'element-plus';
let messageInstance = null;
const resetMessage = (options) => {
  //关闭上一个弹窗，继续下一个弹窗
  if (messageInstance) {
    messageInstance.close(); //手动关闭实例，调用它的 close 方法，详细内容请参考Element-ui官方文档。
  }
  messageInstance = ElMessage(options);
};
['error', 'success', 'info', 'warning'].forEach((type) => {
  resetMessage[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return resetMessage(options);
  };
});
export const Message = resetMessage;

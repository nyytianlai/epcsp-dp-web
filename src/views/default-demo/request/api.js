import request from '@sutpc/axios';

export default {
  getPage(options) {
    return request.get({
      url: '/api/layer/findDetail',
      ...options
    })
  }
}
import { Base } from '../utils/base.js'

class User_order extends Base {
  constructor() {
    super();
  }
  /**
   * 获取用户订单
   */
  orderUser(callBack) {
    var params = {
      url: 'order/user',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export { User_order }
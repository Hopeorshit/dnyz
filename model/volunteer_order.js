import { Base } from '../utils/base.js'

class Volunteer_order extends Base {
  constructor() {
    super();
  }
  /**
   * 获取用户订单
   */
  orderVol(callBack) {
    var params = {
      url: 'order/vol',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}
export { Volunteer_order }
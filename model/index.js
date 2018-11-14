import {
  Base
} from '../utils/base.js'

class Index extends Base {
  constructor() {
    super();
  }
  /*
   获取所有订单
  */
  orderUnToken(callBack) {
    var params = {
      url: 'order/un_token',
      sCallBack: function(res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

}
export {
  Index
}
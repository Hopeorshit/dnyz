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
  orderUnToken(page,page_size,callBack) {
    var params = {
      url: 'order/un_token?page='+page+'&page_size='+page_size,
      sCallBack: function(res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  /**
   * 志愿者接单
   */
  orderTake(order_id,callBack){
    var params = {
      url: 'order/take',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        order_id:order_id,
      }
    };
    this.request(params);
  }
}
export {
  Index
}
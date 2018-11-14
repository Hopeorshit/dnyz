import { Base } from '../utils/base.js'

class Comment extends Base {
  constructor() {
    super();
  }
  /**
   * 获取志愿者信息
   */
  volInfo(order_id,callBack) {
    var params = {
      url: 'order/vol_info?order_id='+order_id,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  /**
   * 提交表单
   */
  orderComment(order_id,star,detail, callBack) {
    var params = {
      url: 'order/comment',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        order_id:order_id,
        star: star,
        detail:detail
      }
    };
    this.request(params);
  }
}
export { Comment }
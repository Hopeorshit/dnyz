import { Base } from '../utils/base.js'

class Apply_form extends Base {
  constructor() {
    super();
  }
  /**
   * 获取目录
   */
  categorAll(callBack) {
    var params = {
      url: 'category/all',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  /**
   * 提交表单
   */
  orderPlace(value, callBack) {
    var params = {
      url: 'order/place',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        name:value.name,
        room:value.room,
        category_id:value.category_id,
        phone:value.phone,
        description:value.description
      }
    };
    this.request(params);
  }
}
export { Apply_form }
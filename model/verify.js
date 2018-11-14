import { Base } from '../utils/base.js'

class Verify extends Base {
  constructor() {
    super();
  }
  /*
  *这是一个post方法的是咧
  */
  verify(student_id, name, callBack) {
    var params = {
      url: 'user/verify',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
       student_id:student_id,
       name:name
      }
    };
    this.request(params);
  }
}

export { Verify }
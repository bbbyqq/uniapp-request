const baseUrl = 'xxx'  // 此处填写后端url
	
const http = (params) => {
  return new Promise((resolve, reject) => {
	// 判断token是否存在
	const userInfo = uni.getStorageSync('userInfo')
	let token = ''
	if (userInfo) {
		token = JSON.parse(userInfo).token
	}
    uni.request({
      url: baseUrl + params.url, // 服务器url+参数中携带的接口具体地址
      data: params.data, // 请求参数
      header: params.header || { // 设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
        'Content-Type': 'application/json', 
		'Authorization': token
      },
      method: params.method || 'POST', // 默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType, // 返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType, // 响应的数据类型
      success: function(res) {
        if (res.data.code === 401) {
          // token 不存在
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/login/login',
            });
          }, 500);
        } else if (res.data.msg === '用户不存在' || res.data.msg === '登录失效') {
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/login/login',
            });
          }, 500);
        } else {
          resolve(res.data);
        }
      },
      fail: function(error) {
        reject(error);
		uni.showToast({
			icon: 'none',
			title: '请求失败'
		})
      },
    });
  });
};
export default http;

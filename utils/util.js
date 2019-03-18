const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function checkIsLogin() {
	if (!wx.getStorageSync('storageLoginedUsernames')) {
		wx.redirectTo({
			url: '/pages/login/login'
		});
	}
}
const BASEURL = 'https://www.yishuzi.com.cn/touxiang_xiaochengxu_bizhi_api/'
const CODE = 'client_id=a927fdd4759a9036435b7651c60fb3dcaed27d34c5f96e3f0b5f9a0da9288bd4'
module.exports = {
	formatTime: formatTime,
	BASEURL: BASEURL,
	CODE: CODE,
	checkIsLogin: checkIsLogin
}

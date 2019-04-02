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

var getDateDiff = function (dateTimeStamp) {
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = Date.parse(new Date()) / 1000;
	console.log('now', now);
	console.log('dateTimeStamp', dateTimeStamp);
	var diffValue = now - dateTimeStamp;
	console.log('diffValue', diffValue);
	if (diffValue < 0) { return; }
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute * 100;
	console.log('minC',minC)
	let _re;
	if (monthC >= 1) {
		_re = "" + parseInt(monthC) + "月前";
	}
	else if (weekC >= 1) {
		_re = "" + parseInt(weekC) + "周前";
	}
	else if (dayC >= 1) {
		_re = "" + parseInt(dayC) + "天前";
	}
	else if (hourC >= 1) {
		_re = "" + parseInt(hourC) + "时前";
	}
	else if (minC >= 1) {
		_re = "" + parseInt(minC) + "分前";
	} else
		_re = "刚刚";
	return _re;
};

function checkIsLogin() {
	if (!wx.getStorageSync('storageLoginedUsernames')) {
		wx.redirectTo({
			url: '/pages/login/login'
		});
	}
}
const BASEURL = 'https://www.yishuzi.com.cn/touxiang_xiaochengxu_bizhi_api/'
const CODE = 'client_id=a927fdd4759a9036435b7651c60fb3dcaed27d34c5f96e3f0b5f9a0da9288bd4'

function extract_chinese_length(txt) {
	var reg = /[\u4e00-\u9fa5]/g;
	var names = txt.match(reg);
	let t;
	if (names != null){
		t = names.join("");
		return t.length;
	}else{
		return 0;
	}
	
}

function extract_chinese(txt) {
	var reg = /[\u4e00-\u9fa5]/g;
	var names = txt.match(reg);
	let t;
	if (names != null) {
		t = names.join("");
		return t;
	} else {
		return 0;
	}
};

module.exports = {
	// formatTime: formatTime,
	BASEURL: BASEURL,
	CODE: CODE,
	getDateDiff: getDateDiff,
	checkIsLogin: checkIsLogin,
	extract_chinese: extract_chinese,
	extract_chinese_length: extract_chinese_length
}

//var basepath = "https://www.*****.cn/cjq/gua";
var basepath = "https://api.newsgpi.com";
//转盘抽奖  /cjqh5/act/bigTurntable/doPrize.action   loginName
//中奖用户 /cjqh5/act/bigTurntable/getPrizeWall.action
//兑奖记录/cjqh5/act/bigTurntable/getPrizeRecord.action   loginName
// 倒计时
//var interval = 1000;




//超级返现规则
$("#gz-b").on('click', function() {
	$(".zz").show();
	$(".cjfx").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".cjfx").hide();
});
//大转盘规则
$("#look-gz").on('click', function() {
	$(".zz").show();
	$(".zpgz").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".zpgz").hide();
});
//中奖纪录
$("#zjjl").on('click', function() {
	$(".zz").show();
	$(".zj").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".zj").hide();
});
//无次数弹框
$(".cjgz-c").on('click', function() {
	$(".wcs").hide();
	$(".zz").hide();
});

//获取参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
var login = getQueryString("login");
var loginName = getQueryString("loginName");
var isapp = getQueryString("isapp");
var memberId = getQueryString("memberId");

//是否在APP&是否登录 
if (isapp == 1) {
	if (login == 1) {
		$("#tzbtn").attr("href", "cjq:terminal");
	} else {
		$("#tzbtn").attr('href', 'cjq:login');
	}
} else {
	$("#share").hide();
	//$("#tzbtn").attr("href", "https://*****.html");
}

// 滚动-start
// 左边
var speedi = 80;
var colee2 = document.getElementById("colee2");
var colee1 = document.getElementById("colee1");
var colee = document.getElementById("colee");
colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2
function Marquee1() {
	//当滚动至colee1与colee2交界时
	if (colee2.offsetTop - colee.scrollTop <= 0) {
		colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
	} else {
		colee.scrollTop++
	}
}
var MyMar1 = setInterval(Marquee1, speedi) //设置定时器
	// 右边
var coleer2 = document.getElementById("coleer2");
var coleer1 = document.getElementById("coleer1");
var coleer = document.getElementById("coleer");
coleer2.innerHTML = coleer1.innerHTML; //克隆colee1为colee2
function Marqueer1() {
	//当滚动至colee1与colee2交界时
	if (coleer2.offsetTop - coleer.scrollTop <= 0) {
		coleer.scrollTop -= coleer1.offsetHeight; //colee跳到最顶端
	} else {
		coleer.scrollTop++
	}
}
var MyMarr1 = setInterval(Marqueer1, speedi) //设置定时器
	// console.log(num+"  "+arr[num])
	// 滚动-end
	// 中奖用户
jp = {
	'1': ["0", "SGP-F.Type 1 MO"],
	'2': ["1", "50 NG"],
	'3': ["2", "45$ Server Coupons"],
	'4': ["3", "500 NG"],
	'5': ["4", "100 NG"],
	'6': ["5", "10 NG"],
	'7': ["6", "20$ Server Coupons"],
	'8': ["7", "iphone14 pro max 256G"],
};
/*
$.jsonp({
	type: "POST",
	url: basepath + "/cjqh5/act/bigTurntable/getPrizeWall.action",
	dataType: "json",
	data: {
		'loginName': loginName,
		additionalCode: '0000',
	},
	callbackParameter: "callback",
	success: function(data) {
		// 奖品
		var bianl = data.activitySize;
		// console.log(bianl)
		for (var i = 0; i < bianl; i++) {
			$("<li>" + data.activityPrizeList[i].phone + "</li>").appendTo("#colee1");
			$("<li>" + jp[data.activityPrizeList[i].prizeType][1] + "</li>").appendTo("#coleer1");
		}
		$("#mon").html(data.totalMoney)
	}
});
*/


//抽奖代码
$(function() {
	var $btn = $('.g-lottery-img'); // 旋转的div
	var cishu = 100; //初始次数，由后台传入
	$('#cishu').html(cishu); //显示还剩下多少次抽奖机会
	var uid = '642';
	
	if (uid) {
		//console.log("cishu:"+cishu);
		$.jsonp({
			type: "POST",
			url: basepath + "/app/index/get_my_lottery",
			dataType: "json",
			data: {
				uid: uid,
				additionalCode: '0000',
			},
			callbackParameter: "callback",
			success: function(res) {
				if (res.data && res.data.lottery) {
					//console.log(res.data.lottery);
					var lottery = res.data.lottery;
					
					$('#cishu').html(cishu);
					var bianl = res.lottery.length;
					//console.log(bianl);
					var html = '';
					var html2 = '';
					for (var i = 0; i < bianl; i++) {
						html+='<li><span style="height:30px;width:40%;float:left;padding:0;margin:0;">'+res.lottery[i].create_time+'</span><span style="height:30px;width:60%;float:left;padding:0;margin:0;text-align:left;white-space:nowrap;">'+res.lottery[i].lottery+'</span></li>';
						html2+='<div class="zhongj-bbl" id="colee" style="overflow:hidden;height:30px;width:45%;color:#303030;">'+res.lottery[i].create_time+'</div><div class="zhongj-bbr" id="coleer" style="overflow:hidden;height:30px;width:55%;color:#303030;text-align:left;white-space:nowrap;">'+res.lottery[i].lottery+'</div>';
					}
					$("#my_lottery").html(html);
					$("#all_lottery").html(html2);
			
				}
			}
		});
	}
	
	
		
	
	var isture = 0; //是否正在抽奖
	var clickfunc = function() {

		var data = [1, 2, 3, 4, 5, 6, 7, 8]; //抽奖
		var data2 = [0,25,10,0,5,40,20,0];
		var data1=[];
		if (data.length == data2.length) {
			for (var i = 0; i < data2.length; i++) {
				if (data2[i]){
					for (var k = 0; k < data2[i]; k++) {
						data1.push(data[i]);
					}
				}
			}
		}
		data = data1;
		data = data[Math.floor(Math.random() * data.length)]; //1~8的随机数
		switch (data) {
			case 1:
				rotateFunc(1, 25, 'SGP-F.Type 1 MO');
				break;
			case 2:
				rotateFunc(2, 70, '50 NG');
				break;
			case 3:
				rotateFunc(3, 115, '45$ Server Coupons');
				break;
			case 4:
				rotateFunc(4, 160, '500 NG');
				break;
			case 5:
				rotateFunc(5, 203, '100 NG');
				break;
			case 6:
				rotateFunc(6, 245, '10 NG');
				break;
			case 7:
				rotateFunc(7, 290, '20$ Server Coupons');
				break;
			case 8:
				rotateFunc(8, 340, 'iphone14 pro max 256G');
				break;
		}
	}
	$(".zhizhen").click(function() {
		//判断是否投资然后是fou抽奖========================================================
		var touzi = "没投资11";
		if (touzi == "没投资") {
			$(".zz").show();
			$(".today").show();
			$(".cjgz-c").on('click', function() {
				$(".zz").hide();
				$(".today").hide();
			});
			$(".ok-img").on('click', function() {
				$(".zz").hide();
				$(".today").hide();
			});
		} else {
			$(".zz").hide()
			$(".today").hide();
			if (isture) return; // 如果在执行就退出
			isture = true; // 标志为 在执行
			//console.log("cishu:"+cishu);
			if (cishu <= 0) { //当抽奖次数为0的时候执行
				$(".zz").show();
				$(".wcs").show();
				$(".ok-img").on('click', function() {
					$(".wcs").hide();
					$(".zz").hide();
				});
				// alert("没有次数了");
				$('#cishu').html(0); //次数显示为0
				isture = false;
			} else { //还有次数就执行
				cishu = cishu - 1; //执行转盘了则次数减1
				if (cishu <= 0) {
					cishu = 0;
				}
				$('#cishu').html(cishu);
				clickfunc();
			}
		}
	});
	var rotateFunc = function(awards, angle, text) {
		isture = true;
		$btn.stopRotate();
		$btn.rotate({
			angle: 0, //旋转的角度数
			duration: 4000, //旋转时间
			animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				
	$.jsonp({
		type: "POST",
		url: basepath + "/app/index/up_my_lottery",
		dataType: "json",
		data: {
			uid: uid,
			additionalCode: '0000',
			lottery:encodeURIComponent(text)
		},
		callbackParameter: "callback",
		success: function(res) {
			if (res.data && res.data.lottery) {
				//console.log(res.data.lottery);
				var lottery = res.data.lottery;//这个是次数，抽奖次数后再提交减少次数把抽奖的结果上传
				$('#cishu').html(cishu);
			}
		}
	});
				//alert(text);
				$(".texts").html("Congratulations, you have received<br>" + text);
					console.log(text)
				$(".zz").show();
				$(".jl-tk").show();
				$(".cjgz-c").on('click', function() {
					$(".zz").hide();
					$(".jl-tk").hide();
				});
				$(".ok-img").on('click', function() {
					$(".zz").hide();
					$(".jl-tk").hide();
				});
			}
		});
	};
});
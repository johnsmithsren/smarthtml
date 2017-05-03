/**
 * Created by renjm on 17/2/17.
 */
$(document).ready(function() {
	var shoecode = localStorage.getItem('shoe_code') || '';
	var name = localStorage.getItem('name') || '';
	if(shoecode.length) {
		if(name.length) {
			location.href = 'dashboard.html';
		}
	}
});
$('#_share').click(function() {
	$('#signin').css("display", "none");
	$('.form-group').css("display", "none");
	$('#_acc').css("display", "block");
	$('#_sha').css("display", "block");
	$('#_share').css("display", "none");
	$('#sharesignin').css("display", "block");
	$('#back').css("display", "block");
	$('#forget').css("display", "none");
	$('#_sig').css("display", "none");

});

$('#back').click(function() {
	window.location.reload();
	//	$('#signin').css("display", "block");
	//	$('.form-group').css("display", "block");
	//	$('#_acc').css("display", "none");
	//	$('#_sha').css("display", "none");
	//	$('#_share').css("display", "block");
	//	$('#sharesignin').css("display", "none");
	//	$('#back').css("display","none");
});
$('#sharesignin').click(function() {
	if($("#_account").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>授权者账号不能为空.'
		$("._error").append(temp);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 3000);
		return;
	} else if($("#_shareaccount").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>被授权者账号不能为空。' +
			'</div>'
		$("._error").append(temp);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 3000);
		return;
	} else {
		var _account = $("#_account").val();
		var _sharetoaccount = $("#_shareaccount").val();
		$.ajax({
			url: "http://demaciaspower.cn/shareverify",
			data: {
				account: _account,
				shareaccount: _sharetoaccount
			},
			type: "GET",
			dataType: "json",
			success: function(data) {
				console.log(data);
				if(data.msg == "success") {
					localStorage.setItem("name", data.data.name);
					localStorage.setItem("shoe_code", data.data.shoe_code)
					window.location.href = 'dashboard.html'
				} else {
					var temp = '<div class="alert alert-warning">' +
						'<a href="#" class="close" data-dismiss="alert">' +
						'&times;' +
						'</a>' +
						'<strong>警告！</strong>'+data.msg+
						'</div>'
					$("._error").append(temp);
					setTimeout(function() {
						$('[data-dismiss=alert]').alert('close');
					}, 3000);
					return;
				}

			}
		});
	}

});
$('#signin').click(function() {
	$(".error").remove();
	if($("#email").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>邮箱不能为空.'
		$("._error").append(temp);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 3000);
		return;
	} else if($("#password").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>密码不能为空。' +
			'</div>'
		$("._error").append(temp);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 3000);
		return;
	} else if($("#identify_code").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>验证码不能为空。' +
			'</div>'
		$("._error").append(temp);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 3000);
		return;
	} else {
		var _password = $("#password").val();
		var _username = $("#email").val();
		var _code = $("#identify_code").val();
		$.ajax({
			url: "http://demaciaspower.cn/user/login/user_verify",
			data: {
				pwd: _password,
				name: _username,
				code: _code,
				account: _username
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
				if(data) {
					var data_back = data;
					console.log(data);
					if(data_back.err) {
						var msg = data_back.err;
						var temp = '<div class="alert alert-warning">' +
							'<a href="#" class="close" data-dismiss="alert">' +
							'&times;' +
							'</a>' +
							'<strong>警告！</strong>' + msg +
							'</div>'
						$("._error").append(temp);
						setTimeout(function() {
							$('[data-dismiss=alert]').alert('close');
						}, 3000);
					} else {
						console.log(data_back);
						localStorage.setItem("token", data.token);
						localStorage.setItem("name", _username);
						console.log(data_back.msg);
						localStorage.setItem("shoe_code", data_back.msg)
						window.location.href = 'dashboard.html'
					}
				}
			},
			error: function(result) {
				if(result) {
					var data3 = result;
					return result;
				}
			}
		});
	}
});

function Countdown(sec) {
	$('#code_time').css("display", "block")
	var i = window.setInterval(function() {
		$('#code_time').text(sec);
		sec--;
		if(sec == 0) {
			$('#code_time').text(sec);
			$('#code_time').css("display", "none")
			$('#send_code').removeAttr('disabled');
			clearInterval(i);
		}
	}, 1000);
}
$('#send_code').click(function() {
	var _name = $("#tel").val();
	var _account = $("#email").val();
	if(_name.length == 11) {
		Countdown(60);
		$('#send_code').attr('disabled', 'disabled');
		$.ajax({
			url: "http://demaciaspower.cn/user/send_code",
			data: {
				name: _name,
				account: _account
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
				//				addClass('disabled')
				if(data) {

				} else {

				}
			}
		});
	} else {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>请填写正确的手机号.' +
			'</div>'
		$("._error").append(temp);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 3000);
	}

});
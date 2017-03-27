/**
 * Created by renjm on 17/2/17.
 */

$('#signin').click(function() {
	$(".error").remove();
	if($("#email").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>邮箱不能为空.'
		$("._error").append(temp);
		return;
	} else if($("#password").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>密码不能为空。' +
			'</div>'
		$("._error").append(temp);
		return;
	} else if($("#identify_code").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>验证码不能为空。' +
			'</div>'
		$("._error").append(temp);
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
				account:_username
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
				if(data) {
					var data_back = data;
					console.log(data);
					if(data_back.err) {
						var msg=data_back.err;
						var temp = '<div class="alert alert-warning">' +
							'<a href="#" class="close" data-dismiss="alert">' +
							'&times;' +
							'</a>' +
							'<strong>警告！</strong>'+msg+
							'</div>'
						$("._error").append(temp);
						$("#password").val('');
						$("#username").val('');
					} else {
						console.log(data_back);
						localStorage.setItem("name",_username);
						console.log(data_back.msg);
						localStorage.setItem("shoe_code",data_back.msg)
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

$('#send_code').click(function() {
	var _name = $("#tel").val();
	var _account=$("#email").val();
	if(_name.length == 11) {
		$.ajax({
			url: "http://demaciaspower.cn/user/send_code",
			data: {
				name: _name,
				account:_account
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
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
	}

});
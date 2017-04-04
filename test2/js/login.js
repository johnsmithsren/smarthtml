/**
 * Created by renjm on 17/2/17.
 */
document.addEventListener('plusready',function(){
			plus.key.addEventListener('backbutton',function(){
				plus.nativeUI.confirm("exit?",function(event){
					if(event.index){
						plus.runtime.quit();
					}
				},null,['ok','no']);
			},false);
		})



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
		setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},3000);
		return;
	} else if($("#identify_code").val() == "") {
		var temp = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>验证码不能为空。' +
			'</div>'
		$("._error").append(temp);
		setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},3000);
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
						setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},3000);
					} else {
						console.log(data_back);
						localStorage.setItem("token",data.token);
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
function Countdown(sec)  
{  $('#code_time').css("display","block")
    var i = window.setInterval(function()  
    {  
    $('#code_time').text(sec);
    sec--;  
    if(sec==0)  
    {  
    		 $('#code_time').text(sec);
    		 $('#code_time').css("display","none")
    		 $('#send_code').removeAttr('disabled');
         clearInterval(i);  
    }  
    }, 1000);  
}   
$('#send_code').click(function() {
	var _name = $("#tel").val();
	var _account=$("#email").val();
	if(_name.length == 11) {
		Countdown(60);
		$('#send_code').attr('disabled','disabled');
		$.ajax({
			url: "http://demaciaspower.cn/user/send_code",
			data: {
				name: _name,
				account:_account
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
		setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},3000);
	}

});
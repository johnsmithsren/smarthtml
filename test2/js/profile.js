$(document).ready(function() {
	var _name = localStorage.getItem("name");
	$.ajax({
		url: "http://demaciaspower.cn/get_userInfo",
		//		      url: "http://localhost:3000/get_userInfo",
		data: {
			name: _name
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				if(data.data == "relogin") {
					window.location.href = "login.html";
				}
				var temp = localStorage.getItem("name");
				console.log(temp, data.data)
				if(temp) {
					$('#user_name').text(temp);
				} else {
					localStorage.setItem("name", data.data[0].name);
					var temp = data.data[0].name;
					$('#user_name').text(temp);
				}
			} else {
				console.log('ajax failed!')
			}
		}
	});
	var _shoe_code = localStorage.getItem("shoe_code");
	var _account=localStorage.getItem("name");
	var _startTime=Math.round(new Date().getTime() / 1000) - 86400;
	var _endTime=Math.round(new Date().getTime() / 1000);
	var temp_data=0;
	var t_data=0;
	$.ajax({
		url: "http://demaciaspower.cn/select_map_info",
		data: {
			shoe_code:_shoe_code,
			account:_account,
			startTime:_startTime,
			endTime:_endTime
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				
				if(data.data.length) {
					for(var i = 0; i < data.data.length - 1; i++) { 
						if (isNaN(parseInt(data.data[i].step_number))){
							t_data=0;
						}else{
							t_data=parseInt(data.data[i].step_number);
						}
						
					 	temp_data=temp_data+Math.abs(t_data);
					 	
					}
					temp_data=temp_data/3.0;
					$('#stepnum').val(temp_data+"步数");
				} else {
					var temp = '<div class="alert alert-warning">' +
						'<a href="#" class="close" data-dismiss="alert">' +
						'&times;' +
						'</a>' +
						'<strong>警告！</strong>没有运动数据。' +
						'</div>'
					$("._error").append(temp);
					setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},2000);
				}

			}
		}
	});
	var _name = localStorage.getItem("name");
	$.ajax({
		url: "http://demaciaspower.cn/get_userprofile",
		data: {
			name: _name
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {				
				$("#password").val(data.data[0].pwd);
				$("#username").val(data.data[0].account);
				$("#tel").val(data.data[0].tel);
				$("#email").val(data.data[0].name);
				$("#weight").val(data.data[0].weight);
				$("#shoe_code").val(data.data[0].shoe_code);
			} else {
				console.log('ajax failed!')
			}
		}
	});
});

$('#edit_user').click(function() {
	var _password = $("#password").val();
	var _username = $("#username").val();
	var _tel = $("#tel").val();
	var _email = $("#email").val();
	var _weight = $("#weight").val();
	var _shoecode = $("#shoe_code").val();
	var User_name = $('#user_name').val();
	$.ajax({
		url: "http://demaciaspower.cn/update_userprofile",
		data: {
			pwd: _password,
			account: _username,
			tel: _tel,
			name: _email,
			weight: _weight,
			shoe_code: _shoecode
		},
		type: "POST",
		dataType: "json",
		success: function(data) {
			if (data.msg=="success"){
				location.reload();
			}
		}
	});

});
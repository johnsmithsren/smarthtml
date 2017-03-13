$(document).ready(function() {
	$.ajax({
		url: "http://demaciaspower.cn/get_userInfo",
		//		      url: "http://localhost:3000/get_userInfo",
		data: {
			name:"renjm"
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				var temp = localStorage.getItem("name");
				console.log(temp,data.data)
				if(temp) {
					$('#user_name').text(temp);
				} else {
					localStorage.setItem("name",data.data[0].name);
					var temp = data.data[0].name;
					$('#user_name').text(temp);
				}
			} else {
				console.log('ajax failed!')
			}
		}
	});
	$.ajax({
		url: "http://demaciaspower.cn/get_userprofile",
		data: {
			name:"renjm"
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
//				for item in data.data[2]
//					
			 	$("#password").val(data.data[0].pwd);
        			$("#username").val(data.data[0].account);
       			$("#tel").val(data.data[0].tel);
        			$("#email").val(data.data[0].name);
        			$("#weight").val(data.data[0].weight);
        			$("#shoe_code").val(data.data[0].shoe_code);
				$("#stepnum").val(data.data[1][5].step_number);
				$('#calory').val('10000');
				$('#alldis').val('2000');
			} else {
				console.log('ajax failed!')
			}
		}
	});
});

$('#edit_user').click(function() {
		var _password = $("#password").val();
        var _username=$("#username").val();
        var _tel=$("#tel").val();
        var _email=$("#email").val();
        var _weight=$("#weight").val();
        var _shoecode=$("#shoe_code").val();
		var User_name = $('#user_name').val();
		$.ajax({
			url: "http://demaciaspower.cn/update_userprofile",
			data: {
					pwd:_password,
                    name:_username,
                    tel:_tel,
                    account:_email,
                    weight:_weight,
                    shoe_code:_shoecode
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
					console.log(data);
			}
		});

	});
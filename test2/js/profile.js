$(document).ready(function()
	$.ajax({
		url: "http://demaciaspower.cn/get_userprofile",
		data: {
			name:"renjm"
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				console.log(data);
			} else {
				console.log('ajax failed!')
			}
		}
	});
);

$('#user_logout').click(function() {
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
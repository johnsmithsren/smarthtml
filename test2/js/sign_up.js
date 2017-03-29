/**
 * Created by renjm on 17/2/17.
 */
$(document).ready(function() {
    $('#sign_up').click(function() {
        //此处可做表单验证
        if ($("#username").val() == "") {
            alert("用户名不能为空");
            return false;
        }
        var _password = $("#password").val();
        var _username=$("#username").val();
        var _tel=$("#tel").val();
        var _email=$("#email").val();
        var _weight=$("#weight").val();
        var _shoecode=$("#shoe_code").val();
        if (_email.length){
            $.ajax({
                url: "http://demaciaspower.cn/user/login/sign_up",
                data: {
                    pwd:_password,
                    name:_username,
                    tel:_tel,
                    account:_email,
                    weight:_weight,
                    shoe_code:_shoecode
                },
                type: "POST",
                dataType : "json",
                success:function(data){
                    if(data.err){
                    		var temp = '<div class="alert alert-warning">' +
						'<a href="#" class="close" data-dismiss="alert">' +
						'&times;' +
						'</a>' +
						'<strong>警告！</strong>' +data.err+
						'</div>'
						$("._error").append(temp);
                    }else{
                        var data3=data;
                        localStorage.setItem("name",_username);
                        window.location.href='login.html';
                    }
                }
            });
        }
        else
        {

        }

    });
});


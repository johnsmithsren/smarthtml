/**
 * Created by renjm on 17/2/17.
 */


$('#signin').click(function() {
	$(".error").remove();
    if ($("#email").val() == "") {
        alert("邮箱不能为空");
        return false;
    }
    else if($("#password").val() == ""){
        alert("密码不能为空");
        return false;
    }
    else{
        var _password=$("#password").val();
        var _username=$("#email").val();
        var _code=$("#identify_code").val();
        $.ajax({
//          url: "http://demaciaspower.cn/user/login/user_verify",
			url: "http://demaciaspower.cn/user/login/user_verify",
            data: {
                pwd:_password,
                name:_username,
                code:_code
            },
            type: "POST",
            dataType : "json",
            success:function(data){
                if(data){
                    var data_back=data;
                    if (data_back.err)
                    {			
						var temp = '<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a> <strong>Error!</strong>This is a fatal error. </div>';
                        $(".error").append(temp);
                        $("#password").val('');
                        $("#username").val('');
                    }
                    else
                    {
                        var temp = '<div class="alert alert-success"> <a class="close" data-dismiss="alert">×</a> <strong>Success!</strong> You have successfully done it. </div> '
						window.location.href='dashboard.html'
                    }
                }
            },
            error:function(result){
                if(result){
                    var data3=result;
                    return result;
                }
            }
        });
    }
});

$('#send_code').click(function() {
		$.ajax({
            url: "http://demaciaspower.cn/user/send_code",
            data: {
                
            },
            type: "POST",
            dataType : "json",
            success:function(data){
                if(data){
                   
                    }
                    else
                    {
                       
                    }
                }
        });
});
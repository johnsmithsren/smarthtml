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
        if (_email.length){
            $.ajax({
//              url: "http://demaciaspower.cn/user/login/sign_up",
                url: "http://localhost:3000/user/login/sign_up",
                
                data: {
                    pwd:_password,
                    name:_username,
                    tel:_tel,
                    account:_email
                },
                type: "POST",
                dataType : "json",
                success:function(data){
                    if(data){
                        var data3=data;
                        localStorage.setItem("name",_email);
                        window.location.href='http://localhost:3000/login.html';
//                        $("#sign_in").val("Success");
//                        alert("用户或密码错误！");
//                      window.opener.location="login.html";
//                      window.opener=null;
//                      window.close();
                    }
                }
            });
        }
        else
        {

        }

    });
});


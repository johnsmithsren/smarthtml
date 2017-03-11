$('#send_email').click(function() {
		var _account=$('#email').val();
		$.ajax({
            url: "http://demaciaspower.cn/user/find_pass",
            data: {
                account:_account
            },
            type: "POST",
            dataType : "json",
            success:function(data){
                if(data){
                   console.log(data);
                    }
                    else
                    {
                       
                    }
                }
        });
});

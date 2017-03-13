$(document).ready(function(){
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
            url: "http://demaciaspower.cn/get_news",
            data: {
                
            },
            type: "POST",
            dataType : "json",
            success:function(data){
                if(data){
                	for(var i = 0; i < data.data.length; i++) {
                	   var temp_time=new Date(data.data[i].create_time * 1000).toLocaleString();
             	   var temp_news=JSON.parse(data.data[i].news);
             	   var temp_title=data.data[i].title;
                   var temp = '<li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/80/30a5ff/fff" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+temp_title+
                   '</strong> <small class="text-muted">'
                   +temp_time+'</small></div><p>'+ temp_news+'</p></div></li>'
                   $("#listnews").append(temp);
                   }
                }
            }
        });
});
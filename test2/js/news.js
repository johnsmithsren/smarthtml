$(document).ready(function(){
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
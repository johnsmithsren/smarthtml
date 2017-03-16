$(document).ready(function() {
	$.ajax({
		url: "http://localhost:3000/user_account",
		data: {

		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				for(var i = 0; i < data.data.length; i++) {
					var temp_account = data.data[i].account;
					var temp_shoe = data.data[i].shoe_code;
					var temp_battery = JSON.parse(data.data[i].battery);
					var temp = '<tr>' +
						'<td>' + temp_account + '</td>' +
						'<td>' + temp_shoe + '</td>' +
						'<td>' + temp_battery + '</td>' +
						'<td><p class="monitor" data-toggle="modal" data-target="#mymonitor"><span class="glyphicon glyphicon-stats"></span>监控</p></td>' +
						'<td><p class="email" data-toggle="modal" data-target="#myemail"><span class="glyphicon glyphicon-envelope"></span>邮件</p></td>' +
						'</tr>'
					$("#user_table").append(temp);
				}
				$('.monitor').on('click', function(event) {
					var temp = $(this).closest('tr');
					var temp_data = temp.find("td:eq(0)").html();
					console.log(temp_data)
					event.cancelBubble = true;
				});
				$('#email_send').on('click', function(event) {
					var temp = $(this).closest('tr');
					var temp_data = temp.find("td:eq(0)").html();
					var _title=$("#title_text").val();
					var _text=$("#textarea").val();
					if (_text.length &&  _title.length){
						
						$.ajax({
						url: "http://localhost:3000/sendmail",
						data: {
							name: temp_data,
							title:_title,
							text:_text
						},
						type: "GET",
						dataType: "json",
						success: function(data) {
							
						}
					});
					}else{
						var alert_html='<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert">&times;</a><small>警告！</small>邮件内容不全</div>'
						
						$("#myModalLabel").append(alert_html);
					}
					
					event.cancelBubble = true;
				});
			}
		}
	});
});
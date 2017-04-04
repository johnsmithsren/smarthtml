$(document).ready(function() {
	var _name=localStorage.getItem("name");
	$.ajax({
		
		url: "http://demaciaspower.cn/get_userInfo",
		//		      url: "http://localhost:3000/get_userInfo",
		data: {
			name:_name
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
			} else {console.log('ajax failed!')}
		}
	});
	function show_mapdata(name) {
		var _name = name;
		console.log(name)
		$.ajax({
			url: "http://demaciaspower.cn/get_stepdata",
			data: {
				name: _name
			},
			type: "GET",
			dataType: "json",
			success: function(data) {
				if(data) {
					console.log(data);
					var month = 1;
					var today = 1;
					var barChartData = {
						labels: [month + "月" + (today - 5) + "日", month + "月" + (today - 4) + "日", month + "月" + (today - 3) + "日", month + "月" + (today - 2) + "日", month + "月" + (today - 1) + "日", month + "月" + today + "日"],
						datasets: [{
							fillColor: "rgba(0,255,225,0.5)",
							strokeColor: "rgba(0,255,225,0.8)",
							highlightFill: "rgba(0,255,225,0.75)",
							highlightStroke: "rgba(0,255,225,1)",
							data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
						}]
					}
					var chart2 = document.getElementById("bar-chart").getContext("2d");
					window.myBar = new Chart(chart2).Bar(barChartData, {
						responsive: true
					});
				}
			}
		});
	}
	function send_mail(_title,_text,temp_data){
		$.ajax({
							url: "http://demaciaspower.cn/sendmail",
							data: {
								name: temp_data,
								title: _title,
								text: _text
							},
							type: "GET",
							dataType: "json",
							success: function(data) {

							}
						});
						$("#myemail").modal('hide');
	}
	
	
	
	
	$.ajax({
		url: "http://demaciaspower.cn/user_account",
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
				$('#show_map_data').on('click', function(event) {
					var temp = $(".monitor").closest('tr');
					var temp_data = temp.find("td:eq(0)").html();
					show_mapdata(temp_data);
				});
				$('#email_send').on('click', function(event) {
					var temp = $(this).closest('tr');
					var temp_data = temp.find("td:eq(0)").html();
					var _title = $("#title_text").val();
					var _text = $("#textarea").val();
					if(_text.length && _title.length) {
						send_mail(_title,_text,temp_data);
						$("#myemail").modal('hide');
					} else {
						var alert_html = '<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert">&times;</a><small>警告！</small>邮件内容不全</div>'
						$("#myModalLabel").append(alert_html);
					}
					event.cancelBubble = true;
				});
			}
		}
	});
});
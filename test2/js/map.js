/**
 * Created by renjm on 17/2/16.
 */
$(document).ready(function() {
	var weathre_data = localStorage.getItem('weather') || '';
	var _location = "上海"
	if(weathre_data.length) {
		$("#yellow").text(JSON.parse(weathre_data).weather_data[0].temperature + JSON.parse(weathre_data).weather_data[0].weather + " PM2.5: " + JSON.parse(weathre_data).pm25);
	} else {
		$.ajax({
			url: "http://api.map.baidu.com/telematics/v3/weather",
			data: {
				location: _location,
				output: "json",
				ak: "0169ec6b8279bb83d8cee6b827ecc428"
			},
			type: "GET",
			dataType: 'jsonp',
			success: function(data) {
				console.log(data.results[0]);
				localStorage.setItem('weather', JSON.stringify(data.results[0]))
			}
		});
	}
	var date = new Date();
	var today = date.getDate();
	var month = date.getMonth();

	var _name = localStorage.getItem("name");
	$.ajax({
		url: "http://demaciaspower.cn/get_news",
		data: {

		},
		type: "POST",
		dataType: "json",
		success: function(data) {
			if(data) {
				var temp_news = data.data[0].title;

				$("#marquee").text(temp_news);
			}
		}
	});

	var flag = false;
	$("#choose_date").click(function() {
		if(!flag) {
			$("#datepick1").css("display", "block")
			flag = true;
		} else {
			$("#datepick1").css("display", "none");
			flag = false;
		}

	})
	var temp_name = localStorage.getItem("name");
	$.ajax({
		url: "http://demaciaspower.cn/get_userInfo",
		data: {
			name: temp_name
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				if(data.data == "relogin") {
					localStorage.clear();
					window.location.href = "login.html";
				}
				var alertmap = data.data[0].mapinfo;
				console.log('123123123', alertmap);
				localStorage.setItem('alertmap', alertmap);
				localStorage.setItem('redius', data.data[0].radius);
				var temp = localStorage.getItem("name");
				console.log(temp, data.data)
				if(temp) {
					$('#user_name').text(temp);
				} else {
					localStorage.setItem("name", data.data[0].name);
					var temp = data.data[0].name;
					$('#user_name').text(temp);
				}
			} else {
				console.log('ajax failed!')
			}
		}
	});
	$('#user_logout').click(function() {
		var User_name = localStorage.getItem("name");
		var data1 = $.ajax({
			url: "http://demaciaspower.cn/dashboard/logout",
			data: {
				user_name: User_name
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
				localStorage.removeItem("name");
				localStorage.clear();
				window.location.href = "login.html";
			}
		});
	});
});
var flag3;
var flag2 = false;
var flag4 = false;
var flagtostop = false;

function show_tempmapinfo() {
	var _shoecode = localStorage.getItem('shoe_code');
	$.ajax({
		url: "http://demaciaspower.cn/getlastepinfo",
		data: {
			shoe_code: _shoecode
		},
		type: "get",
		dataType: "json",
		success: function(data) {
			if(data) {
				var pointA = [];
				pointA.push(new BMap.Point(data.data[0].latitude, data.data[0].longitude));
				tranCallback = function(result) {
					console.log(result);
					var map = new BMap.Map("allmap");
					map.enableScrollWheelZoom(true);
					map.centerAndZoom(result.points[0], 17);
					map.addControl(new BMap.NavigationControl());
					map.addControl(new BMap.ScaleControl());
					map.addControl(new BMap.OverviewMapControl());
					map.clearOverlays();
					var marker = new BMap.Marker(result.points[0]); // 创建标注
					map.addOverlay(marker); // 将标注添加到地图中
					map.panTo(result.points[0]);
				}
				var conv = new BMap.Convertor();
				conv.translate(pointA, 1, 5, tranCallback);

			}
		}
	});
}

function show_mapFlag() {
	Time1 = new Date().getTime();
	Time1 = Time1 - 35000;
	if(!flagtostop) {
		flag2 = true;
		flagtostop = false;
	}
	localStorage.setItem("starttime", Time1);
	if(!flag2) {
		flag4 = false;
		$("#update_mapdata").text("停止计时");
		$("#update_mapdata").attr("class", "btn btn-info")
		flag3 = setInterval(datashow, 15000);
		flag2 = true;
	} else {
		$("#update_mapdata").text("计时运动");
		$("#update_mapdata").attr("class", "btn btn-primary");
		localStorage.removeItem('starttime');
		clearInterval(flag3);
		flag2 = false;
	}
	flagtostop = true;
}
var _flag2 = true;

function show_mapbytime() {
	if(_flag2) {
		flag2 = false;
		$("#update_data").text("停止定位");
		$("#update_data").attr("class", "btn btn-info");
		datashowbytime();
		_flag4 = setInterval(datashowbytime, 15000);
		_flag2 = false;
	} else {
		$("#update_data").text("实时定位");
		$("#update_data").attr("class", "btn btn-primary");
		localStorage.removeItem('starttime');
		clearInterval(_flag4);
		_flag2 = true;
	}

}

function btnshow() {
	var _testTime1 = document.getElementById("datestart").value;
	_testTime1 = _testTime1.replace(/\-/g, '/');
	_testTime1 = new Date(_testTime1).getTime();
	localStorage.setItem("starttime1", _testTime1);
	var _testTime2 = document.getElementById("dateend").value;
	_testTime2 = _testTime2.replace(/\-/g, '/');
	_testTime2 = new Date(_testTime2).getTime();
	localStorage.setItem("endtime1", _testTime2);
	if(_testTime1 && _testTime2) {
		console.log(JSON.stringify(_testTime1), JSON.stringify(_testTime2))
		var _tempTime1 = new Date(_testTime1).getTime();
		var _tempTime2 = new Date(_testTime2).getTime();
		flag4 = true;
		datashow(_tempTime1, _tempTime2);
	} else {
		var temp1 = '<div class="alert alert-warning">' +
			'<a href="#" class="close" data-dismiss="alert">' +
			'&times;' +
			'</a>' +
			'<strong>警告！</strong>请填写日期。' +
			'</div>'
		$("._error").append(temp1);
		setTimeout(function() {
			$('[data-dismiss=alert]').alert('close');
		}, 2000);
	}
}
var start_time;

function datashowbytime() {
	function testweather() {
		var temp_data;
		var _shoe_code = localStorage.getItem("shoe_code");
		var _account = localStorage.getItem("name");
		$.ajax({
			url: "http://demaciaspower.cn/select_map_info",
			data: {
				shoe_code: _shoe_code,
				account: _account,
				startTime: temp_startime,
				endTime: temp_endtime
			},
			type: "GET",
			dataType: "json",
			success: function(data) {
				if(data) {
					if(data.data.length) {
						var pointA = [];
						pointA.push(new BMap.Point(data.data[0].latitude.toFixed(10), data.data[0].longitude.toFixed(10)));
						var temp_voltage = data.data[0].voltage;
						if(temp_voltage > 4) {
							temp_vol = temp_voltage + "电量高";
						} else if(temp_voltage < 3.5) {
							temp_vol = temp_voltage + "电量中";
						} else {
							temp_vol = temp_voltage + "电量低";
						}
						$('#vol').text(temp_vol);
						tranCallback = function(result) {
							map.addOverlay(new BMap.Marker(result.points[0]));
						}
						var conv = new BMap.Convertor();
						conv.translate(pointA, 1, 5, tranCallback);
					} else {
						flag2 = true;
						//					show_mapFlag();
						//					tempmapshow();
						localStorage.removeItem('disnow');
						var temp = '<div class="alert alert-warning">' +
							'<a href="#" class="close" data-dismiss="alert">' +
							'&times;' +
							'</a>' +
							'<strong>警告！</strong>没有实时GPS信号。将显示旧数据' +
							'</div>'
						$("._error").append(temp);
						setTimeout(function() {
							$('[data-dismiss=alert]').alert('close');
						}, 2000);
						console.log('@@!@!@!@');
						_data=[new BMap.Point(121.2347, 31.23),new BMap.Point(121.47343, 31.23),new BMap.Point(121.56577, 31.23)];
						map.clearOverlays();
						for(var i=0;i<3;i++){
							map.addOverlay(new BMap.Marker(_data[i]));
						}
						map.addOverlay(new BMap.Marker(new BMap.Point(121.47, 31.23)));
					}

				}
			}
		});
	}
	var map = new BMap.Map("allmap");
	map.enableScrollWheelZoom(true);
	map.centerAndZoom(new BMap.Point(121.47, 31.23), 17);
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
	//	map.addOverlay(new BMap.Marker(first_point));
	temp_startime = new Date().getTime() - 35000;
	temp_endtime = new Date().getTime();
	var weathre_data = localStorage.getItem('weather') || '';
	var _location = "上海"
	if(weathre_data.length) {
		//		setInterval(testweather, 2000);
		$("#yellow").text(JSON.parse(weathre_data).weather_data[0].temperature + JSON.parse(weathre_data).weather_data[0].weather + " PM2.5: " + JSON.parse(weathre_data).pm25);
	} else {
		//		setInterval(testweather, 2000);
	}
	setInterval(testweather, 15000);
}

var temp_log = true;

function mapshowbytime(first_point) {
	var _test = localStorage.getItem('alertmap');
	var _redius = localStorage.getItem('redius')
	_test = JSON.parse(_test);
	var _data = Distance(first_point.lat, first_point.lng, _test.lat, _test.lng);
	_data = _data * 1000;

	localStorage.setItem('disnow', _data);
	var map = new BMap.Map("allmap");
	map.enableScrollWheelZoom(true);
	map.centerAndZoom(first_point, 17);
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
	map.addOverlay(new BMap.Marker(first_point));
}

function datashow(_starttime, _endtime) {
	var _startTime = _starttime;
	var _endTime = _endtime;
	var weathre_data = localStorage.getItem('weather') || '';
	if(_startTime) {

	} else {
		_startTime = localStorage.getItem('starttime');
	}
	if(_endTime) {

	} else {
		_endTime = new Date().getTime();
	}
	var _location = "上海"
	if(weathre_data.length) {
		$("#yellow").text(JSON.parse(weathre_data).weather_data[0].temperature + JSON.parse(weathre_data).weather_data[0].weather + " PM2.5: " + JSON.parse(weathre_data).pm25);
	} else {
		$.ajax({
			url: "http://api.map.baidu.com/telematics/v3/weather",
			data: {
				location: _location,
				output: "json",
				ak: "0169ec6b8279bb83d8cee6b827ecc428"
			},
			type: "GET",
			dataType: 'jsonp',
			success: function(data) {
				console.log(data.results[0]);
				localStorage.setItem('weather', JSON.stringify(data.results[0]));
				$("#yellow").text(JSON.parse(data.results[0]).weather_data[0].temperature + JSON.parse(data.results[0]).weather_data[0].weather + " PM2.5: " + JSON.parse(data.results[0]).pm25);
			}
		});
	}
	var temp_data;
	var _shoe_code = localStorage.getItem("shoe_code");
	var _account = localStorage.getItem("name");
	if(flag4) {
		_startTime = _starttime;
		_endTime = _endtime;
		console.log('----------', _startTime, _endTime);
		flag2 = true;
		show_mapFlag();
	}
	$.ajax({
		url: "http://demaciaspower.cn/select_map_info",
		data: {
			shoe_code: _shoe_code,
			account: _account,
			startTime: _startTime,
			endTime: _endTime
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				if(data.data.length) {
					var pointA = [];
					pointA.push(new BMap.Point(data.data[0].latitude.toFixed(10), data.data[0].longitude.toFixed(10)));
					tranCallback = function(result) {
						mapshow(result.points[0], data.data);
					}
					var conv = new BMap.Convertor();
					conv.translate(pointA, 1, 5, tranCallback);
				} else {
					flag2 = true;
					show_mapFlag();

					tempmapshow();
					var temp = '<div class="alert alert-warning">' +
						'<a href="#" class="close" data-dismiss="alert">' +
						'&times;' +
						'</a>' +
						'<strong>警告！</strong>没有GPS信号。' +
						'</div>'
					$("._error").append(temp);
					setTimeout(function() {
						$('[data-dismiss=alert]').alert('close');
					}, 2000);
				}

			}
		}
	});
}

function theLocation() {
	if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != "") {
		map.clearOverlays();
		var new_point = new BMap.Point(document.getElementById("latitude").value, document.getElementById("longitude").value);
		var marker = new BMap.Marker(new_point); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
		map.panTo(new_point);
	}
}

function calorie(weight, distance) {
	return weight * distance * 1.036
}

function HaverSin(theta) {
	var v = Math.sin(theta / 2);
	return v * v;
}

function Distance(lat1, lon1, lat2, lon2) {
	var EARTH_RADIUS = 6378.137;
	lat1 = lat1 * Math.PI / 180;
	lon1 = lon1 * Math.PI / 180;
	lat2 = lat2 * Math.PI / 180;
	lon2 = lon2 * Math.PI / 180;
	var lon = Math.abs(lon1 - lon2);
	var lat = Math.abs(lat1 - lat2);
	var h = HaverSin(lat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(lon);
	var distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
	return distance;
}
var clickflag = true;

function clickfunc() {
	if(clickflag) {
		$("#datashow").css("display", "none");
		$("#allmap").css("height", "450px");
		$("#show_data").click();
		clickflag = false;
	} else {
		$("#datashow").css("display", "block");
		$("#allmap").css("height", "300px");
		$("#show_data").click();
		clickflag = true;
	}
}

function clickfunc2() {
	if(clickflag) {
		$("#datashow").css("display", "none");
		$("#allmap").css("height", "450px");
		clickflag = false;
	} else {
		$("#datashow").css("display", "block");
		$("#allmap").css("height", "300px");
		clickflag = true;
	}
}

function tempmapshow() {
	var map = new BMap.Map("allmap");
	map.enableScrollWheelZoom(true);
	map.centerAndZoom(new BMap.Point(121.47, 31.23), 13);
	map.setCurrentCity("上海");
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
}

function showinfo() {
	$.ajax({
		url: "http://demaciaspower.cn/testshowinfo",
		data: {

		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {

				$('#testforbishe').val(data.data[0].latitude);
			}
		}
	});
}
var _flag = true;

function showbutton() {
	if(_flag) {
		$("#choose_date").css("display", "inline-block");
		$('#show_data').css('display', 'inline-block');
		_flag = false;
	} else {
		$("#choose_date").css("display", "none");
		$('#show_data').css('display', 'none');
		_flag = true;
	}
}

function mapshow(first_point, temp_data) {
	var map = new BMap.Map("allmap");
	map.enableScrollWheelZoom(true);
	map.centerAndZoom(first_point, 15);
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
	var te_time = localStorage.getItem('starttime');
	if(te_time) {
		map.addEventListener("click", clickfunc2);
	} else {
		map.addEventListener("click", clickfunc);
	}
	var map_data = [];
	var Dis = 0;
	var time = temp_data[1].create_time - temp_data[0].create_time
	var temp_DisforSpeed = Distance(temp_data[0].longitude, temp_data[0].latitude, temp_data[1].longitude, temp_data[1].latitude);
	var Speed = temp_DisforSpeed * 1000 / time;
	$('.Speed').text(Speed.toFixed(2));
	if(temp_data.length) {
		var time2 = (temp_data[temp_data.length - 1].create_time - temp_data[0].create_time) / 60
		for(var i = 0; i < temp_data.length - 1; i++) {
			var point1 = new BMap.Point((temp_data[i].latitude).toFixed(10), (temp_data[i].longitude + 0.00001888).toFixed(10));
			map_data.push(point1);
			var temp_Dis = Distance(temp_data[i].latitude, temp_data[i].longitude, temp_data[i + 1].latitude, temp_data[i + 1].longitude);
			Dis = Dis + temp_Dis;
			var excite = parseInt(temp_data[i].step_number) - parseInt(temp_data[i + 1].step_number);
			var Calorie = calorie(temp_data[0].weight, Dis);
			var exciting;
			excite = Math.abs(excite) || 0;
			var temp_voltage = temp_data[temp_data.length - 1].voltage;
			if(temp_voltage > 4) {
				temp_vol = temp_voltage + "电量高";
			} else if(temp_voltage < 3.5) {
				temp_vol = temp_voltage + "电量中";
			} else {
				temp_vol = temp_voltage + "电量低";
			}
			if(excite > 0) {
				exciting = "活跃 " + excite;
			} else if(excite > 3) {
				exciting = "很活跃 " + excite;
			} else if(excite > 10) {
				exciting = "非常活跃 " + excite;
			} else {
				exciting = "不活跃 " + excite;
			}
		}
		$('#vol').text(temp_vol);
		$('#easypiechart-red').data('easyPieChart').options.barColor = '#0033CC';
		$('#easypiechart-red').data('easyPieChart').update(Speed.toFixed(2));
		$('#red').text(Speed.toFixed(2));
		$('#blue').text(Dis.toFixed(2));
		$('#teal').text(time2.toFixed(2));
		$('#grey').text((Calorie).toFixed(2));
		$('#green').text(exciting);
		$('#easypiechart-teal').data('easyPieChart').update(time2);
		$('#easypiechart-blue').data('easyPieChart').update(Dis.toFixed(2));
		$('#easypiechart-grey').data('easyPieChart').update((Calorie * 250).toFixed(2));
		translateCallback = function(data) {
			if(data.status === 0) {
				var color = ['#cecef5', '#aeaef4', '#9e9ef4', '#8787f5', '#6b6bf2', '#4f4ff0', '#3333f0', '#1919f2', '#0505f4', '#0e0e1a']
				var _dis = Distance(data.points[0].lng, data.points[0].lat, data.points[8].lng, data.points[8].lat);
				var speed = _dis * 5;
				var j = JSON.stringify(1 / speed).substring(2, 3);
				var polyline = new BMap.Polyline(data.points, {
					strokeColor: color[10 - j],
					strokeWeight: 3,
					strokeOpacity: 1
				});
				map.addOverlay(polyline);
			}
		}
		var convertor = new BMap.Convertor();
		var temp = [];
		var j = 0;
		for(var a = 0; a < map_data.length - 2; a++) {
			temp[j] = map_data[a];
			j++;
			if(j % 8 == 0) {
				temp[j] = map_data[a + 1];
				convertor.translate(temp, 1, 5, translateCallback);
				j = 0;
				temp = [];
			}
		}
	} else {
		console.log('no data');
	}
}
datashowbytime();
//setInterval(datashowbytime, 20000);
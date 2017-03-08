/**
 * Created by renjm on 17/2/16.
 */
//var map = new BMap.Map("allmap")    // 创建Map实例
//map.centerAndZoom(new BMap.Point(121.48, 31.22), 11); // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl())  //添加地图类型控件
//map.addControl(new BMap.NavigationControl());
//map.addControl(new BMap.ScaleControl());
//map.addControl(new BMap.OverviewMapControl());
//map.setCurrentCity("上海")          // 设置地图显示的城市 此项是必须设置的
//
//map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放
//var myDis = new BMapLib.DistanceTool(map);
//map.setCurrentCity("上海");
//map.addEventListener("load",function(){
//    myDis.open();  //开启鼠标测距
//    //myDis.close();  //关闭鼠标测距大
//});
// 百度地图API功能
//$('.hello').click(function(){
//  //alert('hi');
//  var data3=''
//  var data1=$.ajax({
//      url: "http://localhost:3000/select",
//      data: {
//          id: 123
//      },
//      type: "GET",
//      dataType : "json",
//      success:function(data){
//          if(data){
//              data3=data;
//              $(".hello").text(data3.data[0].tel);
//          } else{
//              console.log('ajax failed!')
//          }
//      }
//  });
//
//});
//$('.test').click(function(){
//    //alert('helo world');
//    var data3=''
//    $.ajax({
//        //url: "http://localhost:3000/getmess",
//        url: "http://www.demaciaspower.cn:3000/getmess",
//        data: {
//            name: 'renjm'
//        },
//        type: "GET",
//        dataType : "json",
//        success:function(data){
//            if(data){
//                //data3=data;
//                //window.location.href=('http://www.demaciaspower.cn:3000/?'+JSON.stringify(data3.data[0]));
//                data3=data;
//                $(".test").text(JSON.stringify(data3.data[0]));
//            } else{
//                console.log('ajax failed!')
//            }
//        }
//    });

//$(document).ready(function(){
//	var map = new BMap.Map("allmap");
//	map.centerAndZoom(new BMap.Point(121.48,31.22),11);
//	map.enableScrollWheelZoom(true);
// 用经纬度设置地图中心点
//	function theLocation(){
//      map.clearOverlays();
//      var new_point = new BMap.Point('121.6044990000','31.2546250000');
//      var marker = new BMap.Marker(new_point);  // 创建标注
//      map.addOverlay(marker);              // 将标注添加到地图中
//      map.panTo(new_point);
//	}
//	theLocation();
//	function theLocation(){
//		alert('hello world');
//		if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != ""){
//			map.clearOverlays(); 
//			var new_point = new BMap.Point(document.getElementById("longitude").value,document.getElementById("latitude").value);
//			var marker = new BMap.Marker(new_point);  // 创建标注
//			map.addOverlay(marker);              // 将标注添加到地图中
//			map.panTo(new_point);      
//		}
//	}
//	$('#gps_update').click(function() {
//      $.ajax({
//          url: "http://demaciaspower.cn:3000/gps",
//          data: {
//              latitude:'121.6044990000',
//              longitude:'31.2546250000'
//          },
//          type: "GET",
//          dataType : "json",
//          success:function(data){
//              if(data){
//
//              }
//          }
//      });
//});

$(document).ready(function() {
	var date = new Date();
	var today = date.getDate();
	var month = date.getMonth();
//	$.ajax({
//		url: "http://demaciaspower.cn/get_stepdata",
//		data: {
//
//		},
//		type: "GET",
//		dataType: "json",
//		success: function(data) {
//			if(data) {
//				if(data.data.length) {
//					var barChartData = {
//						labels: [month + "月" + (today - 5) + "日", month + "月" + (today - 4) + "日", month + "月" + (today - 3) + "日", month + "月" + (today - 2) + "日", month + "月" + (today - 1) + "日", month + "月" + today + "日"],
//						datasets: [{
//								fillColor: "rgba(0,255,225,0.5)",
//								strokeColor: "rgba(0,255,225,0.8)",
//								highlightFill: "rgba(0,255,225,0.75)",
//								highlightStroke: "rgba(0,255,225,1)",
//								data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
//							}
//
//						]
//
//					}
//					var chart2 = document.getElementById("bar-chart").getContext("2d");
//					window.myBar = new Chart(chart2).Bar(barChartData, {
//						responsive: true
//					});
//				} else {
//					console.log('no data');
//				}
//
//			}
//		}
//	});

	var flag = false;
	$("#map_hideshow").click(function() {
			if(!flag) {
				$('#map_show_hide').css("display", "block");
				flag = true;
			} else {
				$('#map_show_hide').css("display", "none");
				flag = false;
			}

		})
		//	$('#easypiechart-red').data('easyPieChart').options.barColor = '#0033CC';
		//	$('#easypiechart-red').data('easyPieChart').update(50)
	$.ajax({
		url: "http://demaciaspower.cn/get_userInfo",
		//		      url: "http://localhost:3000/get_userInfo",
		data: {

		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				var temp = localStorage.getItem("name");
				if(temp.length) {
					$('#user_name').text(temp);
				} else {
					var temp = data.name;
					$('#user_name').text(temp);
				}

			} else {
				console.log('ajax failed!')
			}
		}
	});

	$('#user_logout').click(function() {
		var User_name = $('#user_name').val();
		var data1 = $.ajax({
			url: "http://demaciaspower.cn/dashboard/logout",
			//			      url: "http://localhost:3000/dashboard/logout",
			data: {
				user_name: User_name
			},
			type: "POST",
			dataType: "json",
			success: function(data) {
				if(data) {
					window.location.href = 'login.html'
				} else {
					console.log('ajax failed!')
				}
			}
		});

	});
});
//var map = new BMap.Map("allmap");
//map.centerAndZoom(new BMap.Point(121.48, 31.22), 18);
//map.enableScrollWheelZoom(true);
//map.addControl(new BMap.NavigationControl());  
//map.addControl(new BMap.ScaleControl());  
//map.addControl(new BMap.OverviewMapControl());

function datashow() {
	var temp_data;
	$.ajax({
		url: "http://demaciaspower.cn/select_map_info",
		data: {

		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			if(data) {
				if(data.data.length) {
					mapshow(data.data);
				} else {
					console.log('no data');
				}

			}
		}
	});
}

function theLocation() {
	if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != "") {
		map.clearOverlays();
		var new_point = new BMap.Point(document.getElementById("longitude").value, document.getElementById("latitude").value);
		var marker = new BMap.Marker(new_point); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
		map.panTo(new_point);
	}
}

function calorie(weight, distance) {
	return weight * distance * 1.4
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

//setInterval(datashow,12000);
//clearInterval();
function mapshow(temp_data) {
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(temp_data[0].longitude, temp_data[0].latitude), 18);
	map.enableScrollWheelZoom(true);
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
	var map_data = [];
	if(temp_data.length) {

		var time = temp_data[0].create_time - temp_data[1].create_time
		var time2 = (temp_data[0].create_time - temp_data[temp_data.length - 1].create_time) / 60
		for(var i = 0; i < temp_data.length; i++) {
			var point1 = new BMap.Point(temp_data[0].longitude, temp_data[0].latitude);
			map_data.push(point1);
			var Dis = Distance(temp_data[0].longitude, temp_data[0].latitude, temp_data[i].longitude, temp_data[i].latitude);
			var Calorie = calorie(temp_data[i].Weight, Dis);
			var Speed = Dis * 1000 / time;
			$('.destination').text(Dis.toFixed(2));
			$('.Calorie').text((Calorie * 1000).toFixed(2));
			$('.Speed').text(Speed.toFixed(2));
		}
		$('#easypiechart-red').data('easyPieChart').options.barColor = '#0033CC';
		$('#easypiechart-red').data('easyPieChart').update(Speed.toFixed(2))
		$('#red').text(Speed.toFixed(2))
		$('#blue').text(Dis.toFixed(2))
		$('#teal').text(time2.toFixed(2))
		$('#easypiechart-teal').data('easyPieChart').update(time2)
		$('#easypiechart-blue').data('easyPieChart').update(Dis.toFixed(2))
		var polyline = new BMap.Polyline([new BMap.Point(121.5578, 31.244), new BMap.Point(121.55790, 31.2445666)], {
			strokeColor: "blue",
			strokeWeight: 10,
			strokeOpacity: 0.5
		});
		map.addOverlay(polyline);
	} else {
		console.log('no data');
	}
}

datashow();
//})
//var map = new BMap.Map("allmap");
//map.centerAndZoom(new BMap.Point(121.48, 31.22), 11);
//var myP1 = new BMap.Point(121.4823341,31.22123123);    //起点
//var myP2 = new BMap.Point(121.4812323,31.22234223);    //终点
//var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
//    //offset: new BMap.Size(0, -5),    //相当于CSS精灵
//    imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
//});
//var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
//driving2.search(myP1, myP2);    //显示一条公交线路
//
//window.run = function (){
//    var driving = new BMap.DrivingRoute(map);    //驾车实例
//    driving.search(myP1, myP2);
//    driving.setSearchCompleteCallback(function(){
//        var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
//        var paths = pts.length;    //获得有几个点
//        var carMk = new BMap.Marker(pts[0],{icon:myIcon});
//        map.addOverlay(carMk);
//        i=0;
//        function resetMkPoint(i){
//            carMk.setPosition(pts[i]);
//            if(i < paths){
//                setTimeout(function(){
//                    i++;
//                    resetMkPoint(i);
//                },500);
//            }
//        }
//        setTimeout(function(){
//            resetMkPoint(5);
//        },100)
//
//    });
//}
//
/** 
 *<p>Title:盼达后台管理</p> 
 *<p>Description:强制换车</p>
 *<p>Copyright: Copyright (c) 2016</p> 
 *<p>Company:重庆无线绿洲</p> 
 * @author zouyan
 * @version 1.0 2016-08-22
 */
var forcedManager = {
	init:function(){
		var g = this;	
	},
	_save:function(){
		$(".forced-prompt-info").html("");
		var stationId = $("#stationId").val();
		var result = false;
		if(stationId==""){
			$("#stationIdInfo").html("请选择还车站点！");
			return result;
		}
		var options = {
			async : false,
	        type: "POST",
	        dataType: "json",
	        url: pageContext+"/vehicle/forcedVehicle/"+$("#applicId").val()+"/"+stationId,
	        success: function (data) {
	        	if(data)result = true;
	        	else alert(data);
	        },
	        error: function (msg) {}};
		$._ajax(options);
		return result;
	}
}

$(function(){
	forcedManager.init();
});
var vehicleUpdateManager = {
	init:function(){
		
	},
	_update:function(){
		var param={};
		param["vehicleId"]=$("#vehicleId").val();
		param["operateStatus"]=$("#operateStatus").val();
		param["cityId"]=$("#cityId").val();
		param["districtId"]=$("#districtId").val();
		param["companyId"]=$("#companyId").val();
		param["stationId"]=$("#stationId").val();
//		param["vehicleUse"]=$("#use_select").val();
		var result = false;
		var options = {
			async : false,
	        type: "POST",
	        dataType: "json",
	        data: param,
	        url: pageContext+"/vehicle/update",
	        success: function (data) {
	        	result = $._validation(data);
	        },
	        error: function (msg) {}};
		$._ajax(options);
		return result;
	}
}

$(function(){
	vehicleUpdateManager.init();
});
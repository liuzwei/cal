/** 
 *<p>Title:盼达后台管理</p> 
 *<p>Description:企业可用车辆</p>
 *<p>Copyright: Copyright (c) 2016</p> 
 *<p>Company:重庆无线绿洲</p> 
 * @author zouyan
 * @version 1.0 2016-07-05
 */
vehicleAvailable = {
	cache:{
    	tableList:null
    },  
	init:function(){
	    this._initEvent(); 
	    this._initRender();
	},
	/**
	 * 事件初始化
	 */
	_initEvent:function(){
		var  g = this;
		//查询
		$("#selectBtn").click(function(){
			g.cache.tableList.ajax.reload();
		});

		//清空条件
		$("#resetBtn").click(function(){
			$(".form-horizontal").find("input[type='text']").val("");
			$(".form-horizontal").find("select").val("");
		});

	},
	/**
	 * 页面渲染
	 */
	_initRender:function(){
		var  g = this;
		g._select();
	},
	/**
	 * 查询
	 */
	_select:function(){
		var g =this;
		g.cache.tableList = $('#tableList').DataTable({
			"ajax":{
			    "url":pageContext+"/vehicle/availableList",
			    "type": "post",
			    "async":true,
			    "data": function ( d ) {
			    	d.applicId=$.trim($("#applicId").val()),
			    	d.vehicleTypeId=$.trim($("#vehicleTypeId").val()),
			    	d.stationId=$.trim($("#stationId").val())
		        }
		    } ,
		    "aoColumns": [
		        { data: null, render: function ( data, type, row ) {
					  return '<input type="radio"  name="chick-radio" class="radio-bid" value='+row.id+' />';
				}},
				{ "data": "license" },
				{ "data": "vehicleStatus" },
				{ "data": "vehicleTypeName" },
				{ "data": "stationName"},
				{ "data": "dcdl"}]
		});
	},
	_save:function(){
		var result = false;
		var vehicleId = $("input[name='chick-radio']:checked").val();
		var options = {
			async : false,
	        type: "POST",
	        dataType: "json",
	        url: pageContext+"/vehicle/toForcedVehicle/"+$("#applicId").val()+"/"+vehicleId,
	        success: function (data) {
	        	if(data)result = true;
	        	else alert(data);
	        },
	        error: function (msg) {}};
		$._ajax(options);
		return result;
	}
};
$(function(){
	vehicleAvailable.init();
});

var AllotManager = function(){};

AllotManager.prototype = {
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
		//table复选框
		$("#station_box").click(function(){
			var gc = $(this);
			if(gc.is(':checked')) { 
				gc.parents("table").find("tbody tr").each(function(){
					$(this).find(".checkbox-bid").prop("checked",'true');	
				});
			}else{
				gc.parents("table").find("tbody tr").each(function(){
					$(this).find(".checkbox-bid").removeAttr("checked");
				});
			}	
		});
		/*$(":checkbox").click(function() {
			if ($(this).attr("checked") != undefined) {
				$(this).siblings().attr("checked", false);
				$(this).attr("checked", true);
			}
		}); */
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
			    "url":pageContext+"/station/list",
			    "type": "post",
			    "async":true,
			    "data": function ( d ) {
			    	d.stationName=$.trim($("#stationName").val())
		        }
		    } ,
		    "aoColumns": [
				{ data: null, render: function ( data, type, row ) {
					  return '<input type="checkbox" class="checkbox-bid" bid='+data.stationId+' />';
				}},
				{ "data": "stationName" },
				{ "data": "stationCode" },
				{ "data": "stationAddress"},
				{ "data": "longtitude"},
				{ "data": "latitude"}
				]
		});
	},
	_allot:function(vehicleID){
		debugger;
		var isc = $("#tableList tbody").find(".checkbox-bid:checked");
		if(isc.length==0){
			alert("请选择要分配的车辆数据！");
//			g._confirm({message : "请选择要修改的数据！"});
		}else if(isc.length>1){
			alert("至多只能选择一条网点记录！");
		}else{
			var g = this;
			var id="";
			$("#tableList tbody tr").each(function(){
				var cg = $(this);
	    		if(cg.find("td .checkbox-bid").is(':checked')){
	    			id +=$(this).find(".checkbox-bid").attr("bid")+",";
	    		}
			}); 
			if(id!=""){
				id = id.substring(0,id.length-1);
				var param={};
				param["vehicleID"] = vehicleID;
				param["stationID"] = id;
				var result = false;
				var options = {
					async : false,
			        type: "POST",
			        dataType: "json",
			        url: pageContext+"/vehicle/allot",
			        data:param,
			        success: function (data) {
			        	result = data;
			        },
			        error: function (msg) {}};
				$._ajax(options);
				return result;
			}
		}
	}
};
var allot = null;
$(function(){
	allot = new AllotManager();
	allot.init();
});

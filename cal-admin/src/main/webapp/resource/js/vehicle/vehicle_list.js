/** 
 *<p>Title:盼达后台管理</p> 
 *<p>Description:车辆信息</p>
 * @author songzhipeng
 */
var vehicleManager = function(){};

vehicleManager.prototype = {
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
		$("#resetButton").click(function(){
			g._reset();
		});
		//车辆分配
		$("#allotBtn").click(function(){
			g._batchallot();
		});
		//批量删除
		$("#deleteBtn").click(function(){
			g._batchdelete();
		});
		//城市下拉选择
		$("#city_select").change(function(){
			var cityID = $("#city_select").val();
			if(cityID!=""){
				$.ajax({
					type:"POST",
					url:pageContext+"/vehicle/getDistrict",
					data:{"cityID":cityID},
					success:function(_data){
						var data = $.parseJSON(_data);
						if(data!=null && data!=""){
							var list = data.district;
							var html = "<option value='' >--选择区域--</option>";
							for(var i=0; i<list.length; i++){
								var e = list[i];
								html +="<option value='"+e.id+"' >"+e.name+"</option>";
							}
							$("#district_select").html(html);
						}
					}
				});
			}else{
				$("#district_select").empty();
				$("#district_select").html("<option value='' >--选择区域--</option>");
			}
		});
		//table复选框
		$("#vehicle_box").click(function(){
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
			    "url":pageContext+"/vehicle/list",
			    "type": "post",
			    "async":true,
			    "data": function ( d ) {
			    	d.license=$.trim($("#license").val()),//车牌号
			    	d.vehicleType=$.trim($("#vehicleType").val()),//车型
			    	d.operateStatus=$.trim($("#operateStatus").val()),//运营状态
			    	d.stationId=$.trim($("#stationId").val())//网点
		        }
		    } ,
		    "aoColumns": [
				{ data: null, render: function ( data, type, row ) {
					  return '<input type="checkbox" class="checkbox-bid" bid='+data.vehicleId+' />';
				}},
				{ "data": "license" },//车牌号
				{ "data": "vehicleTypeName"},//车型
				{ "data": "vehicleColorName" },//车身颜色
				{ "data": "vehicleStatusName"},//车辆状态
				{ "data": "operateStatusName" },//运营状态
				{ "data": "doorStatusName"},//车门状态
				{ "data": "stationName"},//当前网点
//				{ "data": "vehiclePurposeName"},//车辆用途
				{ "data": "curElectric"},//电池电量
                { data: null, render: function ( data, type, row ) {
                	return '<a href="javascript:vehicle._update(\''+ data.vehicleId +'\')">修改</a>&nbsp;'+
//                		   '<a href="javascript:vehicle._delete(\''+ data.vehicleId +'\')">删除</a>&nbsp;'+
                		   '<a href="javascript:vehicle._allot(\''+ data.vehicleId +'\')">分配</a>';
                }}]
		});
	},
	/**
	 * 清空条件
	 */
	_reset:function(){
		$("#license").val("");
		$("#vehicleType").val("");
		$("#operateStatus").val("");
//    	$("#use_select").val("");
    	$("#stationId").val("");
	},
	/**
	 * 修改
	 */
	_update:function(vehicleID){
    	var g = this;
		var url = pageContext+"/vehicle/toUpdate/"+vehicleID;
    	parent.BootstrapDialog.show({
			title: "编辑车辆信息", size:parent.BootstrapDialog.SIZE_WIDE, 
            closeByBackdrop: false,
            closeByKeyboard: false,
			message: '<iframe id="vehicleUpdateIframe" width="100%" height="450px" src="'+url+'" frameborder="0"  seamless></iframe>',
            buttons: [ {
                label: '确定',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	if((parent.$("#vehicleUpdateIframe")[0].contentWindow.vehicleUpdateManager)._update()){
                		dialogItself.close();
                		g.cache.tableList.ajax.reload();
                	}
                }
            },{
                label: '取消',
                cssClass:"btn-default",
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]
        });
    },
    /**
	 * 删除
	 */
	_delete:function(vehicleID){
    	var g = this;
    	parent.BootstrapDialog.show({
			title: "编辑车辆信息", size:150, 
            closeByBackdrop: false,
            closeByKeyboard: false,
            width:200,
			message: '是否确定删除？',
            buttons: [ {
                label: '确定',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	$.ajax({
    					type:"POST",
    					url:pageContext+"/vehicle/delete",
    					data:{"vehicleID":vehicleID},
    					success:function(_data){
    						if(_data){
    	                		dialogItself.close();
    	                		g.cache.tableList.ajax.reload();
    	                	}
    					}
    				});
                }
            },{
                label: '取消',
                cssClass:"btn-default",
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]
        });
    },
    /**
	 * 批量删除
	 */
    _batchdelete:function(){
    	var isc = $("#tableList tbody").find(".checkbox-bid:checked");
		if(isc.length==0){
			alert("请选择要删除的车辆数据！");
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
				this._delete(id);
			}
		}
    },
    /**
	 * 分配（单条）
	 */
	_allot:function(vehicleID){
    	var g = this;
		var url = pageContext+"/vehicle/toAllot/"+vehicleID;
    	parent.BootstrapDialog.show({
			title: "选择网点信息", size:parent.BootstrapDialog.SIZE_WIDE, 
            closeByBackdrop: false,
            closeByKeyboard: false,
			message: '<iframe id="vehicleAllotIframe" width="100%" height="450px" src="'+url+'" frameborder="0"  seamless></iframe>',
            buttons: [ {
                label: '确定',
                cssClass: 'btn-primary',
                action: function(dialogItself){
                	if((parent.$("#vehicleAllotIframe")[0].contentWindow.allot)._allot(vehicleID)){
                		dialogItself.close();
                		g.cache.tableList.ajax.reload();
                	}
                }
            },{
                label: '取消',
                cssClass:"btn-default",
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]
        });
    },
    /**
     * 车辆分配（批量）
     */
    _batchallot:function(){
    	var isc = $("#tableList tbody").find(".checkbox-bid:checked");
		if(isc.length==0){
			alert("请选择要分配的车辆数据！");
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
				this._allot(id);
			}
		}
    },
	/**
	 * 详情
	 * @param id
	 */
	_view:function(id){
		var url = pageContext+"/company/toView/"+id;
		parent.BootstrapDialog.show({
			title: "公司信息",
			message: $('<div></div>').load(url),
			closeByBackdrop: false,
            closeByKeyboard: false,
            buttons: [{
                label: '取消',
                action: function(dialog){
                	dialog.close();
                }
            }]
        });
	}
};
var vehicle = null;
$(function(){
	vehicle = new vehicleManager();
	vehicle.init();
});
var DoorStatus = {
		"0":"门开，锁开",
		"1":"门开，锁关",
		"2":"门关，锁开",
		"3":"门关，锁关",
		"4":"未知状态"
	}

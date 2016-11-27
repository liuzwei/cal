/** 
  *<p>Title:能源站</p> 
  *<p>Description:地图</p>
  *<p>Copyright: Copyright (c) 2016</p> 
  *<p>Company:无限绿洲</p> 
  * @author zouyan
  * @version 1.0 2016-04-012
*/
var CityManager = {
	init:function(){
		this._initEvent();
		this._initProvince();
		
	},
	_initProvince:function(){
		$.ajax({
			type:"POST",
			url:pageContext+"/city/provinceList",
			success:function(data){
				var list = data;
				var html = "<option value='' >--选择省份--</option>";
				for(var i=0; i<list.length; i++){
					var e = list[i];
					html +="<option value='"+e.id+"' >"+e.name+"</option>";
				}
				$("#province").html(html);
			}
		});
	},
	
	_initEvent:function(){
		$("#city").change(function(){
			var cityCode = $("#city").val();
			if(cityCode!=""){
				$.ajax({
					type:"POST",
					url:pageContext+"/city/areaList",
					data:{"cityCode":cityCode},
					success:function(data){
						var list = data;
						var html = "<option value='' >--选择区域--</option>";
						for(var i=0; i<list.length; i++){
							var e = list[i];
							html +="<option value='"+e.id+"' >"+e.name+"</option>";
						}
						$("#area").html(html);
					}
				});
			}else{
				$("#area").empty();
				$("#area").html("<option value='' >--选择区域--</option>");
			}
		});
		
		$("#province").change(function(){
			var provinceCode = $("#province").val();
			if(provinceCode!=""){
				$.ajax({
					type:"POST",
					url:pageContext+"/city/cityList",
					data:{"provinceCode":provinceCode},
					success:function(data){
						var list = data;
						var html = "<option value='' >--选择城市--</option>";
						for(var i=0; i<list.length; i++){
							var e = list[i];
							html +="<option value='"+e.id+"' >"+e.name+"</option>";
						}
						$("#city").html(html);
					}
				});
			}else{
				$("#city").empty();
				$("#city").html("<option value='' >--选择城市--</option>");
			}
		});
	},
	/**
	 * 打开地图
	 */
	
};

$(function(){
	CityManager.init();
});



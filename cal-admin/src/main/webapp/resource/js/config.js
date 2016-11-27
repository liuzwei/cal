/**
 * 验证
 */
$._validation = function(obj){
	if(!obj.success){
		if(obj.validated!=null){
			$.each(jQuery.parseJSON(obj.validated),function(key,val){
				$("#"+key+"Info").html($._typeof(val));
			});
			return false;
		}
		if(obj.error!=null){
			alert(obj.error);
			return false;
		}
	}
	return true;
}; 
/**
 * ajax
 */
$._ajax = function(options){
	options = $.extend({
		async : false,
        type: "POST",
        dataType: "json",
        data: "",
        url: "",
        success: function (data) {},
        error: function (msg) {}}, options || {});
	$.ajax(options);
};

/**
 * undefined转换
 */
$._typeof = function(str){
	if (typeof(str) == "undefined"){
		str ="";
	}
	return str;
}

/**
 * 日期
 * @param fmt
 * @returns
 */
Date.prototype.Format = function(fmt) { 
	var o = { 
		"M+" : this.getMonth()+1,                 //月份 
		"d+" : this.getDate(),                    //日 
		"H+" : this.getHours(),                   //小时 
		"m+" : this.getMinutes(),                 //分 
		"s+" : this.getSeconds(),                 //秒 
		"q+" : Math.floor((this.getMonth()+3)/3), //季度 
		"S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)) 
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) 
	if(new RegExp("("+ k +")").test(fmt)) 
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	return fmt; 
}
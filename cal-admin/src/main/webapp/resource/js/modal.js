/** 
 *<p>Title:能源站</p> 
 *<p>Description:</p>
 *<p>Copyright: Copyright (c) 2016</p> 
 *<p>Company:无限绿洲</p> 
 * @author zouyan
 * @version 1.0 2016-04-06
 */

var _modal = function(options){
	if($("#myWoasisModal").length>0){
		woasis_modal_style(options);
		return ;
	}
	var element = [];
	element.push('<div class="modal fade" id="myWoasisModal" tabindex="-1" role="dialog" >');
	element.push('<div class="modal-dialog" role="document">');
	element.push('<div class="modal-content">');
	element.push('<div class="modal-header">');
	element.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	element.push('<h4 class="modal-title" ></h4>');
	element.push('</div>');
	element.push('<div class="modal-body">');
	element.push('<iframe width="100%" height="100%" frameborder="0"></iframe>');
	element.push('</div>');
	element.push('<div class="modal-footer" style="display: none;"></div>');
	element.push('</div></div></div>');
	$("body").append(element.join(''));
	woasis_modal_style(options);
}

var woasis_modal_style =function(options){
	options = $.extend({}, $.woasis_modal_defaults, options);
	var $Modal = $("#myWoasisModal");
	$Modal.find(".modal-dialog").removeAttr("style"); 
	$Modal.find("iframe").attr("src",options.url);
	$Modal.find(".modal-body").css({"height":options.height});
	if(options.width!="")
	$Modal.find(".modal-dialog").css({"width":options.width});
	$Modal.find(".modal-title").html(options.title);
	$Modal.find(".modal-footer").empty().hide();
	if(options.button){
		$Modal.find(".modal-footer").show();
		for(var i=0;i<options.button.length;i++){
			$Modal.find(".modal-footer").append(options.button[i]);
		}
	}
	if(options.subClass){
		$Modal.find(".modal-body").addClass(options.subClass);
	}
	$Modal.modal({backdrop: 'static'});
};

var woasis_modal_colse = function(){
	$("#myWoasisModal").modal('hide');
};


var _dialog = function(options){
	options = $.extend({}, $.woasis_modal_dialog, options);
	bootbox.dialog(options);
};

$.woasis_modal_defaults = {
		url:"",
		height:"200",
		title:"提示",
		modalClas:"",
		width:"",
		subClass:""
};

$.woasis_modal_dialog = {
	title : "提示"
};

var _openMap = function(url){
	var element = [];
	element.push('<div class="map-popover" >');
	element.push('<div class="map-poptit">');
	element.push('<a href="javascript:void(0);" title="关闭" class="close" >×</a><h3>地图</h3></div>');
	element.push('<iframe src="'+url+'" width="100%" height="100%"  ></iframe>');
	element.push('</div>');
	var ele = $(element.join(''));
	$("body").append(ele);
	ele.find(".close").click(function(){
		$(this).parents(".map-popover").remove();
	});
};

var _inputText = function(id,val){
	$(document.getElementById('stationSaveIframe').contentWindow.document.body).find("#"+id).val(val);
} 

var refresh = function(){
	window.location.reload();
}

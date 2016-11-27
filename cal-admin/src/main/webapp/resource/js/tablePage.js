/** 
 *<p>Title:能源站</p> 
 *<p>Description:</p>
 *<p>Copyright: Copyright (c) 2016</p> 
 *<p>Company:无限绿洲</p> 
 * @author zouyan
 * @version 1.0 2016-04-06
 */
(function ($) {	
	var woasisGrid;
	var gridId;
	$.fn.woasisGrid = function(options){
		options = $.extend({}, $.woasis_grid_defaults, options);
		if(woasisGrid!=null && gridId.indexOf($(this).attr("id"))>=0){
			if (typeof(options.iDisplayStart) == "undefined"){
				options.iDisplayStart = 0;
			}
			if(options.iDisplayStart!=0){
				woasisGrid.ajax.reload(null, false);
			}else{
				woasisGrid.ajax.reload();
			}
		}else{
			gridId +=$(this).attr("id")+",";
			woasisGrid = $(this).DataTable(options);
		}
	};

	$.woasis_grid_defaults = {
		"oLanguage": {
    		"sLengthMenu": "每页显示 _MENU_条",
    		"sZeroRecords": "没有找到符合条件的数据",
    		"sProcessing": "加载中...",
    		"sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
    		"sInfoEmpty": "",
    		"sInfoFiltered": "",
    		"sSearch": "搜索：",
    		"oPaginate": {
    		"sFirst": "首页",
    		"sPrevious": "上一页",
    		"sNext": "后一页",
    		"sLast": "尾页"
    		}
		}, 
		"ajax":{
	        "url": "",
	        "type": "post",
	        "data": {}
	     } ,
        "aoColumns": [],
        "paging": true,
		"lengthChange": false,
		"autoWidth": false,
		"iDisplayLength" : 10,
		"ordering":false,
		"serverSide": true,
		"searching": false,
		"sPaginationType": "full_numbers" ,
		"bProcessing": false
	}
	
})(jQuery);


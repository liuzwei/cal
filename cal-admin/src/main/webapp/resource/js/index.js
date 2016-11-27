function openScr(url){
	$("#main_frame").attr("src", pageContext+"/"+url);
}; 
$(window).load(function (){ 
	$("#main_frame").css({height:$("#contentWrapper").height()-5,"min-width:":1280});
});

var userUpdatePwd = function(){
	var url = pageContext+"/user/toSavePass/0/"+$("#account").val();
	BootstrapDialog.show({
		title: "提示",
		message: '<iframe id="userUpdatePwdIframe"  width="100%" height="150px" src="'+url+'" frameborder="0"  seamless></iframe>',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: '确定',
            action: function(dialog){
            	if((parent.$("#userUpdatePwdIframe")[0].contentWindow.passSaveManager)._updatePwd()){
            		location.href =$("#exit").attr("href");
            	}
            }
        }, {
            label: '取消',
            action: function(dialog){
            	dialog.close();
            }
        }]
    });
}
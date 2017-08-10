var _noker_cookie_control={e:function(ms){if(isNaN(ms)||ms<0){ms=0};var t=new Date();t.setTime(t.getTime()+ms);return t.toGMTString();},c:function(n,v,e,p,d,s){document.cookie=n+"="+encodeURI(v)+(e?(';expires='+e):'')+(p?(';path='+p):'')+(d?(';domain='+d):'')+((s)?';secure':'');},d:function(n,p,d){if(this.g(n)){document.cookie=n+"="+((p)?(";path="+p):'')+((d)?(";domain="+d):'')+";expires=Mon,01-Jan-2006 00:00:01 GMT";}},g:function(n){var c=document.cookie.split("; ");var t="";for(var i=0;i<c.length;i++){t=c[i].split("=");if(n==t[0]){return decodeURI(t[1]);};};return "";}};

function page_menu_init(){
	$.ajax({url:"../js/menu.js",cache:true,dataType:"script"});
};

function datetimepicker_init(c){
	jQuery(function($){
		$("<link>").attr({rel:"stylesheet",type:"text/css",href:"../js/datetimepicker/jquery.datetimepicker.css"}).appendTo("head");
		$.ajax({url:"../js/datetimepicker/build/jquery.datetimepicker.full.min.js",cache:true,dataType:"script",success: function(){
			$.datetimepicker.setLocale("zh");
			if(typeof(c)=="function"){c();};
		}});
	});
};

function data_table_init(){
	var t=$("#page_content .data table");
	$("tbody tr",t).hover(function(){
		$(this).addClass("h");
	},function(){
		$(this).removeClass("h");
	}).filter(":odd").addClass("o");
	$("tbody tr td",t).click(function(){
		if(!$(this).hasClass("h")){
			$("tbody tr td:nth-child("+($(this).index()+1)+")",t).addClass("h");
		}else{
			$("tbody tr td:nth-child("+($(this).index()+1)+")",t).removeClass("h");
		};
	});
	if(!$("thead th.s",t).length){return false};
	var s=$("<div class=\"simplification\"><input type=\"checkbox\" readonly>精简模式</div>").appendTo("#page_content .data");
	$("thead tr th.s",t).each(function(i,e){
		$("tbody tr td:nth-child("+($(e).index()+1)+")",t).addClass("s");
	});
	$("thead tr th:first",t).hover(function(){
		s.css({top:t.position().top-26,left:t.position().left}).stop(true,true).show().data("h",1);
	},function(){
		s.data("h",0);
		window.setTimeout(function(){if(s.data("h")==0){s.fadeOut();};});
	});
	s.hover(function(){
		s.stop(true,true).show().data("h",1);
	},function(){
		s.data("h",0);
		window.setTimeout(function(){if(s.data("h")==0){s.fadeOut();};});
	}).click(function(){
		if($(":checkbox:checked",s).length){
			$(":checkbox",s).prop("checked",false);
			$(".s",t).show();
		}else{
			$(":checkbox",s).prop("checked",true);
			$(".s",t).hide();
		};
	}).find(":checkbox").click(function(){
		s.click();
	});
	s.click();
};

jQuery(function($){

page_menu_init();

data_table_init();//表格精简模式初始化

});
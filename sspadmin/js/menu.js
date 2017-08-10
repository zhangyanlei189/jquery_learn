$("<link>").attr({rel:"stylesheet",type:"text/css",href:"../css/menu.css"}).appendTo("head");
$("<link>").attr({rel:"stylesheet",type:"text/css",href:"https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"}).appendTo("head");

function menu_set_cookie(o){
	_noker_cookie_control.c("sspadmin_menu_set",JSON.stringify(o),_noker_cookie_control.e(365*24*60*60*1000),"/","");
};

var menu_set=_noker_cookie_control.g("sspadmin_menu_set");

if(menu_set){
	menu_set=JSON.parse(menu_set)
}else{
	menu_set={show:""};
	menu_set_cookie(menu_set);
};

var o=$("<div id=\"page_menu\"></div>").addClass(menu_set.show).addClass(menu_set.show).appendTo("body");
o.load("../share/menu.html",function(){
	if(window.menu_name){
		$("."+menu_name,o).addClass("active").prepend("<i class=\"fa fa-arrow-right\"></i>").parent(".submenu").prev(".menu").addClass("active");
	};
	$(".change",o).data("o",1).click(function(e){
		if(o.hasClass("tr_bar")){
			menu_set.show="";
			o.removeClass("tr_bar");
			$("#page_content").removeClass("tr_bar");
		}else{
			menu_set.show="tr_bar";
			o.addClass("tr_bar");
			$("#page_content").addClass("tr_bar");
		};
		menu_set_cookie(menu_set);
		return false;
	});
	if(o.hasClass("tr_bar")){
		$("#page_content").addClass("tr_bar");
	}else{
		$("#page_content").removeClass("tr_bar");
	};
	$("a.menu",o).hover(function(){
		if(!o.hasClass("tr_bar")){return false;};
		$(this).addClass("hover").data("hover",1).next("div.submenu").css({top:$(this).outerHeight()-1,left:$(this).position().left}).addClass("submenu_show");
	},function(){
		if(!o.hasClass("tr_bar")){return false;};
		var m=$(this).data("hover",0);
		var s=$(this).next("div.submenu");
		window.setTimeout(function(){
			if(m.data("hover")==0){
				m.removeClass("hover");
				s.removeClass("submenu_show");
			};
		});
	});
	$("div.submenu",o).hover(function(){
		if(!o.hasClass("tr_bar")){return false;};
		var m=$(this).prev("a.menu").data("hover",1);
	},function(){
		if(!o.hasClass("tr_bar")){return false;};
		var m=$(this).prev("a.menu").data("hover",0);
		var s=$(this);
		window.setTimeout(function(){
			if(m.data("hover")==0){
				m.removeClass("hover");
				s.removeClass("submenu_show");
			};
		});
	});
});
/*
 * jQuery TableFix plugin ver 1.0.1
 * Copyright (c) 2010 Otchy
 * This source file is subject to the MIT license.
 * http://www.otchy.net
 */
(function($){
$.fn.tableScroll = function(options) {
	return this.each(function(index){

		// 処理継続の判定
		var opts = $.extend({}, options);
		var baseTable = $(this);
		opts.height = opts.height || baseTable.height();

		// 基本数値の取得
		//var offsetHY = baseTable.find('tbody tr:first-child').position().top || 0;
		var baseWidth = baseTable.outerWidth();
		var baseHeight = baseTable.outerHeight();
		var offsetHY = baseTable.find('tbody tr:first-child').offset().top - baseTable.offset().top;
		var offsetFY = baseHeight;
		baseTable.find('tfoot tr:first-child').each(function(){
			offsetFY = $(this).offset().top - $(this).closest('table').offset().top - 2;
		});
		

		// 外部 div の設定
		baseTable.wrap("<div></div>");
		var div = baseTable.parent();
		div.css({position: "relative"}).css({width:baseWidth+"px"});
		// テーブルの分割と初期化
		var headTable = baseTable.wrap('<div></div>').css({width:"100%",display:"table"});
		var footTable = baseTable.clone().wrap('<div></div>').css({width:"100%",display:"table"});
		var bodyTable = baseTable.clone().wrap('<div></div>').css({width:"100%",display:"table"});
		var headDiv = headTable.parent().css({position: "absolute", overflow: "hidden", width:"100%"});
		var footDiv = footTable.parent().css({position: "absolute", overflow: "hidden", width:"100%"});
		var bodyDivIn = bodyTable.parent().css({overflow: "hidden"}).wrap('<div></div>');
		var bodyDivOut = bodyDivIn.parent().css({position: "absolute", overflow: "auto", width:"100%"});
		div.append(footDiv).append(bodyDivOut);

		// 領域の設定
		div.height(opts.height);

		// header
		headDiv.height(offsetHY).css({top:'0px'});

		// footer
		var footHeight = baseHeight - offsetFY + 2;
		footDiv.height(footHeight).css({bottom:'0px'});
		footTable.css({
			marginTop: -offsetFY + 'px'
		});

		// body
		var bodyHeight = opts.height - offsetHY - footHeight;
		bodyDivOut.height(bodyHeight).css({top: offsetHY + 'px'});
		bodyDivIn.height(baseHeight - offsetHY - footHeight);
		bodyTable.css({
			marginTop: -offsetHY + 'px'
		});

		headTable.width(bodyTable.width());
		footTable.width(bodyTable.width());

		console.log('head:'+headTable.width()+'-'+headTable.height()+' foot:'+footTable.width()+'-'+footTable.height()+' body:'+bodyTable.width()+'-'+bodyTable.height());
	});
}
})(jQuery);
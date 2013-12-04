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

		// スクロール部オフセットの取得
		//var offsetHY = baseTable.find('tbody tr:first-child').position().top || 0;
		var offsetHY = baseTable.find('tbody tr:first-child').offset().top - baseTable.offset().top;
		var offsetFY = baseTable.height();
		baseTable.find('tfoot tr:first-child').each(function(){
			offsetFY = $(this).offset().top - $(this).closest('table').offset().top;
		});

		// 外部 div の設定
		var baseWidth = baseTable.outerWidth();
		baseTable.wrap("<div></div>");
		var div = baseTable.parent();
		div.css({position: "relative"}).css({width:baseWidth+"px"});
		// テーブルの分割と初期化
		var headTable = baseTable.wrap('<div></div>').css({width:"100%"});
		var footTable = baseTable.clone().wrap('<div></div>').css({width:"100%"});
		var bodyTable = baseTable.clone().wrap('<div></div>').css({width:"100%"});
		var headDiv = headTable.parent().css({position: "absolute", overflow: "hidden", width:"100%"});
		var footDiv = footTable.parent().css({position: "absolute", overflow: "hidden", width:"100%"});
		var bodyDivIn = bodyTable.parent().css({overflow: "hidden"}).wrap('<div></div>');
		var bodyDivOut = bodyDivIn.parent().css({position: "absolute", overflow: "auto", width:"100%"});
		div.append(footDiv).append(bodyDivOut);

		// 領域の設定
		div.height(opts.height);

		headDiv.height(offsetHY).css({top:'0px'});
		headTable.height(offsetHY);

		var footHeight = baseTable.height() - offsetFY + 2;
		footDiv.height(footHeight).css({bottom:'0px'});
		footTable.height(footHeight).css({
			marginTop: -offsetFY + 'px'
		});

		var bodyHeight = opts.height - offsetHY - footHeight;
		bodyDivOut.height(bodyHeight).css({top: offsetHY + 'px'});
		bodyDivIn.height(baseTable.height() - offsetHY - footHeight);
		bodyTable.height(bodyHeight).css({
			marginTop: -offsetHY + 'px'
		});

		headTable.width(bodyTable.width());
		footTable.width(bodyTable.width());
	});
}
})(jQuery);
// this is the code which will be injected into a given page...

(function() {
	$("<div class='gistab'><div class='gistabmenu'></div><div class='gistabcontent'></div></div>").insertAfter(".repository-meta");
	$(".file").each(function(i, elem){
		var file_title = $(elem).find("strong").text()
		$(".gistabmenu").append("<p class='gistab-m-" + i + "'><a href='#' data-no=" + i + ">" + file_title+ "</a></p>")
		$(".gistabcontent").append("<div class='gistab-c-" + i + "'></div>")
		$(elem).appendTo(".gistab-c-" + i);

		if( i > 0 ){
			$(".gistab-c-" + i).css('display', 'none');
		}
	});
	$(".gistabmenu > p > a").bind('click', function(){
		var num = $(this).data('no')
		$(".gistabcontent > div").css('display', 'none');
		$(".gistab-c-" + num).css('display', 'block');
		$(".gistabmenu > p > a").css('background', '#f7f7f7')
		$(".gistabmenu > p.gistab-m-" + num + " > a").css('background', '#fff')
		return false
	});

	/** CSS **/
	$(".gistabmenu").css('margin', 0)
	$(".gistabmenu").css('padding', 0)
	$(".gistabmenu").css('list-style-type', 'none')
	$(".gistabmenu").css('z-index', 999)

	$(".gistabmenu > p").css('display', 'inline-block')
	$(".gistabmenu > p").css('padding', 0)
	$(".gistabmenu > p").css('margin', 3)

	$(".gistabmenu > p > a").css('display', 'block')
	$(".gistabmenu > p > a").css('border-left', '1px solid #d8d8d8')
	$(".gistabmenu > p > a").css('border-top', '1px solid #d8d8d8')
	$(".gistabmenu > p > a").css('border-right', '1px solid #d8d8d8')
	$(".gistabmenu > p > a").css('border-top-left-radius', '3px')
	$(".gistabmenu > p > a").css('border-top-right-radius', '3px')
	$(".gistabmenu > p > a").css('padding', '12px')
	$(".gistabmenu > p > a").css('text-decoration', 'none')
	$(".gistabmenu > p > a").css('background', '#f7f7f7')
	$(".gistabmenu > p > a:first").css('background', '#fff')

	$(".gistabcontent .file-header").css('background', '#fff')
	$(".gistabcontent .file").css('margin-top', '-3px')

})();
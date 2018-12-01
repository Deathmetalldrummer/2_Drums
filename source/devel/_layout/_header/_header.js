$('.mdl-navigation__link').on('click',function (e) {
	e.preventDefault();
	var this_href = $(this).attr('href');
	$( ".page-content" ).removeAttr("data-pattern").load(this_href + ' .page-content>*',function (e) {
		list();
		if (this_href === './create.html') {
			sequencer_setting();
		}
	});
})

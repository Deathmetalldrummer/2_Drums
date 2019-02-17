$('.mdl-navigation__link').on('click',function (e) {
	e.preventDefault();
	var this_href = $(this).attr('href');
	$( ".mdl-layout__content" ).removeAttr("data-pattern").load(this_href + ' .mdl-layout__content>*',function (e) {
		var mega_footer = $(e).find('.mdl-mega-footer');
		if (mega_footer.length) {
			$(this).after(mega_footer);
		}
		if (!mega_footer.length && $('.mdl-mega-footer')) {
			$('.mdl-mega-footer').remove();
		}
		list();
		if (this_href === './new.html') {
			sequencer_setting();
		}
	});
})

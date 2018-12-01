function list() {
	var pattern_list = JSON.parse(localStorage.getItem('drums')) || null;
	var list_pattern = $('#list_pattern');
	if (pattern_list && list_pattern) {
		for (var i = 0; i < pattern_list.length; i++) {
			var pattern_item = pattern_list[i];
			list_pattern.append('<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">insert_drive_file</i><a href="#" data-id="'+pattern_item.id+'">'+pattern_item.name+'</a></span></li>')
		}
	}
	$(".mdl-list__item a").on('click',function (e) {
		$('.page-content').attr('data-pattern', $(this).attr("data-id")).load('./create.html .page-content>*', function () {
			sequencer_setting();
		});
	});
}
list();

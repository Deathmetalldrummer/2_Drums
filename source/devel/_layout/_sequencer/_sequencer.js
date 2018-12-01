function sequencer_setting() {
	var patterns = JSON.parse(localStorage.getItem('drums')) || null;
	var pattern_id = $('.page-content').attr('data-pattern');
	componentHandler.upgradeElements($('.page-content'));
	if (patterns && pattern_id) {
		var pattern = patterns[pattern_id];
		sequencer(pattern)
	} else {
		sequencer();
	}
}

function sequencer(pattern) {


	$('#add_table').on('click', function() {
		var number_of_row = $('#row').val();
		var number_of_col = $('#col').val();

		var sequencer_wrap = $('#for_sequencer');

		if (!sequencer_wrap.find('#sequencer').length) sequencer_wrap.append($('<table class="sequencer sequencer_edit" id="sequencer"></table>'));
		sequencer = $('table#sequencer.sequencer');

		if (!sequencer.find('thead').length) sequencer.prepend($('<thead><tr></tr></thead>'))
		var thead = sequencer.find('thead');
		var thead_tr = thead.find('tr');
		var thead_tr_th_length = thead_tr.find('th').length;
		if (!thead_tr_th_length) {
			for (var i = 1; i <= number_of_col; i++) {
				thead_tr.append($('<th>' + i + '</th>'))
			}
			thead_tr.prepend($('<th>Drums</th>'))
			thead_tr_th_length = thead_tr.find('th').length;
		}
		if ((thead_tr_th_length - 1) > number_of_col) {
			for (var i = 1; i <= ((thead_tr_th_length - 1) - number_of_col); i++) {
				thead_tr.find('th:last-child').remove()
			}
			thead_tr_th_length = thead_tr.find('th').length;
		}
		if ((thead_tr_th_length - 1) < number_of_col) {
			for (var i = 1; i <= number_of_col - (thead_tr_th_length - 1); i++) {
				thead_tr.append($('<th>' + ((thead_tr_th_length - 1) + i) + '</th>'))
			}
			thead_tr_th_length = thead_tr.find('th').length;
		}



		if (!sequencer.find('tbody').length) sequencer.append($('<tbody></tbody>'))
		var tbody = sequencer.find('tbody');
		var tbody_tr = tbody.find('tr');
		var tbody_tr_length = tbody_tr.length;
		if (!tbody_tr_length) {
			for (var i = 0; i < number_of_row; i++) {
				tbody.append($('<tr></tr>'))
			}
			tbody_tr_length = tbody.find('tr').length;
		}
		if (tbody_tr_length > number_of_row) {
			for (var i = 0; i < (tbody_tr_length - number_of_row); i++) {
				tbody.find('tr:last-child').remove();
			}
			tbody_tr_length = tbody.find('tr').length;
		}
		if (tbody_tr_length < number_of_row) {
			for (var i = 0; i < (number_of_row - tbody_tr_length); i++) {
				tbody.append($('<tr></tr>'))
			}
			tbody_tr_length = tbody.find('tr').length;
		}



		tbody_tr = tbody.find('tr');
		for (var i = 0; i < tbody_tr_length; i++) {
			var tr = $(tbody_tr[i]);
			var tbody_tr_td = tr.find('td');
			var tbody_tr_td_length = tbody_tr_td.length;
			var tbody_tr_th = tr.find('th');
			var tbody_tr_th_length = tbody_tr_th.length;
			if (!tbody_tr_th_length) {
				var textfield = ' <div class="mdl-grid"><div class="mdl-cell mdl-cell--12-col drum_name_save">save</div> <div class="mdl-cell mdl-cell--10-col drum_name"> <div class="mdl-textfield mdl-js-textfield"> <input class="mdl-textfield__input" id="drum_name' + i + '" type="text"/> <label class="mdl-textfield__label" for="drum_name' + i + '">Text...</label> </div></div><div class="mdl-cell mdl-cell--2-col drum_type"> <button class="mdl-button mdl-js-button mdl-button--icon" id="drum_type' + i + '"><i class="material-icons">more_vert</i></button> <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="drum_type' + i + '"> <li class="mdl-menu__item">Some Action</li></ul> </div></div>';
				tr.prepend($('<th>' + textfield + '</th>'));
				tbody_tr_th_length = tr.find('th').length;
			}
			if (!tbody_tr_td_length) {
				for (var j = 0; j < number_of_col; j++) {
					tr.append($('<td><div class="drum_matrix" data-col="' + j + '" data-row="' + i + '" data-value="0"></div></td>'));
				}
				tbody_tr_td_length = tr.find('td').length;
			}
			if (tbody_tr_td_length < number_of_col) {
				for (var j = 0; j < (number_of_col - tbody_tr_td_length); j++) {
					tr.append($('<td><div class="drum_matrix" data-col="' + (tbody_tr_td_length + j) + '" data-row="' + i + '" data-value="0"></div></td>'));
				}
				tbody_tr_td_length = tr.find('td').length;
			}
			if (tbody_tr_td_length > number_of_col) {
				for (var j = 0; j < (tbody_tr_td_length - number_of_col); j++) {
					tr.find('td:last-child').remove();
				}
				tbody_tr_td_length = tr.find('td').length;
			}
		}
		componentHandler.upgradeElements($('#sequencer'));
		acrivateOnClick();
	})

	function acrivateOnClick() {
		$('.drum_matrix').on('click', function() {
			if ($('#sequencer').hasClass('sequencer_edit')) {
				$(this).toggleClass('active');
				if ($(this).attr("data-value") === '0') {
					$(this).attr("data-value", '1');
				} else {
					$(this).attr("data-value", '0');
				}
			}
		})
	}

	$('.save_edit').on('click', function() {
		if ($(this).hasClass('edit')) {
			$(this).addClass('save').removeClass('edit');
			$('#sequencer').addClass('sequencer_edit');
			$('#sequencer').find('input').attr('disabled', false);
			$('.edit_panel').slideDown();
		} else {
			$(this).addClass('edit').removeClass('save');
			$('#sequencer').removeClass('sequencer_edit');
			$('#sequencer').find('input').attr('disabled', true);
			$('.edit_panel').slideUp();
			write_object();
		}
	})

	// function write_object() {
	// 	var write_rows = $('#sequencer').find('tbody tr');
	// 	var wowobj = [];
	// 	obj.html = $('#sequencer')[0].outerHTML;
	// 	for (var i = 0; i < write_rows.length; i++) {
	// 		var write_row = $(write_rows[i]);
	// 		var drum_name_object = write_row.find('th input').val();
	//
	// 		var write_tds = write_row.find('.drum_matrix');
	// 		var patt = [];
	// 		for (var j = 0; j < write_tds.length; j++) {
	// 			var write_td = write_tds[j];
	// 			patt[$(write_td).data('col')] = $(write_td).data('value');
	// 		}
	//
	// 		wowobj.push({
	// 			drum_name: drum_name_object,
	// 			pattern: patt
	// 		})
	//
	// 	}
	// 	obj.pattern = wowobj;
	// 	console.log(obj);
	// }
}

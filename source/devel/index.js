$('#add_table').on('click',function () {
	var num_row = $('#row').val();
	var num_col = $('#col').val();
	create_table_sequencer(num_row,num_col);
})

function create_table_sequencer(number_of_row,number_of_col) {
	var sequencer = $('#for_table').find('table#sequencer.sequencer');
	if (!sequencer.length) {
		new_sequencer = $('<table class="sequencer" id="sequencer"></table>');
		$('#for_table').append(new_sequencer);
	}
	sequencer = $('table#sequencer.sequencer')
	edit_row(number_of_row,sequencer);
	edit_col(number_of_col,sequencer);
}

function edit_row(number_of_row,sequencer) {
	var row = sequencer.find('tr');
	if (row.length) {
			if (number_of_row > row.length) {
				create_row((number_of_row - row.length),sequencer);
			} else {
				remove_row((row.length - number_of_row),sequencer);
			}
	} else {
		create_row(number_of_row,sequencer)
	}

}
function edit_col(number_of_col,sequencer) {
	var row = sequencer.find('tr');
	if (row.length) {
		for (var i = 0; i < row.length; i++) {
			var col = $(row[i]).find('td');
			if (col.length) {
				console.log(1);
				if (number_of_col > col.length) {
					create_col((number_of_col - col.length),$(row[i]));
				} else {
					remove_col((col.length - number_of_col),$(row[i]))
				}
			} else {
				create_col(number_of_col,$(row[i]));
			}
		}
	}
}
function create_col(number_of_col,elem) {
	for (var j = 0; j < number_of_col; j++) {
		var td = $('<td>1</td>');
		elem.append(td);
	}
}
function create_row(number_of_row,elem) {
	for (var j = 0; j < number_of_row; j++) {
		var tr = $('<tr></tr>');
		elem.append(tr);
	}
}
function remove_col(x,elem) {
	for (var i = 0; i < x; i++) {
		elem.find('td:last-child').remove();
	}
}
function remove_row(x,elem) {
	for (var i = 0; i < x; i++) {
		elem.find('tr:last-child').remove();
	}
}

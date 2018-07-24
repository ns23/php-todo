/**
 * @file: make API calls to beckend
 */

$(function () {

	// get all the tasks
	get_all_task();
});

function get_all_task(){
	$.get("todo_get_all.php", function (data, status) {
		data = JSON.parse(data);
		render_current_task(data);
		render_completed_task(data);
	});
}

function render_current_task(taskObj){
	$.each(taskObj,(key,value)=>{
		if(value.isDone==0){
			$("#current").append(`<li class="list-group-item">${value.name}</li>`);
		}
	});
}

function render_completed_task(taskObj){
	$.each(taskObj, (key, value) => {
		if (value.isDone == 1) {
			$("#completed").append(`<li class="list-group-item"><del>${value.name}<del></li>`);
		}
	})
}

function clear_list(){
	$('#current #completed').empty();
}
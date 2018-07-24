/**
 * @file: make API calls to beckend
 */

$(function () {

	// get all the tasks
	get_all_task();
});

function get_all_task() {
	$.get("todo_get_all.php", function (data, status) {
		data = JSON.parse(data);
		clear_list();
		render_current_task(data);
		render_completed_task(data);
	});
}

function render_current_task(taskObj) {
	$.each(taskObj, (key, value) => {
		if (value.isDone == 0) {
			$("#current").append(`
			<li class="list-group-item">
				${value.name} 
				<i class="fa fa-trash-o float-right" onclick="deleteTask(${value.id});" style="padding-left :20px" aria-hidden="true"></i>
				<i class="fa fa-check float-right" onclick="doneTask(${value.id});" aria-hidden="true"></i>
			</li>`);
		}
	});
}

function deleteTask(taskId){
	$.post("delete_task.php",{taskId},
		function (data, status) {
			console.log("Data: " + data + "\nStatus: " + status);
			get_all_task();
		});
}

function doneTask(taskId){
	$.post("update_task.php", { taskId },
		function (data, status) {
			console.log("Data: " + data + "\nStatus: " + status);
			get_all_task();
		});
}

function render_completed_task(taskObj) {
	$.each(taskObj, (key, value) => {
		if (value.isDone == 1) {
			$("#completed").append(`<li class="list-group-item">
				<del>${value.name}<del>
				<i class="fa fa-trash-o float-right" onclick="deleteTask(${value.id});" aria-hidden="true"></i>
			</li>`);
		}
	})
}

function clear_list() {
	$('#current').empty();
	$('#completed').empty();
}

function animateWarning(){
	$("#taskWarning").show(500);
	setTimeout(() => {
		$("#taskWarning").hide(1000);
	}, 3000);
}

$("form").submit(function (e) {
	e.preventDefault();
	task_name = $("#task").val();
	if (task_name) {
		$.post("insert_task.php",{ task: task_name },
			function (data, status) {
				console.log("Data: " + data + "\nStatus: " + status);
				get_all_task();
			});
		$("#task").val("");	
	} else {
		animateWarning();
	}
});
<?php
require_once('db.php');

$db = new Database();

$task_id =  $_POST['taskId'];

if($task_id != ''){
	$sql = "DELETE FROM list WHERE id = {$task_id}";
	$db->deleteQuery($sql);
	echo json_encode(true);
}else{
	echo json_encode(false);
}

?>
<?php
require_once('db.php');

$db = new Database();

$task_id =  $_POST['taskId'];

if($task_id != ''){
	$sql = "UPDATE list SET  isDone =  '1' WHERE id ={$task_id}";
	$updateStaus = $db->updateQuery($sql);
	echo json_encode($updateStaus);
}else{
	echo json_encode(false);
}

unset($db);
?>
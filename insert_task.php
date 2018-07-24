<?php
require_once('db.php');

$db = new Database();

$task_name =  $_POST['task'];
if($task_name != ''){
	$sql = "INSERT INTO list(name) VALUES ('{$task_name}')";
	$tasks = $db->insertQuery($sql);
	echo json_encode(true);
}else{
	echo json_encode(false);
}

?>
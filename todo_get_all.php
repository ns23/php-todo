<?php
require_once('db.php');

$db = new Database();

$tasks = $db->getQuery('select * from list');

echo json_encode($tasks);

?>
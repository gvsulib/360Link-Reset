<?php

// Send back a 1px transparent gif so the browser is happy it got an image
header("Access-Control-Allow-Origin: *");
header('Content-Type: image/gif');
echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');

// Get correct timestamps
date_default_timezone_set('America/Detroit');

// Get the data from the URL

$f = $_GET['f'];
$now = time();

// Connect to database
include('config.php');

$db = new mysqli($db_host, $db_user, $db_pass, $db_database);
if ($db->connect_errno) {
	printf("Connect failed: %s\n", $db->connect_error);
	exit();
}

// Record 
$db->query("INSERT INTO formats VALUES ('$now','$f','')");

// Done


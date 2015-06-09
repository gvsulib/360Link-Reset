<?php

// Send back a 1px transparent gif so the browser is happy it got an image
header("Access-Control-Allow-Origin: *");
header('Content-Type: image/gif');
echo base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');

// Get the data from the URL

$f = $_GET['f'];
$now = time();

// Make the data into an array

$data = array($now, $f, $u);

// Save the record to the CSV file

if (!$DataFile = fopen("data.csv", "a")) {echo "Failure: cannot open file"; die;};
if (!fputcsv($DataFile, $data)) {echo "Failure: cannot write to file"; die;};
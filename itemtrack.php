<?php

// Get the data from the URL

$f = $_GET['f'];
$u = urldecode($_GET['u']);
$now = time();

// Make the data into an array

$data = array($now, $f, $u);

// Save the record to the CSV file

if (!$DataFile = fopen("data.csv", "a")) {echo "Failure: cannot open file"; die;};
if (!fputcsv($DataFile, $data)) {echo "Failure: cannot write to file"; die;};
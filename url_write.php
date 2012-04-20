<?
 
$url = trim($_GET['URL']);
$name = trim($_GET['name']);
$date = trim($_GET['date']);

$datastring = $date . "," . $name . "," . $url . "\n";
if (!$DataFile = fopen("dodgy_urls.csv", "a")) {echo "Failure: cannot open file"; die;};
if (!fwrite($DataFile, $datastring)) {echo "Failure: cannot write to file"; die;};
fclose($DataFile);
echo "file write successful";

 
 





?>
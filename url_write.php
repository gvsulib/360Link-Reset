<?
 if (isset($_POST['URL'])) {
 	$url = trim($_POST['URL']) . "\n";
 	$DataFile = fopen("dodgy_urls.txt", "a");
 	fwrite($DataFile, $url);
	fclose($DataFile);
 
 } else {
	die; 
 
 
 }






?>
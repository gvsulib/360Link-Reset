<?
 
$url = trim($_GET['URL']) . "\n";
if (!$DataFile = fopen("dodgy_urls.txt", "a")) {echo "Failure: cannot open file"; die;};
if (!fwrite($DataFile, $url)) {echo "Failure: cannot write to file"; die;};
fclose($DataFile);
echo "file write successful";

 
 





?>
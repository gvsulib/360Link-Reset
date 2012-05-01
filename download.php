<?php
header('Content-disposition: attachment; filename=url_report_save.csv');
header('Content-type: application/pdf');
readfile('url_report_save.csv');



?> 
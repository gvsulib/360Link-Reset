<?php

  // Generate your own secret key for $wskey

// cURL function by Brice Stacey:
// http://bricestacey.com/2009/07/21/Single-Sign-On-Authentication-Using-EZProxy-UserObjects.html

$wskey = 'JHjkh234jkh423jkh423jkhjk423hjk423hjkh423jkhK23JHK423JKH4JK23HJK423HJK423HJK423H';
$url = $_GET['token'] . '&service=getUserObject&wskey=' . $wskey;
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$o = curl_exec($ch);
curl_close($ch);

$data = new SimpleXMLElement($o); // Parse the XML return

$user = (string)$data->userDocument[0]->uid;
session_start();

// Put whatever session variables you set up in UserObject here
// http://wcn.oclc.org/index.php/Populating_the_EZproxy_User_Object

$_SESSION['username'] = $user;

session_write_close(); // Make sure the session variable is written before the redirect

$new_url = "http://gvsulib.com/felkerk/360Link_Reset/display.php"; // URL of the app you are signing into

header('Location: ' . $new_url);

?>
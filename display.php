<?
session_start();
if (!isset($_SESSION['username'])) {
	header("Location: https://login.ezproxy.gvsu.edu/login?url=https://login.ezproxy.gvsu.edu/userObject?service=getToken&returnURL=http://gvsulib.com/felkerk/360Link_Reset/login.php");

} else {
	$user = trim($_SESSION['username']);
	
	if ($user != 'felkerk' && $user != 'simons') {
	echo "You suck";
	die;
	} 

}




?>

<!DOCTYPE html>
<html>
<head>
<title>Suspect Link Report Display</title>
<!--

I'll need to use a bit of jQuery UI to display the date picker.
I've grabbed just the files I need from he jQuery UI download

-->
<script type="text/javascript" src="http://gvsulib.com/labs/js/jquery.min.js"></script>
<script type="text/javascript" src="jquery.ui.core.js"></script>
<script type="text/javascript" src="jquery.ui.datepicker.js"></script>

<!--Script for the tooltip -->

<script type="text/javascript">
var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 800;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

</script>

<!--
load our pattern library to style the page
-->



<link rel="stylesheet" type="text/css" href="http://gvsu.edu/cms3/assets/741ECAAE-BD54-A816-71DAF591D1D7955C/libui.css" />
<style>

* {margin:0; padding:0}

#text {margin:50px auto; width:500px}
.hotspot {color:#900; padding-bottom:1px; border-bottom:1px dotted #900; cursor:pointer}

#tt {position:absolute; display:block; background:url(images/tt_left.gif) top left no-repeat}
#tttop {display:block; height:5px; margin-left:5px; background:url(images/tt_top.gif) top right no-repeat; overflow:hidden}
#ttcont {display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#FFF}
#ttbot {display:block; height:5px; margin-left:5px; background:url(images/tt_bottom.gif) top right no-repeat; overflow:hidden}
#ui-datepicker-div {
	background-color: white;
	border: 1px solid black;
	padding: 5px;
}
#ui-datepicker-calendar {
	text-align:right;
	vertical-align:top;
	border-collapse:collapse;
	
}

</style>

</head>
<body>



<script>//initialize jQueri UI datepicker
	$(function() {
		$( "#start_date" ).datepicker({
			changeMonth: true,
			changeYear: true
		});
	});
	
	
	
		$(function() {
		$( "#end_date" ).datepicker({
			changeMonth: true,
			changeYear: true
		});
	});
	</script>


<h2>Dodgy Link Display</h2>
View Enties From:
<P>
<form action="" method="GET">
<label for="start_date">Start Date</label>
<input id="start_date" name="startDate" type="text" value="<? if ($_GET['Submit']) {echo $_GET['startDate'];}  ?>"> to 
<label for="end_date">End Date</label>



<input name="endDate" id="end_date" type="text" value="<? if ($_GET['Submit']) {echo $_GET['endDate'];}  ?>"></p>
<label for="all">Get all the entries</label>

<input type="checkbox" name="all" value="1" <? if ($_GET['all'] == 1) {echo "checked";}  ?> /><P>



<label for="order">Choose sorting</label>
 <select ID="order"  class="lib-inline" name="order">
  <option value="date" <? if (($_GET['order'] == "date") || !$_GET['Submit']) {echo "selected";}  ?>>Date and time</option>
  <option value="name" <? if ($_GET['order'] == "name") {echo "selected";}  ?>>Database name</option>
  
</select> 
<P>
<input type="submit" class=".lib-button-small" name="Submit" value="Display"></P>
</form>
<form action="" method="GET">

<? if ($_GET['startDate']) {echo "<input id='start_date' name='startDate' type='hidden' value='" . $_GET['startDate'] . "'>";}  ?>
<? if ($_GET['endDate']) {echo "<input id='end_date' name='endDate' type='hidden' value='" . $_GET['endDate'] . "'>";}  ?>
<? if ($_GET['all']) {echo "<input id='all' name='all' type='hidden' value='" . $_GET['all'] . "'>";}  ?>
<input type="submit" class=".lib-button-small" name="Submit" value="Save Currently Displayed Entries";"></P>
</form>

<form action="" onsubmit="return confirm('This will erase all the data, it cannot be recovered. Are you sure you want to proceed?')" method="GET"><input type="submit" class=".lib-button-small" name="Submit" value="Erase all Data"></form>


<?

if ($_GET['Submit'] == "Display") {
	//format dates for conversion to unix timestamp
	$temp = explode("/", $_GET['startDate']);
	$tempo = explode("/", $_GET['endDate']);
	$a = $temp[2] . ":" . $temp[0] . ":" . $temp[1] . " 00:00:00";
	$b = $tempo[2] . ":" . $tempo[0] . ":" . $tempo[1] . " 23:59:59";
	
	$startDate = strtotime($a);
	$endDate = strtotime($b);
	
	if ($_GET['order'] == "name") {
		function cmp($a, $b) {
			return strcasecmp($a[1], $b[1]);	
		
		
			}
		} else {
			function cmp($a, $b) {
				return $a[0] - $b[0];
			}
		
		}

	
	if ((!$_GET['startDate'] || !$_GET['endDate']) && !$_GET['all']) {echo "<P style='color: red'>You must supply both a start and an end date.</P>"; die;}
	
	//compare dates to make sure start date is before end date
	if (!$_GET['all'] && ($endDate < $startDate)) {echo "Error: start date must be before end date"; die;};
	$row = 1;
	
	if (!$DataFile = fopen("dodgy_urls.csv", "r")) {echo "Failure: cannot open file"; die;};
	while ($data = fgetcsv($DataFile, 1000, ",")) {
		
		if ((($data[0] > $startDate) && ($data[0] < $endDate)) || $_GET['all']) {
			$row++;
			$results[] = array($data[0], $data[1], $data[2]);
			}
		}
	fclose($DataFile);
	if ($results) {
		usort($results, "cmp");
		echo "<P>Showing $row results</P>";
		echo "<table class='lib-table'><TR><TH>OpenURL</TH><TH>Database Name</TH><TH>Time</TH></TR>";
		foreach ($results as $key => $value) {
			$value[0] = date('j F Y g:i a', $value[0]);
			echo "<TR><TD><a onmouseover='tooltip.show(\"" . $value[2] ."\");' ' onmouseout='tooltip.hide();' href='" . $value[2] . "'>Go to the page</a></TD><TD>" . $value[1] . "</TD><TD>" . $value[0] . "</TD></TR>";
		
			}
		} else {echo "<P style='color: red'>No Results for that time period.</P>";}
	echo "</table>";

} elseif ($_GET['Submit'] == "Save Currently Displayed Entries") {
	if ((!$_GET['startDate'] || !$_GET['endDate']) && !$_GET['all']) {echo "<P style='color: red'>You must supply both a start and an end date.</P>"; die;}
	
	$row_data = "";
	$temp = explode("/", $_GET['startDate']);
	$tempo = explode("/", $_GET['endDate']);
	$a = $temp[2] . ":" . $temp[0] . ":" . $temp[1] . " 00:00:00";
	$b = $tempo[2] . ":" . $tempo[0] . ":" . $tempo[1] . " 23:59:59";
	
	$startDate = strtotime($a);
	$endDate = strtotime($b);
	//compare dates to make sure start date is before end date
	if (!$_GET['all'] && ($endDate < $startDate)) {echo "Error: start date must be before end date"; die;};

	if (!$DataFile = fopen("dodgy_urls.csv", "r")) {echo "Failure: cannot open file"; die;};
	
	while ($data = fgetcsv($DataFile, 1000, ",")) {
		
		if ((($data[0] > $startDate) && ($data[0] < $endDate)) || $_GET['all']) {
			$date = date('j F Y g:i a', $data[0]);
			$row_data = $row_data . $date . "," . $data[1] . "," . $data[2] . "\n"; 
			}
		}
	
	if ($row_data == "") {echo "No data to save for selected time period."; die;};
	fclose($DataFile);
	if (!$TempFile = fopen("url_report_save.csv", "w")) {echo "Failure: cannot open save file"; die;};
	fwrite($TempFile, $row_data);
	fclose($TempFile);
	echo "<script type='text/javascript'>window.location='download.php';</script>";
	


} elseif ($_GET['Submit'] == "Erase all Data") {
	if (!$DataFile = fopen("dodgy_urls.csv", "w")) {echo "Failure: cannot open file"; die;};
	fwrite($DataFile, "");
	fclose($DataFile);
	echo "<P style='color: red'>All Data Erased</P>";

}




?>



</body>


</html>
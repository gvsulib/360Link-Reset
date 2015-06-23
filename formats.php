


<!DOCTYPE html>
<html>
<head>

<?php
error_reporting(E_ALL);


// A script to visualize the number of items shown by the link recolver by format
// Requires Charts.js: http://chartsjs.org. 

// Connect to database
include('config.php');

$db = new mysqli($db_host, $db_user, $db_pass, $db_database);
if ($db->connect_errno) {
	printf("Connect failed: %s\n", $db->connect_error);
	exit();
}

$colors = array(
	0 => "#F7464A",
	1 => "#46BFBD",
	2 => "#FDB45C"
);

$highlights = array(
	0 => "#FF5A5E",
	1 => "#5AD3D1",
	2 => "#FFC870"
);

$first_result = $db->query("SELECT timestamp FROM formats ORDER BY timestamp LIMIT 1");
while($firstrecord = $first_result->fetch_assoc()) {
	$first = date("F j, Y", $firstrecord['timestamp']);
}

$format_result = $db->query("SELECT COUNT('format'), format FROM formats GROUP BY format");

echo '<script>
var data = [
';

// How many rows?
$numrows = $format_result->num_rows;
$i = 0;
$total = 0;

while($row = $format_result->fetch_assoc()) {

	//var_dump($row);	

echo '{
value: ' . $row["COUNT('format')"] . ',
color: "' . $colors[$i] . '",
highlight: "' . $highlights[$i] . '",
label: "' . $row['format'] . '"
}';

$i++;
$total = $total + $row["COUNT('format')"];

if($row['format'] == 'Book') {
	$books = $row["COUNT('format')"];
}
if($row['format'] == 'Journal') {
	$journal = $row["COUNT('format')"];
}
if($row['format'] == 'Dissertation') {
	$diss = $row["COUNT('format')"];
}

	if($i < $numrows) {
		echo ',';
	}


}

	echo ']
	</script>';
?>

<style>
body { text-align: center; margin: 0 auto; font-family: Helvetica, Verdana, sans-serif;}
ul { list-style-type: none; width: 8em; margin: 1em auto; text-align: left;}
ul li:first-child { margin-bottom: 1em; padding-bottom: 1em; border-bottom: 1px solid #ddd;}
ul li span { display: inline-block; float: right;}
</style>


</head>
<body>

<h1>Link Resolver Visits by Format</h1>

<canvas id="formats" width="250" height="250"></canvas>

<h2>Totals since <?php echo $first; ?></h2>

<ul style="">
	<li><strong>Total:</strong> <span><?php echo $total; ?></span></li>
	<li><strong>Journals:</strong> <span><?php echo $journal; ?></span></li>
	<li><strong>Books:</strong> <span><?php echo $books; ?></span></li>
	<li><strong>Dissertations:</strong> <span><?php echo $diss; ?></span></li>
</ul>

<div id="total"></div>

<script src="chart.min.js"></script>
<script>

	// Get the context of the canvas element we want to select
	var ctx = document.getElementById("formats").getContext("2d");
	var myNewChart = new Chart(ctx).Doughnut(data, {
		animation: false
		});

</script>
</body>
</html>


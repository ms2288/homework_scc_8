<?php 

$con = mysqli_connect("localhost", "root", "1234", "megadb");

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
else
{
    //echo ("Connect Successfully");
}

$sql = "SELECT time, Totalprice from orderlist WHERE time > DATE_FORMAT( DATE_ADD(NOW(), INTERVAL - 7 DAY), '%Y-%m-%d 00:00:00' )";
$sth = mysqli_query($con, $sql);

$table = array();
$table['cols'] = array(
  array( 'label' => 'time','type' => 'date'),
  array( 'label' => '매출액', 'type' => 'number')
);

$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    //google chart api의 입력값을 위해 data를 json 형식으로 만들기 
    $temp = array();
    preg_match('/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/', $r["time"], $match);
    $year = (int) $match[1];
    $month = (int) $match[2] - 1; // 자바스크립트의 date 형식에 맞춰 zero-index 로 변환
    $day = (int) $match[3];
  
    $temp = array();
    $temp[] = array('v' => "Date($year, $month, $day)");
    $temp[] = array('v' => (int) $r['Totalprice']); 
    $rows[] = array('c' => $temp);
}

$table['rows'] = $rows;
$jsonTable = json_encode($table);
//echo $jsonTable;
?>


<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>지난 일주일간 일별 매출 (단위: 원)</title>
        <link rel="stylesheet" href="chart-style.css?ver=1" type="text/css"/>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript">
        // google chart api
        google.load('visualization', '1', {'packages':['corechart']});
        google.setOnLoadCallback(drawChart);

        function drawChart() {

        // 서버에서 가져온 json data로 data table 만들기
        var tempdata = new google.visualization.DataTable(<?=$jsonTable?>);
        var data = google.visualization.data.group(tempdata,[0],[{'column' : 1, 'aggregation' : google.visualization.data.sum, 'type': 'number'}])
        var options = {
            title: '지난 일주일간 일별 매출 (단위: 원)',
            titleTextStyle: {fontSize: 15},
            legend: {position: 'none'},
            chartArea: {'width': '80%', 'height': '80%'},
            hAxis : {format:'MM/dd'}
            };

        //tooltip date format 맞추기
        var date_formatter = new google.visualization.DateFormat({ 
            pattern: "MM/dd"
        }); 
        date_formatter.format(data, 0)

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        }
      </script>
    </head>

    <body>
        <div class="chart-container">
            <div class="container-title">
                <span class="container-content">매출 관리</span>
                <button class="container-content btn-cancel">X</button>
            </div>
            <div class="chart", id = "chart_div"></div>
        </div>
    </body>
</html>

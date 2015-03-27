<?php

if(isset($_POST['fileName'])) { $fileName = $_POST['fileName']; }

set_include_path(get_include_path() . PATH_SEPARATOR . './Classes/');

include 'PHPExcel/IOFactory.php';

/*$included_files = get_included_files();
foreach ($included_files as $fname) {
    echo "$fname\n";
}*/

//$inputFileName = '/home/yoviajoriveras/public_html/cargas_virtuales/files/' . $fileName;
$inputFileName = '/Applications/XAMPP/xamppfiles/htdocs/sistema-de-gestion-de-cargas-virtuales/files/' . $fileName;

$objPHPExcel = PHPExcel_IOFactory::load($inputFileName);

$sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);

echo json_encode($sheetData);


?>
<?php
include "../Storage.php";

if(isset($_POST['fileDate'])) { $fileDate = $_POST['fileDate']; }

$data = array(
	'fileDate' => $fileDate
);

$storage = new Storage();
echo $storage->checkFileInCurrentDay($data);

?>
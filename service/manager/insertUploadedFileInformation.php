<?php
include "../Storage.php";

if(isset($_POST['fileName'])) { $fileName = $_POST['fileName']; }
if(isset($_POST['creationFile'])) { $creationFile = $_POST['creationFile']; }

$data = array(
      'fileName' => $fileName,
      'creationFile' => $creationFile
);

$storage = new Storage();
echo $storage->insertUploadedFileInformation($data);
?>
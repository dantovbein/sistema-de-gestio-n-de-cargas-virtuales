<?php
include "../Storage.php";

if(isset($_POST['fileId'])) { $fileId = $_POST['fileId']; }

$data = array(
      'fileId' => $fileId
);

$storage = new Storage();
echo $storage->removeDataById($data);
?>


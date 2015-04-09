<?php
include "../Storage.php";

if(isset($_POST['trxs'])) { $trxs = $_POST['trxs']; }
if(isset($_POST['fileId'])) { $fileId = $_POST['fileId']; }

$data = array(
      'trxs' => $trxs,
      'fileId' => $fileId
);

$storage = new Storage();
echo $storage->insertTrxs($data);
?>


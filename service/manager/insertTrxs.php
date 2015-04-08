<?php
include "../Storage.php";

if(isset($_POST['trxs'])) { $trxs = $_POST['trxs']; }

$data = array(
      'trxs' => $trxs
);

$storage = new Storage();
echo $storage->insertTrxs($data);
?>


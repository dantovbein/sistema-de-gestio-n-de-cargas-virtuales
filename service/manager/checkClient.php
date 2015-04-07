<?php
include "../Storage.php";

if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }

$storage = new Storage();
echo $storage->checkClient($idCliente);
?>


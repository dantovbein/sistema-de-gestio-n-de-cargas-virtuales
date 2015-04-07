<?php
include "../Storage.php";

if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }
if(isset($_POST['cliente'])) { $cliente = $_POST['cliente']; }

$data = array(
      'idCliente' => $idCliente,
      'cliente' => $cliente
);

$storage = new Storage();
echo $storage->insertClient($data);
?>


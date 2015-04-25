<?php
include "../Storage.php";

if(isset($_POST['desde'])) { $desde = $_POST['desde']; }
if(isset($_POST['hasta'])) { $hasta = $_POST['hasta']; }
if(isset($_POST['estado'])) { $estado = $_POST['estado']; }
if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }
if(isset($_POST['clienteZona'])) { $clienteZona = $_POST['clienteZona']; }

$data = array(
      'desde' => $desde,
      'hasta' => $hasta,
      'estado' => $estado,
      'idCliente' => $idCliente,
      'clienteZona' => $clienteZona    
);

$storage = new Storage();
echo $storage->getReportData($data);
?>
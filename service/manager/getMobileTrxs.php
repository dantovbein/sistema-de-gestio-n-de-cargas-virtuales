<?php
include "../Storage.php";

if(isset($_POST['fecha'])) { $fecha = $_POST['fecha']; }
if(isset($_POST['estado'])) { $estado = $_POST['estado']; }
if(isset($_POST['idUsuario'])) { $idUsuario = $_POST['idUsuario']; }
if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }
if(isset($_POST['idProducto'])) { $idProducto = $_POST['idProducto']; }
if(isset($_POST['modeloDeTerminal'])) { $modeloDeTerminal = $_POST['modeloDeTerminal']; }
if(isset($_POST['clienteZona'])) { $clienteZona = $_POST['clienteZona']; }

$data = array(
      'fecha' => $fecha,
      'estado' => $estado,
      'idUsuario' => $idUsuario,
      'idCliente' => $idCliente,
      'idProducto' => $idProducto,
      'modeloDeTerminal' => $modeloDeTerminal,
      'clienteZona' => $clienteZona    
);

$storage = new Storage();
echo $storage->getMobileTrxs($data);
?>
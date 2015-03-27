<?php
include "../Storage.php";

if(isset($_POST['idArchivo'])) { $idArchivo = $_POST['idArchivo']; }
if(isset($_POST['fecha'])) { $fecha = $_POST['fecha']; }
if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }
if(isset($_POST['cliente'])) { $cliente = $_POST['cliente']; }
if(isset($_POST['idUsuario'])) { $idUsuario = $_POST['idUsuario']; }
if(isset($_POST['usuario'])) { $usuario = $_POST['usuario']; }
if(isset($_POST['idProducto'])) { $idProducto = $_POST['idProducto']; }
if(isset($_POST['producto'])) { $producto = $_POST['producto']; }
if(isset($_POST['carTel'])) { $carTel = $_POST['carTel']; }
if(isset($_POST['importe'])) { $importe = $_POST['importe']; }
if(isset($_POST['cantTrxs'])) { $cantTrxs = $_POST['cantTrxs']; }
if(isset($_POST['trxProm'])) { $trxProm = $_POST['trxProm']; }
if(isset($_POST['idTerminal'])) { $idTerminal = $_POST['idTerminal']; }
if(isset($_POST['terminal'])) { $terminal = $_POST['terminal']; }
if(isset($_POST['modeloDeTerminal'])) { $modeloDeTerminal = $_POST['modeloDeTerminal']; }
if(isset($_POST['tipoTrx'])) { $tipoTrx = $_POST['tipoTrx']; }
if(isset($_POST['estado'])) { $estado = $_POST['estado']; }
if(isset($_POST['idLote'])) { $idLote = $_POST['idLote']; }
if(isset($_POST['identifTerminal'])) { $identifTerminal = $_POST['identifTerminal']; }

$data = array(
      'idArchivo' => $idArchivo,
      'fecha' => $fecha,
      'idCliente' => $idCliente,
      'cliente' => $cliente,
      'idUsuario' => $idUsuario,
      'usuario' => $usuario,
      'idProducto' => $idProducto,
      'producto' => $producto,
      'carTel' => $carTel,
      'importe' => $importe,
      'cantTrxs' => $cantTrxs,
      'trxProm' => $trxProm,
      'idTerminal' => $idTerminal,
      'terminal' => $terminal,
      'modeloDeTerminal' => $modeloDeTerminal,
      'tipoTrx' => $tipoTrx,
      'estado' => $estado,
      'idLote' => $idLote,
      'identifTerminal' => $identifTerminal
);

$storage = new Storage();
echo $storage->insertTrx($data);
?>


<?php
	include '../Storage.php';

	if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }
	if(isset($_POST['clienteZona'])) { $clienteZona = $_POST['clienteZona']; }
	if(isset($_POST['clienteComision'])) { $clienteComision = $_POST['clienteComision']; }
	if(isset($_POST['clienteStatus'])) { $clienteStatus = $_POST['clienteStatus']; }
	
	$data = array(
	      'idCliente' => $idCliente,
	      'clienteZona' => $clienteZona,
	      'clienteComision' => $clienteComision,
	      'clienteStatus' => $clienteStatus
	);

	$storage = new Storage();
	echo $storage->updateClient($data);
?>
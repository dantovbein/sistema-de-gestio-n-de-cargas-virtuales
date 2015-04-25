<?php
	include '../Storage.php';

	if(isset($_POST['idCliente'])) { $idCliente = $_POST['idCliente']; }
	if(isset($_POST['clienteZona'])) { $clienteZona = $_POST['clienteZona']; }
	if(isset($_POST['clienteComisionTelefonia'])) { $clienteComisionTelefonia = $_POST['clienteComisionTelefonia']; }
	if(isset($_POST['clienteComisionTvPrepaga'])) { $clienteComisionTvPrepaga = $_POST['clienteComisionTvPrepaga']; }
	if(isset($_POST['clienteStatus'])) { $clienteStatus = $_POST['clienteStatus']; }
	
	$data = array(
	      'idCliente' => $idCliente,
	      'clienteZona' => $clienteZona,
	      'clienteComisionTelefonia' => $clienteComisionTelefonia,
	      'clienteComisionTvPrepaga' => $clienteComisionTvPrepaga,
	      'clienteStatus' => $clienteStatus
	);

	$storage = new Storage();
	echo $storage->updateClient($data);
?>
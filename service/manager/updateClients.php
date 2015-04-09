<?php
	include '../Storage.php';

	if(isset($_POST['clients'])) { $clients = $_POST['clients']; }

	$data = array(
	      'clients' => $clients
	);

	$storage = new Storage();
	echo $storage->updateClients($data);
?>
<?php
	session_start();
	session_destroy();

	if(isset($_SESSION['username'])) {
		echo "Ya estas desconectado";
	} else {
		echo "No se puedo desloguearte porque no estuviste logueado";
	}

?>
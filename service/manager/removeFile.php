<?php
	if(isset($_POST['fileName'])) { $fileName = $_POST['fileName']; }

	//$file = '/home/yoviajoriveras/public_html/cargas_virtuales/files/' . $fileName;
	$file = '/Applications/XAMPP/xamppfiles/htdocs/sistema-de-gestion-de-cargas-virtuales/files/' . $fileName;
	
	unlink($file);
?>
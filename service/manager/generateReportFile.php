<?php
	if(isset($_POST['fecha'])){ $fecha = $_POST['fecha']; };
	if(isset($_POST['data'])){ $data = json_decode($_POST['data'],true); };

	$txt = "";
	$txt .= "\n";
	$txt .= "\n";
	$txt .= "Informe de cobranza: " . $fecha . "\n";
	$txt .= "\n";
	$txt .= "\n";
	$txt .= "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
	$txt .= "\n";
	$txt .= "Fecha   |   ID Cliente   |   Cliente   |   ID Zona   |   Subtotal telefonía   |   Comision telefonía   |   Cant. tiradas   |   Importe total tiradas   |   Importe total telefonía   |   Subtotal Tv prepaga   |   Comision Tv prepaga   |   Total Tv prepaga   |   Total a cobrar";
	$txt .= "\n";
	$txt .= "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
	$txt .= "\n";
	$txt .= "\n";
	$txt .= "\n";

	foreach ($data as $dataClient) {
		$txt .= $dataClient['fecha'];
		$txt .=  "   ";
		$txt .= $dataClient['idCliente'];
		$txt .=  "   ";
		$txt .= $dataClient['cliente'];
		$txt .=  "   ";
		$txt .= $dataClient['clienteZona'];
		$txt .=  "   ";
		$txt .= "$" . $dataClient['subtotalTelefonia'];
		$txt .=  "   ";
		$txt .= "$" . $dataClient['clienteComisionTelefonia'];
		$txt .=  "   ";
		$txt .= $dataClient['totalTelefoniaTrxs'];
		$txt .=  "   ";
		$txt .= "$" . $dataClient['totalComisionMobile'];
		$txt .=  "   ";
		$txt .= "$" . $dataClient['totalTelefonia'];
		$txt .=  "   ";
		$txt .= "$" . $dataClient['subtotalTvPrepaga'];	
		$txt .=  "   ";
		$txt .= $dataClient['clienteComisionTvPrepaga'] . "%";
		$txt .=  "   ";
		$txt .= "$" . $dataClient['totalTvPrepaga'];
		$txt .=  "   ";	
		$txt .= "$" . $dataClient['total'];	

		$txt .= "\n";
	}
	
	// Create the file
	$date = getdate();
	$fileName = "reporte_" . $date["mday"] . $date["mon"] . $date["year"] . "_" . $date["hours"] . $date["minutes"] . $date["seconds"] . ".txt";
	$file = fopen($fileName, "w");
	fwrite($file,$txt);
	fclose($file);

	// Copy the file
	$filePath = $_SERVER['DOCUMENT_ROOT'] . "/sistema-de-gestion-de-cargas-virtuales/files/reports/" . $fileName;
	copy($fileName, $filePath);

	// Remove the old file
	unlink($fileName);

	echo $filePath;

?>
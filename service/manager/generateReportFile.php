<?php
	if(isset($_POST['fecha'])){ $fecha = $_POST['fecha']; };
	if(isset($_POST['data'])){ $data = json_decode($_POST['data'],true); };

	$txt = "";
	$txt .= "\r\n";
	$txt .= "\r\n";
	//$txt .= "----------------------------------------------";
	//$txt .= "\n";
	$txt .= "Informe de cobranza: " . $fecha;
	//$txt .= "\n";
	//$txt .= "----------------------------------------------";
	$txt .= "\r\n";
	$txt .= "\r\n";
	//$txt .= "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
	//$txt .= "\n";
	//$txt .= "Fecha   |   ID Cliente   |   Cliente   |   ID Zona   |   Subtotal telefonia   |   Comision telefonia   |   Cantidad tiradas   |   Importe total tiradas   |   Importe total telefonia   |   Subtotal Tv prepaga   |   Comision Tv prepaga   |   Total Tv prepaga   |   Total a cobrar";
	//$txt .= "Fecha   |   Cliente   |   Sub. telefonia   |   Tiradas   |   Importe tiradas   |   Importe total telefonia   |   Sub. Tv prepaga   |   Comision Tv prepaga   |   Total Tv prepaga   |   Total a cobrar";
	//$txt .= "\n";
	//$txt .= "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
	//$txt .= "\n";

	foreach ($data as $dataClient) {
		//$txt .= $dataClient['fecha'];
		//$txt .=  "   ";
		$txt .= $dataClient['idCliente'];
		$txt .=  "-";
		//$txt .=  "   ";
		$txt .= $dataClient['cliente'];
		$txt .=  " ";
		//$txt .= $dataClient['clienteZona'];
		//$txt .=  "   ";
		$txt .=  "Tel.";
		$txt .= "$" . $dataClient['subtotalTelefonia'];
		$txt .=  " ";
		//$txt .= "$" . $dataClient['clienteComisionTelefonia'];
		//$txt .=  "   ";
		$txt .= "T.";
		$txt .= $dataClient['totalTelefoniaTrxs'];
		$txt .=  " ";
		$txt .= "I.Tir:";
		$txt .= "$" . $dataClient['totalComisionMobile'];
		$txt .=  " ";
		$txt .= "T.Telef:";
		$txt .= "$" . $dataClient['totalTelefonia'];
		$txt .=  " ";
		$txt .= "I.Tv:";
		$txt .= "$" . $dataClient['subtotalTvPrepaga'];	
		$txt .=  " ";
		$txt .= "C.Tv:";
		//$txt .= $dataClient['clienteComisionTvPrepaga'] . "%";
		//$txt .=  " ";
		$txt .= "$" . $dataClient['totalComisionTvPrepaga'];
		$txt .=  " ";
		$txt .= "T.Tv:";
		$txt .= "$" . $dataClient['totalTvPrepaga'];
		$txt .=  " ";
		$txt .= "T.Final:";	
		$txt .= "$" . $dataClient['total'];	

		$txt .= "\r\n";
		$txt .= "----------------------------------------------------------------------------------------------------------------------------------------------------";
		$txt .= "\r\n";
	}
	
	// Create the file
	$date = getdate();
	$fileName = "reporte_" . $date["mday"] . $date["mon"] . $date["year"] . "_" . $date["hours"] . $date["minutes"] . $date["seconds"] . ".txt";
	$fileName2 = "reporte_" . $date["mday"] . $date["mon"] . $date["year"] . "_" . $date["hours"] . $date["minutes"] . $date["seconds"] . ".txt";
	$file = fopen($fileName, "w");
	fwrite($file,$txt);
	fclose($file);

	// Copy the file
	//$filePath = $_SERVER['DOCUMENT_ROOT'] . "/sistema-de-gestion-de-cargas-virtuales/files/reports/" . $fileName;
	$filePath = "/home/yoviajoriveras/public_html/cargas_virtuales/files/reports/" . $fileName;


	//$filePath = $_SERVER['DOCUMENT_ROOT'] . "/cargas_virtuales/files/xls/" . $fileName;
	//$filePath = '/home/yoviajoriveras/public_html/cargas_virtuales/files/reports/' . $fileName;
	//$filePath = 'http://cargasvirtuales.yoviajoriveras.com/files/reports/' . $fileName;

	copy($fileName, $filePath);

	// Remove the old file
	unlink($fileName);


	echo "files/reports/" . $fileName2;

?>
<?php
class Storage {
	public $host = "";	
	public $server = "";
	public $password = "";
	public $dataBase = "";
	private $sql;

	public function Storage() {
		$debug = !true;
		if($debug) {
			$this->host = "localhost";	
			$this->server = "root";
			$this->password = "";
			$this->dataBase = "sistema_de_gestion_de_cargas_virtuales";
		} else {
			$this->host = "192.186.248.103";	
			$this->server = "yoviajoriveras";
			$this->password = "Lucho1974";
			$this->dataBase = "sistema_de_gestion_de_cargas_virtuales";
		}
	}

	private function connect() {
		$this->sql = mysql_connect($this->host , $this->server , $this->password) or die ('Error al conectarse a sql');
		mysql_select_db($this->dataBase) or die ("Error al conectarse a la Base de Datos");
	}

	private function close() {
		mysql_close($this->sql);
	}
	
	public function login($data) {
		session_start();
		$this->connect();

		$userName = $data['userName'];
		$userPassword = $data['userPassword'];
		
		$query = 'SELECT * FROM admin WHERE ADMIN_USER_NAME="' . $userName . '"';
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);

		if($data['userName'] != $row['ADMIN_USER_NAME']) {
			echo "Usuario inexistente";
		} else if($data['userPassword'] != $row['ADMIN_USER_PASSWORD']) {
			echo "Clave incorrecta";
		} else {
			$_SESSION['userid'] = $row['ADMIN_USER_ID'];
			$_SESSION['userName'] = $row['ADMIN_USER_NAME'];
			$_SESSION['userPassword'] = $row['ADMIN_USER_PASSWORD'];
			echo 1;
		}
		$this->close();		
	}

	public function checkFileInCurrentDay($data){
		$this->connect();
		$query = 'SELECT * FROM archivos_subidos WHERE ARCHIVO_FECHA_CREACION="' . $data['fileDate'] . '"';
		$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		
		$data = array();
		while ($row = mysql_fetch_array($result)) {
			$obj = new stdClass();
			$obj->fileId = $row['ARCHIVO_ID'];
			$obj->fileName = $row['ARCHIVO_NOMBRE'];
			array_push($data, $obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function insertUploadedFileInformation($data){
		$this->connect();
		$query = 'INSERT INTO archivos_subidos (ARCHIVO_NOMBRE,ARCHIVO_FECHA_CREACION) VALUES ("' . $data['fileName'] . '","' . $data['creationFile'] . '")';
		mysql_query($query);
			
		$data = array(
			"fileId" =>  mysql_insert_id(),
			"fileName" => $data['fileName']
		);

		echo json_encode($data);
		$this->close();
	}

	public function insertTrx($data){
		$this->connect();
		$query = 'INSERT INTO transacciones (ARCHIVO_ID,FECHA,ID_CLIENTE,ID_CLIENTE_BIS,CLIENTE,ID_USUARIO,USUARIO,ID_PRODUCTO,PRODUCTO,CARTEL,IMPORTE,CANTIDAD_TRXS,TRX_PROMEDIO,ID_TERMINAL,TERMINAL,MODELO_DE_TERMINAL,TIPO_TRX,ESTADO,ID_LOTE,IDENTIFICACION_TERMINAL) VALUES ("' . $data['idArchivo'] . '","' . $data['fecha'] . '","' . $data['idCliente'] . '","' . $data['idCliente'] . '","' . $data['cliente'] . '","' . $data['idUsuario'] . '","' . $data['usuario'] . '","' . $data['idProducto'] . '","' . $data['producto'] . '","' . $data['carTel'] . '","' . $data['importe'] . '","' . $data['cantTrxs'] . '","' . $data['trxProm'] . '","' . $data['idTerminal'] . '","' . $data['terminal'] . '","' . $data['modeloDeTerminal'] . '","' . $data['tipoTrx'] . '","' . $data['estado'] . '","' . $data['idLote'] . '","' . $data['identifTerminal'] . '")';
		mysql_query($query);
		$this->insertClient(array( 'idCliente'=>$data["idCliente"], 'cliente'=>$data['cliente'] ));
		$this->close();
	}

	public function insertTrxs($data){
		$this->connect();
		$trxs = json_decode($data['trxs'],true);
		$index = 0;
		foreach ($trxs as $trx) {
		//for($i=0;$i<count($trxs);$i++) {
			if($index > 2) {
			//if($index > 3) {
				/*echo $data['fileId']; // ARCHIVO_ID
				echo $trx['A']; // FECHA
				echo $trx['B']; // ID_CLIENTE
				echo $trx['B']; // ID_CLIENTE_BIS
				echo $trx['C']; // CLIENTE
				echo $trx['D']; // ID_USUARIO
				echo $trx['F']; // USUARIO
				echo $trx['E']; // ID_PRODUCTO
				echo $trx['G']; // PRODUCTO
				echo $trx['H']; // CARTEL
				echo $trx['I']; // IMPORTE
				echo $trx['J']; // CANTIDAD_TRXS
				echo $trx['K']; // TRX_PROMEDIO
				echo $trx['L']; // ID_TERMINAL
				echo $trx['M']; // TERMINAL
				echo $trx['N']; // MODELO_DE_TERMINAL
				echo $trx['O']; // TIPO_TRX
				echo $trx['P']; // ESTADO
				echo $trx['Q']; // ID_LOTE
				echo $trx['R']; // IDENTIFICACION_TERMINAL*/
				//print '<br>';
				//print '----------------';
				//print '<br>';

				$query = 'INSERT INTO transacciones (ARCHIVO_ID,FECHA,ID_CLIENTE,ID_CLIENTE_BIS,CLIENTE,ID_USUARIO,USUARIO,ID_PRODUCTO,PRODUCTO,CARTEL,IMPORTE,CANTIDAD_TRXS,TRX_PROMEDIO,ID_TERMINAL,TERMINAL,MODELO_DE_TERMINAL,TIPO_TRX,ESTADO,ID_LOTE,IDENTIFICACION_TERMINAL) VALUES ("' . $data['fileId'] . '","' . $trx['A'] . '","' . $trx['B'] . '","' . $trx['B'] . '","' . $trx['C'] . '","' . $trx['D'] . '","' . $trx['E'] . '","' . $trx['F'] . '","' . $trx['G'] . '","' . $trx['H'] . '","' . str_replace(",",".",substr($trx['I'], 1)) . '","' . $trx['J'] . '","' . $trx['K'] . '","' . $trx['L'] . '","' . $trx['M'] . '","' . $trx['N'] . '","' . $trx['O'] . '","' . $trx['P'] . '","' . $trx['Q'] . '","' . $trx['R'] . '")';
				//$query = 'INSERT INTO transacciones (ARCHIVO_ID,FECHA,ID_CLIENTE,ID_CLIENTE_BIS,CLIENTE,ID_USUARIO,USUARIO,ID_PRODUCTO,PRODUCTO,CARTEL,IMPORTE,CANTIDAD_TRXS,TRX_PROMEDIO,ID_TERMINAL,TERMINAL,MODELO_DE_TERMINAL,TIPO_TRX,ESTADO,ID_LOTE,IDENTIFICACION_TERMINAL) VALUES ("' . $data['fileId'] . '","' . $trxs[$i]['A'] . '","' . $trxs[$i]['B'] . '","' . $trxs[$i]['B'] . '","' . $trxs[$i]['C'] . '","' . $trxs[$i]['D'] . '","' . $trxs[$i]['E'] . '","' . $trxs[$i]['F'] . '","' . $trxs[$i]['G'] . '","' . $trxs[$i]['H'] . '","' . $trxs[$i]['I'] . '","' . $trxs[$i]['J'] . '","' . $trxs[$i]['K'] . '","' . $trxs[$i]['L'] . '","' . $trxs[$i]['M'] . '","' . $trxs[$i]['N'] . '","' . $trxs[$i]['O'] . '","' . $trxs[$i]['P'] . '","' . $trxs[$i]['Q'] . '","' . $trxs[$i]['R'] . '")';
				mysql_query($query);
				$this->insertClient(array( 'idCliente'=>$trx['B'], 'cliente'=>$trx['C'] ));
				//$this->insertClient(array( 'idCliente'=>$trxs[$i]['B'], 'cliente'=>$trxs[$i]['C'] ));
			}
			$index++;
		}

		$this->close();
	}


	public function removeDataById($data){
		$this->connect();
		$queryFiles = 'DELETE FROM archivos_subidos WHERE ARCHIVO_ID=' . $data['fileId'];
		mysql_query($queryFiles);
		$queryTrxs = 'DELETE FROM transacciones WHERE ARCHIVO_ID=' . $data['fileId'];
		mysql_query($queryTrxs);
		$this->close();
	}
	
	public function getFiles(){
		$this->connect();
		$query = 'SELECT * FROM archivos_subidos ORDER BY ARCHIVO_FECHA_CREACION desc';
		$result = mysql_query($query);

		$data = array();
		while ($row = mysql_fetch_array($result)) {
			$obj = new stdClass();
			$obj->fileId = $row['ARCHIVO_ID'];
			$obj->fileName = $row['ARCHIVO_NOMBRE'];
			$obj->createdFile = $row['ARCHIVO_FECHA_CREACION'];
			$obj->uploadedFile = $row['ARCHIVO_FECHA_SINCRONIZACION'];
			array_push($data, $obj);
		}
		echo json_encode($data);
		
		$this->close();
	}

	/*public function insertClient($data){
		$this->connect();
		if($this->checkClient($data['idCliente']) == 0){
			$query = 'INSERT INTO clientes (ID_CLIENTE,ID_CLIENTE_BIS,CLIENTE) VALUES ("' . $data['idCliente'] . '","' . $data['idCliente'] . '","' . $data['cliente']  . '")';
			mysql_query($query);
		}
		$this->close();
	}*/

	public function insertClient($data){
		if($this->checkClient($data['idCliente']) == 0){
			$query = 'INSERT INTO clientes (ID_CLIENTE,ID_CLIENTE_BIS,CLIENTE) VALUES ("' . $data['idCliente'] . '","' . $data['idCliente'] . '","' . $data['cliente']  . '")';
			mysql_query($query);
		}
	}

	public function checkClient($idCliente){
		$this->connect();
		$query = 'SELECT count(ID_CLIENTE) FROM clientes WHERE ID_CLIENTE=' . $idCliente;
		$result = mysql_query($query);
		return mysql_result($result, 0);
		$this->close();
	}

	public function updateClient($data){
		$this->connect();
		$query = 'UPDATE clientes SET CLIENTE_ZONA="' . $data['clienteZona'] . '",' . 'CLIENTE_COMISION="' . $data['clienteComision'] . '",' . 'CLIENTE_STATUS="' . $data['clienteStatus'] . '"' . ' WHERE ID_CLIENTE="' . $data['idCliente'] . '"' ;
		mysql_query($query);
		$this->close();
	}

	public function updateClients($data){
		$this->connect();
		$clients = json_decode($data['clients'],true);
		foreach ($clients as $client) {
			$query = 'UPDATE clientes SET CLIENTE_ZONA="' . $client['clienteZona'] . '",' . 'CLIENTE_COMISION="' . $client['clienteComision'] . '",' . 'CLIENTE_STATUS="' . $client['clienteStatus'] . '"' . ' WHERE ID_CLIENTE="' . $client['idCliente'] . '"' ;
			mysql_query($query);
		}
		$this->close();
	}

	public function getClients(){
		$this->connect();
		$query = 'SELECT * FROM clientes';
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->idCliente = $row['ID_CLIENTE'];
			$obj->cliente = $row['CLIENTE'];
			$obj->clienteZona = $row['CLIENTE_ZONA'];
			$obj->clienteComision = $row['CLIENTE_COMISION'];
			$obj->clienteStatus = $row['CLIENTE_STATUS'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getUsers(){
		$this->connect();
		$query = 'SELECT DISTINCT ID_USUARIO,USUARIO from transacciones WHERE ID_USUARIO !=0 ORDER BY USUARIO';
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->idUsuario = $row['ID_USUARIO'];
			$obj->usuario = $row['USUARIO'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getProducts(){
		$this->connect();
		$query = 'SELECT DISTINCT ID_PRODUCTO,PRODUCTO FROM transacciones ORDER BY ID_PRODUCTO';
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->idProducto = $row['ID_PRODUCTO'];
			$obj->producto = $row['PRODUCTO'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getTerminals(){
		$this->connect();
		$query = 'SELECT DISTINCT MODELO_DE_TERMINAL,ID_TERMINAL,TERMINAL FROM transacciones WHERE ID_TERMINAL != 0 ORDER BY MODELO_DE_TERMINAL';
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->idTerminal = $row['ID_TERMINAL'];
			$obj->terminal = $row['TERMINAL'];
			$obj->modeloDeTerminal = $row['MODELO_DE_TERMINAL'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getTrxsStatus(){
		$this->connect();
		$query = 'SELECT DISTINCT ESTADO FROM transacciones ORDER BY ESTADO';
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->estado = $row['ESTADO'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getMobileTrxs($data) {
		$this->connect();
		$query = 'SELECT T1.ID_TRX,T1.FECHA,T1.ESTADO,T1.ID_CLIENTE,T1.CLIENTE,T1.ID_USUARIO,T1.USUARIO,T1.ID_PRODUCTO,T1.PRODUCTO,T1.CARTEL,T1.IMPORTE,T1.CANTIDAD_TRXS,T1.TRX_PROMEDIO,T1.ID_TERMINAL,T1.TERMINAL,T1.MODELO_DE_TERMINAL,T1.TIPO_TRX,T1.ID_LOTE,T1.IDENTIFICACION_TERMINAL,T2.CLIENTE_ZONA,T2.CLIENTE_COMISION,T2.CLIENTE_STATUS FROM transacciones T1 INNER JOIN clientes T2 ON T1.ID_CLIENTE_BIS = T2.ID_CLIENTE_BIS WHERE ';
		$query .= 'T1.FECHA="' . $data['fecha'] . '"';
		$query .= ' AND T1.ESTADO="' . $data['estado'] . '"';

		if($data['idUsuario'] != ""){
			$query .= ' AND T1.ID_USUARIO="' . $data['idUsuario'] . '"';
		}

		if($data['idCliente'] != ""){
			$query .= ' AND T1.ID_CLIENTE="' . $data['idCliente'] . '"';
		}

		if($data['idProducto'] != ""){
			$query .= ' AND T1.ID_PRODUCTO="' . $data['idProducto'] . '"';
		}else{
			$query .= ' AND T1.ID_PRODUCTO!="' . 24 . '"';
		}

		if($data['modeloDeTerminal'] != ""){
			$query .= ' AND T1.MODELO_DE_TERMINAL="' . $data['modeloDeTerminal'] . '"';
		}

		if($data['clienteZona'] != ""){
			$query .= ' AND T2.CLIENTE_ZONA="' . $data['clienteZona'] . '"';
		}

		$query .= ' ORDER BY T1.ID_CLIENTE';
		
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->idTrx = $row['ID_TRX'];
			$obj->fecha = $row['FECHA'];
			$obj->estado = $row['ESTADO'];
			$obj->idCliente = $row['ID_CLIENTE'];
			$obj->cliente = $row['CLIENTE'];
			$obj->clienteComision = $row['CLIENTE_COMISION'];
			$obj->clienteZona = $row['CLIENTE_ZONA'];
			$obj->clienteStatus = $row['CLIENTE_STATUS'];
			$obj->idUsuario = $row['ID_USUARIO'];
			$obj->usuario = $row['USUARIO'];
			$obj->idProducto = $row['ID_PRODUCTO'];
			$obj->producto = $row['PRODUCTO'];
			$obj->carTel = $row['CARTEL'];
			$obj->importe = $row['IMPORTE'];
			$obj->cantidadTrxs = $row['CANTIDAD_TRXS'];
			$obj->trxPromedio = $row['TRX_PROMEDIO'];
			$obj->idTerminal = $row['ID_TERMINAL'];
			$obj->terminal = $row['TERMINAL'];
			$obj->modeloDeTerminal = $row['MODELO_DE_TERMINAL'];
			$obj->tipoTrx = $row['TIPO_TRX'];
			$obj->idLote = $row['ID_LOTE'];
			$obj->identifTerminal = $row['IDENTIFICACION_TERMINAL'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function getTvTrxs($data) {
		$this->connect();
		$query = 'SELECT T1.ID_TRX,T1.FECHA,T1.ESTADO,T1.ID_CLIENTE,T1.CLIENTE,T1.ID_USUARIO,T1.USUARIO,T1.ID_PRODUCTO,T1.PRODUCTO,T1.CARTEL,T1.IMPORTE,T1.CANTIDAD_TRXS,T1.TRX_PROMEDIO,T1.ID_TERMINAL,T1.TERMINAL,T1.MODELO_DE_TERMINAL,T1.TIPO_TRX,T1.ID_LOTE,T1.IDENTIFICACION_TERMINAL,T2.CLIENTE_ZONA,T2.CLIENTE_COMISION,T2.CLIENTE_STATUS FROM transacciones T1 INNER JOIN clientes T2 ON T1.ID_CLIENTE_BIS = T2.ID_CLIENTE_BIS WHERE ';
		$query .= 'T1.FECHA="' . $data['fecha'] . '"';
		$query .= ' AND T1.ESTADO="' . $data['estado'] . '"';

		if($data['idUsuario'] != ""){
			$query .= ' AND T1.ID_USUARIO="' . $data['idUsuario'] . '"';
		}

		if($data['idCliente'] != ""){
			$query .= ' AND T1.ID_CLIENTE="' . $data['idCliente'] . '"';
		}

		if($data['idProducto'] != ""){
			$query .= ' AND T1.ID_PRODUCTO="' . $data['idProducto'] . '"';
		}

		if($data['modeloDeTerminal'] != ""){
			$query .= ' AND T1.MODELO_DE_TERMINAL="' . $data['modeloDeTerminal'] . '"';
		}

		if($data['clienteZona'] != ""){
			$query .= ' AND T2.CLIENTE_ZONA="' . $data['clienteZona'] . '"';
		}

		$query .= ' ORDER BY T1.ID_CLIENTE';
		
		$result = mysql_query($query);
		$data = array();
		while($row = mysql_fetch_array($result)){
			$obj = new stdClass();
			$obj->idTrx = $row['ID_TRX'];
			$obj->fecha = $row['FECHA'];
			$obj->estado = $row['ESTADO'];
			$obj->idCliente = $row['ID_CLIENTE'];
			$obj->cliente = $row['CLIENTE'];
			$obj->clienteComision = $row['CLIENTE_COMISION'];
			$obj->clienteZona = $row['CLIENTE_ZONA'];
			$obj->clienteStatus = $row['CLIENTE_STATUS'];
			$obj->idUsuario = $row['ID_USUARIO'];
			$obj->usuario = $row['USUARIO'];
			$obj->idProducto = $row['ID_PRODUCTO'];
			$obj->producto = $row['PRODUCTO'];
			$obj->carTel = $row['CARTEL'];
			$obj->importe = $row['IMPORTE'];
			$obj->cantidadTrxs = $row['CANTIDAD_TRXS'];
			$obj->trxPromedio = $row['TRX_PROMEDIO'];
			$obj->idTerminal = $row['ID_TERMINAL'];
			$obj->terminal = $row['TERMINAL'];
			$obj->modeloDeTerminal = $row['MODELO_DE_TERMINAL'];
			$obj->tipoTrx = $row['TIPO_TRX'];
			$obj->idLote = $row['ID_LOTE'];
			$obj->identifTerminal = $row['IDENTIFICACION_TERMINAL'];
			array_push($data,$obj);
		}
		echo json_encode($data);
		$this->close();
	}
}
?>
<?php
/* Storage : Admin */
class Storage {
	public $host = "localhost";	
	public $server = "root";
	public $password = "";
	public $dataBase = "quiniela";
	
	/*
	public $host = "192.186.248.103";
	public $server = "yoviajoriveras";
	public $password = "Lucho1974";
	public $dataBase = "quiniela";
	*/

	private $sql;

	public function Storage() { }

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
		
		$query = 'SELECT * FROM admin WHERE user_name="' . $userName . '"';
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);

		if($data['userName'] != $row['user_name']) {
			echo "Usuario inexistente";
		} else if($data['userPassword'] != $row['user_password']) {
			echo "Clave incorrecta";
		} else {
			$_SESSION['userid'] = $row['user_id'];
			$_SESSION['userName'] = $row['user_name'];
			$_SESSION['userPassword'] = $row['user_password'];
			echo 1;
		}
		$this->close();		
	}

	public function getBetsData(){
		$this->connect();
		$queryBets = 'SELECT bet_id,id_vendor_bis,id_device_bis_vendor,bet_number,bet_position,bet_amount,bet_total_amount,bet_time_created,bet_time_uploaded,bet_time_canceled,vendor_full_name,bet_is_active
					 FROM bets T1
					 INNER JOIN vendors T2 ON T1.id_vendor = T2.id_vendor ORDER BY bet_time_created asc';
		$resultBets = mysql_query($queryBets) or die ("Error en la consulta por las apuestas");
		$dataBets = array();
		while($bet = mysql_fetch_array($resultBets)) {
			$objBets = new stdClass;
			$objBets->betId = $bet['bet_id'];
			$objBets->idDevice = $bet['id_device_bis_vendor'];
			$objBets->idVendor = $bet['id_vendor_bis'];
			$objBets->vendorFullName = $bet['vendor_full_name'];
			$objBets->betNumber = $bet['bet_number'];
			$objBets->betPosition = $bet['bet_position'];
			$objBets->betAmount = $bet['bet_amount'];
			$objBets->betTotalAmount = $bet['bet_total_amount'];
			$objBets->betTimeCreated = $bet['bet_time_created'];
			$objBets->betTimeUploaded = $bet['bet_time_uploaded'];
			$objBets->betTimeCanceled = $bet['bet_time_canceled'];
			$objBets->betIsActive = $bet['bet_is_active'];
			$objBets->betNumberRedoblona = $bet['bet_number_redoblona'];
			$objBets->betPositionRedoblona = $bet['bet_position_redoblona'];
			array_push($dataBets, $objBets);
		}
		echo json_encode($dataBets);
		$this->close();
	}

	public function getBetFiltersData() {
		$this->connect();
		$mainData = array();
		$mainObjectData = new stdClass();

		$queryDevices = 'SELECT * FROM devices';
		$resultDevices = mysql_query($queryDevices) or die ("Error en la consulta por los dispositivos");
		$dataDevices = array();
		while ($device = mysql_fetch_array($resultDevices)) {
			$objDevice = new stdClass;
			$objDevice->idDevice = $device['id_device'];
			$objDevice->deviceSerialCode = $device['device_serial_code'];
			$objDevice->deviceDescription = $device['device_description'];
			array_push($dataDevices, $objDevice);
		}
		$mainObjectData->dataDevices = $dataDevices;
		
		$queryVendors = 'SELECT * FROM vendors';
		$resultVendors = mysql_query($queryVendors) or die ("Error en la consulta por los vendedores");
		$dataVendors = array();
		while ($vendor = mysql_fetch_array($resultVendors)) {
			$objVendor = new stdClass;
			$objVendor->idVendor = $vendor['id_vendor'];
			$objVendor->user = $vendor['vendor_user_name'];
			$objVendor->fullName = $vendor['vendor_full_name'];
			array_push($dataVendors, $objVendor);
		}
		$mainObjectData->dataVendors = $dataVendors;

		array_push($mainData, $mainObjectData);
		echo json_encode($mainData);
		$this->close();
	}

	public function getBetDataRelatedById($data) {
		$this->connect();
		$mainData = array();
		$objMainData = new stdClass();
		
		$queryBetData = 'SELECT * FROM bet_data WHERE bet_id=' . "'" . $data['betId'] . "'" ;
		$resultBetData = mysql_query($queryBetData) or die('Error en la consulta -> ' .  $query);
		
		$betData = array();
		while($bet = mysql_fetch_array($resultBetData)) {
			$objBetData = new stdClass;
			$objBetData->lotteryType = $bet['lottery_type'];
			$objBetData->lotteryTypeDesc = $bet['lottery_type_desc'];
			$objBetData->lotteryName = $bet['lottery_name'];	
			$objBetData->lotteryNameDesc = $bet['lottery_name_desc'];		
			array_push($betData, $objBetData);
		}
		
		$objMainData->betData = $betData;
		array_push($mainData, $objMainData);
		echo json_encode($mainData);
		$this->close();
	}

	public function searchBetsByNumber($data) {
		$this->connect();
		
		$query = 'SELECT bet_id,bet_number,bet_position,bet_number_redoblona,bet_position_redoblona,bet_amount,bet_total_amount,bet_time_created,bet_time_uploaded,bet_time_canceled,id_vendor_bis,vendor_full_name,id_device_bis,device_description,device_serial_code,bet_is_active FROM bets';
		$query .= ' INNER JOIN vendors ON bets.id_vendor = vendors.id_vendor INNER JOIN devices ON bets.id_device = devices.id_device';
		$query .= ' WHERE bet_time_uploaded BETWEEN ' . "'" . $data['dateFrom'] . "'" . ' AND ' . "'" . $data['dateTo'] . "'";

		$betNumber = $data['betNumber'];
		$betNumber1 = substr($betNumber, -1);
		$betNumber2 = substr($betNumber, -2);
		$betNumber3 = substr($betNumber, -3);


		$query .= ' AND (bet_number=' . $betNumber . ' OR bet_number=' . $betNumber3 . ' OR bet_number=' . $betNumber2 . ' OR bet_number=' . $betNumber1 . ')';

		$hasFilters = ($data['idVendor']!="-1" || $data['idDevice']!="-1") ? true : false;
		if($hasFilters) {
			if($data['idVendor'] != "-1") {
				$query .= ' AND id_vendor_bis=' . $data['idVendor'];
			} else if($data['idDevice'] != "-1") {
				$query .= ' AND id_device_bis=' . $data['idDevice'];
			}
		}
		$query .= " ORDER BY bet_id DESC";

		$result = mysql_query($query) or die ("Error en la consulta por las apuestas");
		$dataBets = array();
		while($row = mysql_fetch_array($result)) {
			$objBets = new stdClass;
			$objBets->betId = $row['bet_id'];
			$objBets->idDevice = $row['id_device'];
			$objBets->idVendor = $row['id_vendor'];
			$objBets->betNumber = $row['bet_number'];
			$objBets->betPosition = $row['bet_position'];
			$objBets->betNumberRedoblona = $row['bet_number_redoblona'];
			$objBets->betPositionRedoblona = $row['bet_position_redoblona'];
			$objBets->betAmount = $row['bet_amount'];
			$objBets->betTotalAmount = $row['bet_total_amount'];
			$objBets->betTimeCreated = $row['bet_time_created'];
			$objBets->betTimeUploaded = $row['bet_time_uploaded'];
			$objBets->betTimeCanceled = $row['bet_time_canceled'];
			$objBets->idVendor = $row['id_vendor_bis'];
			$objBets->vendorFullName = $row['vendor_full_name'];
			$objBets->idDevice = $row['id_device_bis'];
			$objBets->deviceDescription = $row['device_description'];
			$objBets->deviceSerialCode = $row['device_serial_code'];	
			$objBets->betIsActive = $row['bet_is_active'];
			array_push($dataBets, $objBets);
		}
		echo json_encode($dataBets);
		$this->close();
	}

	public function searchBetsByDates($data) {
		$this->connect();
		
		$query = 'SELECT bet_id,bet_number,bet_position,bet_number_redoblona,bet_position_redoblona,bet_amount,bet_total_amount,bet_time_created,bet_time_uploaded,bet_time_canceled,id_vendor_bis,vendor_full_name,id_device_bis,device_description,device_serial_code,bet_is_active FROM bets';
		$query .= ' INNER JOIN vendors ON bets.id_vendor = vendors.id_vendor INNER JOIN devices ON bets.id_device = devices.id_device';
		$query .= ' WHERE bet_time_uploaded BETWEEN ' . "'" . $data['dateFrom'] . "'" . ' AND ' . "'" . $data['dateTo'] . "'";

		$hasFilters = ($data['idVendor']!="-1" || $data['idDevice']!="-1") ? true : false;
		if($hasFilters) {
			if($data['idVendor'] != "-1") {
				$query .= ' AND id_vendor_bis=' . $data['idVendor'];
			} else if($data['idDevice'] != "-1") {
				$query .= ' AND id_device_bis=' . $data['idDevice'];
			}
		}
		$query .= " ORDER BY bet_id DESC";

		$result = mysql_query($query) or die ("Error en la consulta por las apuestas");
		$dataBets = array();
		while($row = mysql_fetch_array($result)) {
			$objBets = new stdClass;
			$objBets->betId = $row['bet_id'];
			$objBets->idDevice = $row['id_device'];
			$objBets->idVendor = $row['id_vendor'];
			$objBets->betNumber = $row['bet_number'];
			$objBets->betPosition = $row['bet_position'];
			$objBets->betNumberRedoblona = $row['bet_number_redoblona'];
			$objBets->betPositionRedoblona = $row['bet_position_redoblona'];
			$objBets->betAmount = $row['bet_amount'];
			$objBets->betTotalAmount = $row['bet_total_amount'];
			$objBets->betTimeCreated = $row['bet_time_created'];
			$objBets->betTimeUploaded = $row['bet_time_uploaded'];
			$objBets->betTimeCanceled = $row['bet_time_canceled'];
			$objBets->idVendor = $row['id_vendor_bis'];
			$objBets->vendorFullName = $row['vendor_full_name'];
			$objBets->idDevice = $row['id_device_bis'];
			$objBets->deviceDescription = $row['device_description'];
			$objBets->deviceSerialCode = $row['device_serial_code'];			
			$objBets->betIsActive = $row['bet_is_active'];
			array_push($dataBets, $objBets);
		}
		echo json_encode($dataBets);
		$this->close();
	}

	public function getVendorsData(){
		$this->connect();
		$queryVendor = 'SELECT * FROM vendors';
		
		$resultVendors = mysql_query($queryVendor) or die ("Error en la consulta por los vendedores");

		$queryDevices = 'SELECT * FROM devices';
		$resultDevices = mysql_query($queryDevices) or die ("Error en la consulta por los dispositivos");
		$dataDevices = array();
		while ($device = mysql_fetch_array($resultDevices)) {
			$objDevice = new stdClass;
			$objDevice->idDevice = $device['id_device'];
			$objDevice->deviceSerialCode = $device['device_serial_code'];
			$objDevice->deviceDescription = $device['device_description'];
			array_push($dataDevices, $objDevice);
		}

		$dataVendors = array();
		while($vendor = mysql_fetch_array($resultVendors)) {
			$objVendor = new stdClass;
			$objVendor->idVendor = $vendor['id_vendor'];
			if($vendor['id_device_bis_vendor']==0){
				$objVendor->idDevice = "";
				$objVendor->deviceSerialCode = "";
				$objVendor->deviceDescription = "";
			} else {
				foreach ($dataDevices as $device) {
					if($device->idDevice ==$vendor['id_device_bis_vendor']) {
						$objVendor->idDevice = $device->idDevice;
						$objVendor->deviceSerialCode = $device->deviceSerialCode;
						$objVendor->deviceDescription = $device->deviceDescription;
					}
				}
			}
			$objVendor->user = $vendor['vendor_user_name'];
			$objVendor->password = $vendor['vendor_password'];
			$objVendor->fullName = $vendor['vendor_full_name'];
			$objVendor->appCode = $vendor['vendor_unlock_app_code'];
			$objVendor->code = $vendor['vendor_unlock_code'];
			$objVendor->dateCreated = $vendor['vendor_date_created'];
			$objVendor->lastConnection = $vendor['vendor_last_connection'];
			$objVendor->isActive = $vendor['vendor_is_active'];
			array_push($dataVendors, $objVendor);
		}
		echo json_encode($dataVendors);
		$this->close();
	}

	public function insertOrUpdateVendor($data){
		$this->connect();
		if($data['idVendor']=="0") {
			$query1 = "INSERT INTO vendors (vendor_user_name,vendor_password,vendor_full_name,vendor_unlock_app_code,vendor_unlock_code,id_device,id_device_bis_vendor) VALUES ('" . $data['user'] . "','" . $data['password'] . "','" . $data['fullName'] . "','" . $data['unlockAppCode'] . "','" . $data['unlockCode'] ."'," . $data['deviceId'] . "," . $data['deviceId'] . ");";
			mysql_query($query1) or die('Error en la consulta -> ' .  $query1);
			$lastInsertID = mysql_insert_id();
			$query2 = "UPDATE vendors SET id_vendor_bis=" . $lastInsertID . " WHERE id_vendor=" . $lastInsertID;
			mysql_query($query2) or die('Error en la consulta -> ' .  $query2);

		} else {
			$query = "UPDATE vendors SET vendor_user_name='" . $data['user'] . "',vendor_password='" . $data['password'] . "',vendor_full_name='" . $data['fullName'] . "',vendor_unlock_app_code='" . $data['unlockAppCode'] . "',vendor_unlock_code='" . $data['unlockCode'] . "',id_device='" . $data['deviceId'] . "',id_device_bis_vendor='" . $data['deviceId'] . "' WHERE id_vendor=" . $data['idVendor'];
			$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		}
		
		$this->close();
	}

	public function removeVendor($data){
		$this->connect();
		$query = "DELETE FROM vendors WHERE id_vendor='" . $data['idVendor'] . "'";
		//$query = "UPDATE vendors SET vendor_is_active=0 WHERE id_vendor='" . $data['idVendor'] . "'";
		mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	public function lockOrUnlockVendor($data){
		$this->connect();
		$query = "UPDATE vendors SET vendor_is_active=" . $data["isActive"] . " WHERE id_vendor='" . $data['idVendor'] . "'";
		mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}

	

	public function getDevicesData(){
		$this->connect();
		$query = 'SELECT * FROM devices WHERE device_is_active=1';
		$result = mysql_query($query) or die ("Error en la consulta por los dispositivos");
		$data = array();
		while($row = mysql_fetch_array($result)) {
			$obj = new stdClass;
			$obj->idDevice = $row['id_device'];
			$obj->deviceDescription = $row['device_description'];
			$obj->deviceSerialCode = $row['device_serial_code'];
			array_push($data, $obj);
		}
		echo json_encode($data);
		$this->close();
	}

	public function insertOrUpdateDevice($data){
		$this->connect();
		if($data['idDevice']=="0") {
			$query1 = "INSERT INTO devices (device_description,device_serial_code) VALUES ('" . $data['deviceDescription'] . "','" . $data['deviceSerialCode'] . "');";
			mysql_query($query1) or die('Error en la consulta -> ' .  $query1);
			$lastInsertID = mysql_insert_id();
			$query2 = "UPDATE devices SET id_device_bis=" . $lastInsertID . " WHERE id_device=" . $lastInsertID;
			mysql_query($query2) or die('Error en la consulta -> ' .  $query2);
		} else {
			$query = "UPDATE devices SET device_description='" . $data['deviceDescription'] . "',device_serial_code='" . $data['deviceSerialCode'] . "' WHERE id_device=" . $data['idDevice'];
			$result = mysql_query($query) or die('Error en la consulta -> ' .  $query);
		}		
		$this->close();
	}

	public function removeDevice($data){
		$this->connect();
		$query = "DELETE FROM devices WHERE id_device='" . $data['idDevice'] . "'";
		//$query = "UPDATE devices SET device_is_active=0 WHERE id_device='" . $data['idDevice'] . "'";
		mysql_query($query) or die('Error en la consulta -> ' .  $query);
		$this->close();
	}
}
?>
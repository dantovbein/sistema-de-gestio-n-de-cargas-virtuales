<?php
session_start();
$user = $_SESSION['userid'];
if($user == ""){
	echo "0";
}else{
	echo "1";
}

?>
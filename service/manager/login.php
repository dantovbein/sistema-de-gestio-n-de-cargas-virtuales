<?php
require_once "../Storage.php";

if(isset($_POST['userName'])) { $userName = $_POST['userName']; }
if(isset($_POST['userPassword'])) { $userPassword = $_POST['userPassword']; }

$data = array(
    "userName" => $userName,
    "userPassword" => $userPassword
);

$storage = new Storage();
echo $storage->login($data);
?>



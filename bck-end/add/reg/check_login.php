<?php
//проверка Логина и Пароля пользователя
if($_SERVER['REQUEST_METHOD'] == "POST"){

	include "../include/db_connect.php";
	include "../php/func.php";

	$login = clear_string($_POST['reg_login']);

	$result = mysql_query("SELECT login FROM users WHERE login='$login'", $link);

	if(mysql_num_rows($result) > 0){
		  echo 'false';
	} else {
		  echo 'true';
	}

}
?>
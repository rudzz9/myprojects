<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){

	//define('hhh', true);

   include "db_connect.php";
   include "../func/functions.php";

   $id = clear_string($_POST["id"]);

   $result = mysql_query("SELECT * FROM cart WHERE ip_cart='{$_SERVER['REMOTE_ADDR']}' AND id_cart='$id'",$link);

   if(mysql_num_rows($result) > 0){

   $row = mysql_fetch_array($result);

$new_count = $row["count_cart"] - 1;

if($new_count > 0){

   $update = mysql_query("UPDATE cart SET count_cart='$new_count' WHERE ip_cart='{$_SERVER['REMOTE_ADDR']}' AND id_cart='$id'", $link);
echo $new_count;
} else {
echo $row["count_cart"];
}
}

}

?>
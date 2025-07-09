<?php
$password = '0973531873'; 
$hash = password_hash($password, PASSWORD_DEFAULT);
echo "<b>Password:</b> $password<br><b>Hash:</b> $hash";
?> 
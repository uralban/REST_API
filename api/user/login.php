<?php
header("Access-Control-Allow-Origin: http://room4.loc/#");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->login = $data->login;
$login_exists = $user->loginExists();

include_once '../config/core.php';
include_once '../libs/php-jwt-master/BeforeValidException.php';
include_once '../libs/php-jwt-master/ExpiredException.php';
include_once '../libs/php-jwt-master/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/JWT.php';
use \Firebase\JWT\JWT;

if ( $login_exists && password_verify($data->password, $user->password) ) {
 
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => array(
           "id" => $user->id,
           "name" => $user->name,
           "login" => $user->login
       )
    );

    http_response_code(200);

    $jwt = JWT::encode($token, $key);
    echo json_encode(
        array(
            "message" => "Успешный вход в систему",
            "jwt" => $jwt
        )
    );
 
} else {

  http_response_code(401);

  echo json_encode(array("message" => "Ошибка входа"));
}
?>
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

$user->name = $data->name;
$user->login = $data->login;
$user->password = $data->password;

if (
    !empty($user->name) &&
    !empty($user->login) &&
    !empty($user->password) &&
    $user->checkLogin()
) {

    http_response_code(200);

    echo json_encode(array("message" => "login error"));

} else if (
    !empty($user->name) &&
    !empty($user->login) &&
    !empty($user->password) &&
    $user->create()
) {

    http_response_code(200);

    echo json_encode(array("message" => "Пользователь создан"));

} else {

    http_response_code(400);

    echo json_encode(array("message" => "Невозможно создать пользователя"));
}
?>
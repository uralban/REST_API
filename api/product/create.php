<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->name) &&
    !empty($data->price) &&
    !empty($data->quantity) &&
    !empty($data->description) &&
    !empty($data->category_id)
) {

    $product->name = $data->name;
    $product->price = $data->price;
    $product->quantity = $data->quantity;
    $product->description = $data->description;
    $product->category_id = $data->category_id;

    if($product->create()){

        http_response_code(201);

        echo json_encode(array("message" => "Продукт создан"), JSON_UNESCAPED_UNICODE);
    
    } else {

        http_response_code(503);

        echo json_encode(array("message" => "Невозможно создать продукт"), JSON_UNESCAPED_UNICODE);
    }

} else {

    http_response_code(400);

    echo json_encode(array("message" => "Невозможно создать продукт, данные неполные"), JSON_UNESCAPED_UNICODE);
}

?>
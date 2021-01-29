<?php
class Database {

	private $host = 'localhost';
	private $db_name = 'room4';
	private $username = 'root';
	private $password = 'root';
	public $connect_db;

	public function getConnection(){

        $this->connect_db = null;

        try {
            $this->connect_db = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->connect_db->exec("set names utf8");
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->connect_db;
    }

}
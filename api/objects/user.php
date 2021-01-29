<?php
class User {

    private $conn;
    private $check;
    private $table_name = "users";

    public $id;
    public $name;
    public $login;
    public $password;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {

        $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    login = :login,
                    password = :password";

        $stmt = $this->conn->prepare($query);

        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->login=htmlspecialchars(strip_tags($this->login));
        $this->password=htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':login', $this->login);

        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }

    function checkLogin(){

        $query = "SELECT id, name, login, password
                FROM " . $this->table_name . "
                WHERE login = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare( $query );

        $this->login=htmlspecialchars(strip_tags($this->login));

        $stmt->bindParam(1, $this->login);

        $stmt->execute();

        $num = $stmt->rowCount();

        if($num>0) {

            return true;
        }

        return false;
    }

    function loginExists(){

        $query = "SELECT id, name, login, password
                FROM " . $this->table_name . "
                WHERE login = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare( $query );

        $this->login=htmlspecialchars(strip_tags($this->login));

        $stmt->bindParam(1, $this->login);

        $stmt->execute();

        $num = $stmt->rowCount();

        if($num>0) {

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->login = $row['login'];
            $this->password = $row['password'];

            return true;
        }

        return false;
    }

    public function update(){

        $password_set=!empty($this->password) ? ", password = :password" : "";

        $query = "UPDATE " . $this->table_name . "
                SET
                    name = :name,
                    login = :login
                    {$password_set}
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->login=htmlspecialchars(strip_tags($this->login));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':login', $this->login);

        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }

        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }
     
        return false;
    }
}
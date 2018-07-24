<?php 

class Database 
{
    private const SERVERNAME="localhost";
    private const USERNAME="root";
    private const PASSWORD="";

    private $con;

    public function __construct() {
        // initialize the databse
        try {
            $this->con = new PDO("mysql:host=".self::SERVERNAME.";dbname=todo", self::USERNAME, self::PASSWORD);
            // set the PDO error mode to exception
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);            
         }
        catch(PDOException $e)
        {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getQuery($sql){
        try {
            $stmt = $this->con->prepare($sql);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            return $stmt->fetchAll();
        }
        catch(PDOException $e){
            echo $sql . '<br>'. $e->getMessage();
        }
    }

    public function insertQuery($sql){
        try{
            $this->con->exec($sql);
            return $this->con->lastInsertId(); 
        }
        catch(PDOException $e){
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    public function updateQuery($sql){
        try {
            $stmt = $this->con->prepare($sql);
            $stmt->execute();
            return $stmt->rowCount();
        }
        catch(PDOException $e){
            echo $sql . '<br>'. $e->getMessage();
        }
    }

    public function deleteQuery($sql){
        try{
            $this->con->exec($sql);
        }
        catch(PDOException $e){
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    public function __destruct() {
        // destroy the connection
        $this->con=null;
    }

}


?>
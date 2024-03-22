<?php 
include ("../models/appointment.php");
include ("db.php"); // db access
class DataHandler{
    // TODO: query functions
    
    /*$db_obj=new mysqli($host, $dbuser, $dbpassword, $database);
                $sql="SELECT * FROM person JOIN user_roles using(ur_id) WHERE email=?;";
                $stmt = $db_obj->prepare($sql);
    
                $stmt->bind_param('s',$email);
                $stmt->execute();
                $result = $stmt->get_result();
                $user=$result->fetch_array(MYSQLI_ASSOC);
    */
    public function queryAppointmentsById($id){
        
    }
}
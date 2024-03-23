<?php 
// TODO : can one get rid of absolute paths?!? without __DIR__?
set_include_path(get_include_path() . PATH_SEPARATOR . __DIR__);

include (__DIR__ . "/../models/appointment.php");
include (__DIR__ . "/../models/dateOption.php");
// db access
class DataHandler{

    private $dbObj;
    public function __construct() {
        // require_once ? 
        include ("db.php");
        $this->dbObj=new mysqli($host, $dbuser, $dbpassword, $database);
    }


    public function queryAllAppointments(){
        $sql="SELECT a_id, title, location, due_date, duration FROM appointments";
        $stmt=$this->dbObj->prepare($sql);

        if($stmt===false)
        {
            // Error
            return false;
        }

        $stmt->execute();
        $stmt->bind_result($id, $title, $location, $dueTime, $duration);

        $result=array();

        while($stmt->fetch())
        {
            $appointment=new Appointment($id, $title, $location,$dueTime,$duration);
            $result[]=$appointment;
        }

        $stmt->close();

        return $result;
    }
    
    public function queryAppointmentById($id){
        $sql="SELECT d_id, date from dates
        WHERE a_id=?";
        $stmt=$this->dbObj->prepare($sql);
        $stmt->bind_param('i',$id);

        if($stmt===false)
        {
            // Error
            return false;
        }

        $stmt->execute();
        $stmt->bind_result($d_id, $date);
        while($stmt->fetch())
        {
            $dateOption=new DateOption($id,$date);
            $result[]=$dateOption;
        }

        $stmt->close();

        return $result;
    }

    public function saveSelectedDates($param){
        $result="";

        //$appointmentId=$param['appointmentId'];
        $name=$param['name'];
        $comment=$param['comment'];
        $selectedDateIDs=$param['selectedDates'];

        $selectedDateIDsArray=explode(',',$selectedDateIDs);

        try{
            $stmt = $this->dbObj->prepare("INSERT INTO users (name, comment) VALUES (?, ?)");
            $stmt->bind_param("ss", $name, $comment);
            $stmt->execute();

            $userId=$this->dbObj->insert_id;    //returns last id from AUTO_INCREMENT field

            $sql=("INSERT INTO user_dates(u_id,d_id) VALUES (?,?)");
            $stmt = $this->dbObj->prepare($sql);
            $stmt->bind_param("ii",$userId, $dateId);

            foreach($selectedDateIDsArray as $dateId){
                $stmt->execute();
            }

            $result= "Success";
        }
        catch(Exception $ex){
            $result= "an error occured: " + $ex->getMessage();
        }

        return $result;
    }
}
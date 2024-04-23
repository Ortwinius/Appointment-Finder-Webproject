<?php 

set_include_path(get_include_path() . PATH_SEPARATOR . __DIR__);

include (__DIR__ . "/../db/dataHandler.php");

class SimpleLogic{
    private $dh;
    function __construct(){
        $this->dh = new DataHandler();
    }
    // TODO: request function for various queries
    function handleRequest($method, $param){
        switch ($method) {
            case "queryAppointmentById":
                $res = $this->dh->queryAppointmentById($param);
                break;
            case "queryAllAppointments":
                $res=$this->dh->queryAllAppointments();
                break;
            case "saveSelectedDates":
                $res=$this->dh->saveSelectedDates($param);
                break;
            case "saveNewAppointment":
                $res=$this->dh->saveNewAppointment($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
<?php 
include ("../db/dataHandler.php");

class SimpleLogic{
    private $dh;
    function __construct(){
        $this->dh = new DataHandler();
    }
    // TODO: request function for various queries
    function handleRequest($method, $param){
        switch ($method) {
            case "queryAppointmentsById":
                //$res = $this->dh->queryAppointmentsById();
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
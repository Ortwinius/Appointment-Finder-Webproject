<?php

class Appointment {
    public $id;
    public $startTime;
    public $duration;

    function __construct($id, $startTime, $duration){
        $this->id = $id;
        $this->startTime = $startTime;
        $this->duration = $duration;
    }
}
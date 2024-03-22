<?php

class Appointment {
    public $id;
    public $title;
    public $location;
    public $dueTime;
    public $duration;

    function __construct($id, $title, $location, $dueTime, $duration){
        $this->id = $id;
        $this->title=$title;
        $this->location=$location;
        $this->dueTime = $dueTime;
        $this->duration = $duration;
    }
}
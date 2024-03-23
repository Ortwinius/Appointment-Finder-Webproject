$(document).ready(function () {
    refreshPage();
});

// Reload page
function refreshPage(){
    $("#addAppointmentButton").click(function() {
        addAppointment();
    });
    $("#appointmentDetails").hide();
    loadAppointmentList();
}


function loadAppointmentList() {
    console.log("loading appointment list");
    // TODO: load data 
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAllAppointments"},
        dataType: "json",
        complete: function(response){
            console.log("Query successful");
            populateAppointmentList(response.responseJSON);
        }
    });
}

// load appointment objects into html
function populateAppointmentList(response){

    // Check if response is empty
    if (!Array.isArray(response) || response.length === 0) {
        console.log("Empty response or response is not an array.");
        return;
    }

    // Loop through each appointment object in the response array
    response.forEach(function(appointment) {
        // Extract appointment properties
        let id = appointment.id;
        let title = appointment.title;
        let location = appointment.location;
        let dueTime = appointment.dueTime;
        let duration = appointment.duration;

        // Create a clickable appointment entry
        let appointmentEntry = $('<div class="appointmentEntry">' + id + ': ' + title + '</div>');
        appointmentEntry.click(function() {
            loadAppointmentDetails(id);
        });

        // Append appointment entry to the appointment list
        $("#appointmentList").append(appointmentEntry);
    });
}

function loadAppointmentDetails(appointment_id) {
    console.log("CLICKED");
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointmentById", param: appointment_id},
        dataType: "json",
        complete: function (response) {
            populateAppointmentDetails(response.responseJSON);
            $("#appointmentDetails").show();
        }
        
    });
}

// load appointment details into html
function populateAppointmentDetails(response){
    // TODO
    console.log("Appointment " + response.appointment.appointment_id);
}

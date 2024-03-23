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
function populateAppointmentList(responseData){

    // Check if response is empty
    if (!Array.isArray(responseData) || responseData.length === 0) {
        console.log("Empty response or response is not an array.");
        return;
    }

    // Loop through each appointment object in the response array
    responseData.forEach(function(appointment) {
        // Extract appointment properties
        let id = appointment.id;
        let title = appointment.title;
        let location = appointment.location;
        let dueTime = appointment.dueTime;
        let duration = appointment.duration;

        // Create a clickable appointment entry
        let appointmentEntry = $('<div class="appointmentEntry">' + id + ': ' + title + '</div>');
        appointmentEntry.click(function() {
            cleanAppointmentDetails();
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
function populateAppointmentDetails(responseData){

    // TODO: show hours, due date and checkmarks
    
    let optionIndex = 1;
    let appointmentHeader = '<h2 class = "appointmentHeader"> Appointment ' + 
        responseData[0].id + '</h2>';
    
    $("#appointmentDetails").append(appointmentHeader);
    responseData.forEach(function(response){
        let dateValue = response.date;
        let appointmentDetails = $('<div class="#"> Option ' + optionIndex + ': ' + dateValue + '</div>');
        $("#appointmentDetails").append(appointmentDetails);
        optionIndex++;
    });
}

function cleanAppointmentDetails(){
    $("#appointmentDetails").empty();
}
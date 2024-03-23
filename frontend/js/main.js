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
    console.debug("loading appointment list");
    // TODO: load data 
    $.ajax({
        type: "GET",
        url: "../../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAllAppointments"},
        dataType: "json",
        complete: function (response) {
            populateAppointmentList(response);
        }
        
    });
}

// load appointment objects into html
function populateAppointmentList(response){
    if(response.length < 1) return;

    for(let i = 0; i < response.length; i++)
    {
        let appointmentEntry = response[i][0];

        // make appointment clickable and load details via id
        appointmentEntry.click(function(){
            loadAppointmentDetails(appointmentEntry.appointment_id);
        });

        // add appointments to parent object 
        $("#appointmentList").append('<div class = "appointmentEntry">' 
            + appointmentEntry.appointment_id + '</div>');
    }
}

function loadAppointmentDetails(appointment_id) {
    console.debug("CLICKED");
    $.ajax({
        type: "GET",
        url: "../../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointmentById", param: appointment_id},
        dataType: "json",
        success: function (response) {
            populateAppointmentDetails(response);
            $("#appointmentDetails").show();
        }
        
    });
}

// load appointment details into html
function populateAppointmentDetails(response){
    // TODO
}

$(document).ready(function () {
    refreshPage();
});

// Reload page
function refreshPage(){
    $("#addAppointmentButton").click(function (e) {
        addAppointment();
    });
    $("#appointmentDetails").hide();
    loadAppointmentList();
}

function loadAppointmentDetails(appointment_id) {

    // TODO: load data 
    $.ajax({
        /*type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryAppointmentsById", param: appointment_id},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        }*/
        
    });
    $("#appointmentDetails").show();
}

function loadAppointmentList() {

    // TODO: load data 
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryAppointmentList"},
        dataType: "json",
        success: function (response) {
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
        $("#appointmentList").append('<div class = "appointmentEntry">' + appointmentEntry.appointment_id + '</div>');
    }
}

// load appointment details into html
function populateAppointmentDetails(response){
    // TODO
}

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
        let appointmentEntry = $('<div class="list-group-item">' + id + ': ' + title + '</div>');
        appointmentEntry.click(function() {
            cleanAppointmentDetails();
            loadAppointmentDetails(id);
        });

        // Append appointment entry to the appointment list
        $("#appointmentList").append(appointmentEntry);
    });
}

function loadAppointmentDetails(appointment_id) {
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

function populateAppointmentDetails(responseData){

    // check if response is empty or not in expected format
    if (!responseData || !responseData.id) {
        console.log("Empty response or response is not in expected format.");
        return;
    }

    // display appointment details
    let appointmentHeader = '<h2 class="appointmentHeader"> Appointment ' + responseData.id + ': ' + responseData.title + '</h2>';
    let appointmentDueDate = '<p> Deadline: ' + formatDate(responseData.dueDate) + '</p>';
    let appointmentDuration = '<p> Dauer: ' + responseData.duration + ' min</p>';
    
    // append infos to screen
    $("#appointmentDetails").append(appointmentHeader);
    $("#appointmentDetails").append(appointmentDueDate);
    $("#appointmentDetails").append(appointmentDuration);

    // display appointment options
    let optionIndex = 1;
    responseData.dates.forEach(function(dateOption) {
        let dateValue = formatDate(dateOption.date);

        // checkmark for every appointment option styled with bootstrap
        let appointmentCheckmark = $('<div>', { class: 'form-check' })
            .append($('<input>', { 
                class: 'form-check-input', 
                type: 'checkbox', 
                id: 'checkmark-' + optionIndex, 
                name: 'checkmark' 
            }))
            .append($('<label>', { 
                class: 'form-check-label', 
                for: 'checkmark-' + optionIndex,
                text: 'Option ' + optionIndex + ': ' + dateValue // adding text for label
            }));
        
        // main wrapper for details
        let appointmentDetails = $('<div class="appointmentDetails"></div>'); 

        appointmentDetails.append(appointmentCheckmark); // append checkmark and label
        $("#appointmentDetails").append(appointmentDetails); // add option to screen
        
        optionIndex++;
    });
}

function cleanAppointmentDetails(){
    $("#appointmentDetails").empty();
}
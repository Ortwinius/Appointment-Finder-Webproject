$(document).ready(function () {
    refreshPage();
});

// Reload page
function refreshPage(){
    // $("#addAppointmentButton").click(function() {
    //     addAppointment();
    // });
    $("#submitSelection").click(function(){
        submitSelection();
    });
    $("#appointmentDetails").hide();
    $("#selectionSubmitForm").hide();
    loadAppointmentList();
}


function loadAppointmentList() {
    console.log("loading appointment list");
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
            $("#selectionSubmitForm").show();
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
    let appointmentDuration = '<p> Duration: ' + responseData.duration + ' min</p>';
    
    // append infos to screen
    $("#appointmentDetails").append(appointmentHeader);
    $("#appointmentDetails").append(appointmentDueDate);
    $("#appointmentDetails").append(appointmentDuration);

    // display appointment options
    console.log(responseData)
    let optionIndex = 1;
    responseData.dates.forEach(function(dateOption) {
        let dateValue = formatDate(dateOption.date);

        // checkmark for every appointment option styled with bootstrap
        let appointmentCheckmark = $('<div>', { class: 'form-check' })
            .append($('<input>', { 
                class: 'form-check-input', 
                type: 'checkbox', 
                id: 'checkmark-' + optionIndex, 
                name: 'checkmark',
                dbId: dateOption.id
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

function submitSelection(){
    let name = $("#name").val();
    let comment = $("#comment").val();

    if(name.length<1){
        displayInfo("Please enter your name",true);
        return;
    }

    let dateIdString="";
    $(".form-check-input").each(function(){
        if($(this).prop('checked'))
        {
            dateIdString+=$(this).attr('dbid')+",";
        }
    })

    if (dateIdString !== '') {
        dateIdString = dateIdString.slice(0, -1);
    }
    else{
        displayInfo("Please check an option",true);
        return;
    }

    var data = {
        name: name,
        comment: comment,
        selectedDates: dateIdString
    };

    postSelection(data);
}

function postSelection(data){
    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "saveSelectedDates", param: data},
        dataType: "json",
        success: function (response) {
            displayInfo("Your selection has been saved",false);
            console.log("Successfully saved selection");
        },
        error:function(error){
            displayInfo("Error while saving selection",true);
            console.log("Error while saving selection: ",error);
        }
    }); 
}

function displayInfo(infoText, isError) {
    var $infoParagraph = $('#info');

    $infoParagraph.text(infoText);

    let color=isError ? 'red' : 'green';

    $infoParagraph.css('color',color);

    setTimeout(function() {
        $infoParagraph.text('');
    }, 3000);
}
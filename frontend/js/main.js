$(document).ready(function () {

    //add all eventHandler
    $("#addOption").click(function(){
        addOptionGroup();
    })
    
    $("#addAppointment").click(function(){
        addAppointment();
    })
    
    $("#submitSelection").click(function(){
        submitSelection();
    });
    refreshPage();
});

// Reload page
function refreshPage(){
    $("#addOptionList").empty();
    $("#appointmentDetails").hide();
    $("#selectionSubmitForm").hide();
    loadAppointmentList();
    $("input").each(function(){
        $(this).val('');
    })
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

    $("#appointmentList").empty();
    // Loop through each appointment object in the response array
    responseData.forEach(function(appointment) {
        // Extract appointment properties
        let id = appointment.id;
        let title = appointment.title;
        let dueTime = appointment.dueTime;

        // if expired -> print [expired] next to appointment
        let expiredText="";
        if(new Date(dueTime)<new Date()){
            expiredText=" [expired]";
        }
        
        // Create a clickable appointment entry
        let appointmentEntry = $('<div class="list-group-item">' + id + ': ' + title + expiredText + '</div>');
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
    let appointmentDuration = '<p> Duration: ' + responseData.duration + ' min</p>';
    let appointmentDueDate = $('<p> Deadline: ' + formatDateTime(responseData.dueDate) + '</p>');
    let appointmentDeleteButton = $('<button type="button" class="btn btn-danger delete-option">Delete</button>');
    appointmentDeleteButton.click(function(){
        deleteAppointment(responseData.id);
    })
    
    let dueDateReached=false;

    if(new Date(responseData.dueDate)<new Date()){
        appointmentDueDate.css("color","red");
        dueDateReached=true;
    }


    // append infos to screen
    $("#appointmentDetails").append(appointmentHeader);
    $("#appointmentDetails").append(appointmentDeleteButton);
    $("#appointmentDetails").append(appointmentDueDate);
    $("#appointmentDetails").append(appointmentDuration);

    // display appointment options
    console.log(responseData)
    let optionIndex = 1;
    responseData.dates.forEach(function(dateOption) {
        let dateValue = formatDateTime(dateOption.date);

        // checkmark for every appointment option styled with bootstrap
        let appointmentCheckmark = $('<div>', { class: 'form-check' })
            .append($('<input>', { 
                class: 'form-check-input', 
                type: 'checkbox', 
                id: 'checkmark-' + optionIndex, 
                name: 'checkmark',
                dbId: dateOption.id,
                disabled: dueDateReached    //if dueDate is reached, its disabled
            }))
            .append($('<label>', { 
                class: 'form-check-label', 
                for: 'checkmark-' + optionIndex,
                text: dateValue // adding text for label
            }));

        // main wrapper for details
        let appointmentDetails = $('<div class="appointmentDetails"></div>'); 

        appointmentDetails.append(appointmentCheckmark); // append checkmark and label
        $("#appointmentDetails").append(appointmentDetails); // add option to screen
        
        optionIndex++;
    });
}

function deleteAppointment(id){
    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "deleteAppointment", param: id},
        dataType: "json",
        success: function (response) {
            displayInfo("Appointment deleted",false);
            console.log("Appointment deleted");
            refreshPage();
        },
        error:function(error){
            displayInfo("Error while deleting appointment",true);
            console.log("Error while deleting appointment:  ",error);
        }
    }); 
}

function cleanAppointmentDetails(){
    $("#appointmentDetails").empty();
}

function submitSelection(){
    let name = $("#name").val();
    let comment = $("#comment").val();

    // check if name is valid (>1)
    if(name.length<1){
        displayInfo("Please enter your name",true);
        return;
    }

    // get options seperated by colons
    let optionIdString="";
    $(".form-check-input").each(function(){
        if($(this).prop('checked'))
        {
            optionIdString+=$(this).attr('dbid')+",";
        }
    })

    // remove last colon
    if (optionIdString !== '') {
        optionIdString = optionIdString.slice(0, -1);
    }
    else{
        displayInfo("Please check an option",true);
        return;
    }

    let data = {
        name: name,
        comment: comment,
        selectedDates: optionIdString
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
            refreshPage();
        },
        error:function(error){
            displayInfo("Error while saving selection",true);
            console.log("Error while saving selection: ",error);
        }
    }); 
}

// displays info red/green (Error/Success)
function displayInfo(infoText, isError) {
    let $infoParagraph = $('#info');

    $infoParagraph.text(infoText);

    let color=isError ? 'red' : 'green';

    $infoParagraph.css('color',color);

    setTimeout(function() {
        $infoParagraph.text('');
    }, 3000);
}

function addOptionGroup(){

    //creates optionGroup (div with datePicker and deleteButton)
    let $newOptionGroup = $('<div class="form-group option-group">');
    let $datePicker = $('<input type="datetime-local" class="form-control date-picker">');
    let $deleteButton = $('<button type="button" class="btn btn-danger delete-option">x</button>');
    $deleteButton.click(function() {
        $(this).closest('.option-group').remove(); // Remove the parent option group
    });

    // Append the date picker and delete button to the option group
    $newOptionGroup.append('<span>-- </span>');
    $newOptionGroup.append($datePicker);
    $newOptionGroup.append($deleteButton);

    // Append the new option group to the addOptionList container
    $('#addOptionList').append($newOptionGroup);
}

function addAppointment(){
    let title = $('#title').val();
    let location = $('#location').val();
    let dueDate = $('#dueDate').val();
    let duration = $('#duration').val();

    //check if values are empty
    if (title === '' || location === '' || dueDate === '' || duration === '') {
        displayInfo("Please fill in all required fields (Title, Location, Due Date, Duration)", true);
        return;
    }
    //check if dueDate is in the future
    if(new Date(dueDate)<new Date())
    {
        displayInfo("Due Date must be in the future", true);
        return;
    }

    //check if there are at least 2 valid options (not empty and must be in future) -> only valid options will be saved
    let validOptions=0;
    let optionDates = [];
    $('.date-picker').each(function() {
        let date=$(this).val();
        if(date!=''&&new Date(date)>new Date()){
            optionDates.push(reverseDateTime(date));
            validOptions++;
        }
    });
    if(validOptions<2)
    {
        displayInfo("There must be at least 2 valid options", true);
        return;
    }

    let data = {
        title: title,
        location: location,
        dueDate: dueDate,
        duration: duration,
        options: optionDates
    };

    postNewAppointment(data);
}

function postNewAppointment(data){
    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "saveNewAppointment", param: data},
        dataType: "json",
        success: function (response) {
            displayInfo("NewAppointment has been created",false);
            console.log("Successfully created appointment");
            refreshPage();
        },
        error:function(error){
            displayInfo("Error while creating appointment",true);
            console.log("Error while creating appointment: ",error);
        }
    }); 
}
//Starting point for JQuery init
$(document).ready(function () {
    // TODO: button events
    /*
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#searchfield").val());
    });*/
    

});


function loadAppointmentList() {

    // TODO: load data 
    $.ajax({
        /*type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryAppointments", param: ???},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        }*/
        
    });
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
}


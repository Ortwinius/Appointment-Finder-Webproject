// helper function to format date string of the form "YYYY-MM-DD hh:mm:ss" to "DD.MM.YYYY hh:mm"
function formatDateTime(dateString) {
    // Create a Date object from the given string
    const date = new Date(dateString);
    
    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    
    // Return formatted date string
    return `${day}.${month}.${year} ${hour}:${min}`;
}

function reverseDateTime(dateString){
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${min}`;
}


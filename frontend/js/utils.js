// helper function to format date string of the form "YYYY-MM-DD" to "DD.MM.YYYY"
function formatDate(dateString) {
    // Create a Date object from the given string
    const date = new Date(dateString);
    
    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    // Return formatted date string
    return `${day}.${month}.${year}`;
}

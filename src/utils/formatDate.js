/**Format Date string to MM/DD/YYYY */

export function formatDate(dateInput){
    if(!dateInput){
        return '';
    }
    else{
        const date = new Date(dateInput);
        return date.toLocaleDateString();
    }

}
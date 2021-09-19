//gets a random month, day, and fotrune and displays a concatenated string on the page
function determineFortune() {
    //determines month
    let month = getRandomIntInclusive(1,12); //get a random number between 1 and 12
    const { monthName, days } = getMonthName(month); //gets the month name based on number

    let day = getRandomIntInclusive(1,days); //get a random number between 1 and the number of days in the month

    //determines fate message
    let fateNumber = getRandomIntInclusive(1,5);
    let fate = getFate(fateNumber);
    
    const fortune = `On ${monthName} ${day} you will ${fate}`;
    document.querySelector('#fortune').innerText = fortune;
}
document.querySelector('.btn-primary').addEventListener('click', determineFortune);

//returns a random number between min and max, inclusive of min and max
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//returns object with month name and number of days
function getMonthName(month) {
    let monthName;
    let maxDays;
    switch (month) {
        case 1:
            monthName = "January";
            maxDays = 31;
        break;
        case 2:
            monthName = "February";
            maxDays = 28;
        break;
        case 3:
            monthName = "March";
            maxDays = 31;
        break;
        case 4:
            monthName = "April";
            maxDays = 30;
        break;
        case 5:
            monthName = "May";
            maxDays = 31;
        break;
        case 6:
            monthName = "June";
            maxDays = 30;
        break;
        case 7:
            monthName = "July";
            maxDays = 31;
        break;
        case 8:
            monthName = "August";
            maxDays = 31;
        break;
        case 9:
            monthName = "September";
            maxDays = 30;
        break;
        case 10:
            monthName = "October";
            maxDays = 31;
        break;
        case 11:
            monthName = "November";
            maxDays = 30;
        break;
        case 12:
            monthName = "December";
            maxDays = 31;
        break;
        default:
            monthName = "Not a month";
        break;
    }
    return { monthName: monthName, days: maxDays };
}

//returns a string with fate message
function getFate(fate) {
    let message;
    switch (fate) {
        case 1:
            message = "be bitten by a radioactive spider";
        break;
        case 2:
            message = "discover that you have a rich uncle";
        break;
        case 3: 
            message = "meet the love of your life";
        break;
        case 4:
            message = "discover a hidden talent";
        break;
        case 5: 
            message = "meet Tony Hawk"
        break;
        default: 
            message = "Error";
        break;
    }
    return message;
}

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
// Only edit below
//Note, for me to be able to fix this, I had to change most of the code if not all of it.
const createData = () => { //added const to createData and assigned it to the following variables
    // Bellow are the variables that were assigned by the createData constant
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const weeks = [];
    let week = [];
    // Find the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    // Offset for starting week from Monday
    let offset = firstDay < 6 ? firstDay + 1 : 6;
    for (let i = 1; i < offset; i++) {
        week.push(null); // filled in empty cells for days before the first day of the month
    };
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day); // Used a for loop to add each day of the month to the week array
        if (week.length === 7) {
            // if week array has 7 days, push it to weeks array and start a new week
            weeks.push(week);
            week = [];
        };
    };
    // Push the last week to weeks array
    if (week.length > 0) {
        weeks.push(week);
    }
    return weeks;
};
// The createCell function takes two arguments, a day and a boolean flag indicating whether it is today or not.
const createCell = (day, isToday) => {
    const cell = document.createElement('td');
    // To add the 'table__cell' class to the cell element.
    cell.classList.add('table__cell');
    // To check if the day argument is not null.
    if (day !== null) {
        // If the day argument is not null, set the cell's inner text to the day argument.
        cell.innerText = day;
        // Check if the isToday flag is true.
        if (isToday) {
            // If the isToday flag is true, the 'table__cell_today' class to the cell element should add.
            cell.classList.add('table__cell_today');
        }
    }
    return cell;
};

// This function selects the element with a data-content attribute and assigns it to the content variable.
const createHtml = () => {
    const content = document.querySelector('[data-content]');
    // This function calls createData() to get an array of weeks.
    const weeks = createData();
    // Used this to loop through the array of weeks.
    for (let i = 0; i < weeks.length; i++) {
        const week = weeks[i];
        // Created a new table row element.
        const row = document.createElement('tr');
        // Created a new table cell element to display the week number and append it to the row.
        const weekNumber = document.createElement('td');
        weekNumber.classList.add('table__cell_week');
        weekNumber.innerText = `Week ${i + 1}`;
        row.appendChild(weekNumber);
        // used a loop through the days in the current week.
        for (let j = 0; j < week.length; j++) {
            const day = week[j];
            // To check if the current day is today.
            const isToday = day === new Date().getDate() && new Date().getMonth() === new Date().getMonth();
            // Create a new table cell element for the current day and append it to the row.
            row.appendChild(createCell(day, isToday));
        }
        // Append the completed row to the content element.
        content.appendChild(row);
    }
}

// Only edit above
const current = new Date();
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
createHtml();
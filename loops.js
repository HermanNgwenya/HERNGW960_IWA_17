// scripts.js

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
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i ++){
        result.push(i);
    }
    return result;
}
   

const createData = () => {
    const current = new Date();
    current.setDate(1);

    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(5);
    const days = createArray(7);
    
    let result = [];

    for ( let weekIndex of weeks) {
       let value = [{
            week: parseInt(weekIndex) + 1,
            days: [],
        }];

        for (let dayIndex of days) {
            let day = parseInt(dayIndex) - startDay + 1;
            let isValid = day > 0 && day <= daysInMonth;

            value[0].days.push({
                dayOfWeek: parseInt(dayIndex) - 1,
                value: isValid ? day: daysInMonth,
            });
        }

        result.push(value);
    }
        return result;
}

function addCell(existing, classString, value) {
    return /* html */ `
        <td ${classString}>
            ${value}
        </td>
        ${existing}
    `;
}

const createHtml = (data) => {
    let result = '';

    for (let {week, days} in data){
        let innerHTML = "";
        innerHTML = addCell(innerHTML, 'table__cell table__cell_sidebar', `Week ${week}`);
    
        for ( let {dayOfWeek, value} in days) {
            let classString = "table__cell";
			const isToday = new Date().getDate() === value;

            const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
            const isAlternate = week % 2 === 0;


			if (isToday) classString = `${classString} table__cell_today`;
            if (isWeekend) classString = `${classString} table__cell_weekend`;
            if (isAlternate) classString = `${classString} table__cell_alternate`;

            innerHTML = addCell(innerHTML, classString, value);
        }

        result += `<tr>${innerHTML}</tr>`;
    }

    return result;
};


// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)
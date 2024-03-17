import {Option} from "@material-tailwind/react";

function hoursGenerator() {
    let options = [];
    let hours = 8;
    let minutes = 0;
    const halfHour = 30;

    while (hours < 21) {
        // Current date format
        let hoursStr = hours.toString().padStart(2, '0');
        let minutesStr = minutes.toString().padStart(2, '0');
        let hoursAndMinutes = `${hoursStr}:${minutesStr}`;

        // Creation of Options
        options.push(<Option value={hoursAndMinutes}>{hoursAndMinutes}</Option>);

        // Increment per 30 min
        minutes += halfHour;
        if (minutes >= 60) {
            hours++;
            minutes = 0;
        }
    }

    return options;
}

export {hoursGenerator}
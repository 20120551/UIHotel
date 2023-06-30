import moment from "moment";
export const getVietnameseDate = (date) => {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
    };
    if (date) {
        return date.toLocaleString('en-GB', options);
    }
    const _date = new Date().toLocaleString('en-GB', options);
    return _date
}
export const compareDate = (date1, date2) => {
    const _date1 = moment(date1, "DD/MM/YYYY").toDate();
    const _date2 = moment(date2, "DD/MM/YYYY").toDate();

    const timeDiff = _date1.getTime() - _date2.getTime();

    return timeDiff > 0 ? 1 : -1;
}

export const substractDate = (date1, date2) => {
    const _date1 = moment(date1, "DD/MM/YYYY").toDate();
    const _date2 = moment(date2, "DD/MM/YYYY").toDate();

    const timeDiff = Math.abs(_date1.getTime() - _date2.getTime());

    // Convert milliseconds to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
        ? `${minutes + 1}:00`
        : `${minutes}:${padTo2Digits(seconds)}`;
}
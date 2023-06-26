export const getVietnameseDate = (date) => {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
    };
    if (date) {
        return date.toLocaleString('en-GB', options);
    }
    const _date = new Date().toLocaleString('en-GB', options);
    return _date
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
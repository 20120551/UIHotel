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
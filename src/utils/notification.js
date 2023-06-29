import toastr from "toastr";

export function createNotification({ type, message, title, timeout = 5000 }) {
    const toastrNotification = toastr[type] || alert;
    console.log(toastrNotification);
    toastrNotification(message, title, { timeOut: timeout });
}
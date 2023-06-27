
$(function () {
    $('input[name="DateRangePicker"]').daterangepicker({
        minDate: moment().startOf('day'),
        autoApply: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

});

$(function () {
    $('input[name="DateRangePickerReservationCard"]').daterangepicker({
        autoApply: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

});


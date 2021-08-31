$('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY',
    icons: {
        up: 'fa fa-angle-up',
        down: 'fa fa-angle-down',
        next: 'fa fa-angle-right',
        previous: 'fa fa-angle-left'
    },
    locale: moment.locale('en', {
        week: { dow: 1 }
    }),
    useCurrent: false,
    daysOfWeekDisabled: [0, 6],
    minDate: moment().format('LL')
});

$('#To').click(function () {
    if ($('#From').val()) {
        $('#To').data('DateTimePicker').minDate(moment($('#From').val(), 'DD/MM/YYYY').toDate());
    }
});

$('#DateReturnToWork').click(function () {
    if ($('#To').val()) {
        $('#DateReturnToWork').data('DateTimePicker').minDate(moment(moment($('#To').val(), 'DD/MM/YYYY').toDate()).add(1, 'days').toDate());
    }
});

$('#edit-vacation').click(function () {
    debugger;
    const content = {
        id: vacationId,
        idEmployee,
        idVacationType,
        year: vacationYear
    }

    $("#editform").serializeArray().map(function (x) { content[x.name] = x.value; });

    Post(content, $("#edit-vacation-url").val())
        .done(function (data) {

            if (typeof data !== 'object') {
                $('#edit-vacation-modal').html(data);
                $.validator.unobtrusive.parse('#editform');
                return;
            }

            if (data.isValid) {
                showAlert(data.message, "vacations-alert", "success");
                $('#edit-vacation-modal').modal('toggle');
                $('#vacation-list').data('kendoGrid').dataSource.read();
            }
            else
                showAlert(data.message, "vacation-alert", "error");

        }).fail(function (jqXHR, textStatus, errorThrown) {
            showAlert(errorThrown, "vacation-alert", "error");
        });
});

$('#edit-vacation-modal').on('hidden.bs.modal', function (e) {
    $('#From, #To, #DateReturnToWork').val('');
    $('#ReasonConfirm').text('');
    $('.form-group span').html('');
});

function checkEmployeeReplacerAvailability() {
    let from = moment($('#From').val(), 'DD/MM/YYYY').toDate().toUTCString();
    let to = moment($('#To').val(), 'DD/MM/YYYY').toDate().toUTCString();

    $.get($("#employee-replacer-vacation-time-url").val(), { employeeReplacerId, from, to })
        .done(function (response) {
            if (!$.isEmptyObject(response)) {
                $('#ReplacerVacationInfo').html(employeeReplacer + ' ' + response.message);
            } else {
                $('#ReplacerVacationInfo').html('');
            };
        });
}

$('#From').on('dp.change', function () {
    if ($('#To').val() != '') {
        checkEmployeeReplacerAvailability();
    }
});

$('#To').on('dp.change', function () {
    if ($('#From').val() != '') {
        checkEmployeeReplacerAvailability();
    }
});
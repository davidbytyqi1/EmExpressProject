//$(document).ready(() => GetEmpty('/Home/GetResources')
//    .then(result => {
//        window.resources = result
//        vacationListGrid();
//    }));

//const getResource = key => {
//    let resource = window.resources.find(r => r.key == key);
//    if (!resource)
//        return undefined;
//    return resource.value;
//}


var Resources = {};

$('#from-date, #to-date').datetimepicker({
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
    daysOfWeekDisabled: [0, 6]
});

var exportFlag = false;

//const vacationListGrid = () => {
    $("#vacation-list").kendoGrid({
        resizable: true,
        position: "right",
        height: 550,
        animation: {
            open: {
                effects: "fade:in",
                duration: 200
            },
            close: {
                effects: "fade:out",
                duration: 200
            }
        },
        show: function (e) {
            if (this.content.text().length != 0) {
                $('[role="tooltip"]').css("visibility", "visible");
            }
        },
        hide: function () {
            $('[role="tooltip"]').css("visibility", "hidden");
        },
        content: function (e) {
            var element = e.target[0];
            if (element.offsetWidth < element.scrollWidth) {
                return e.target.text();
            }
            else {
                return '';
            }
        },
        dataSource: {
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            transport: {
                read: {
                    url: $("#vacation-list-url").val(),
                    type: "POST",
                    dataType: "json"
                },
            },
            schema: {
                data: function (response) {
                    return response.data;
                },
                total: function (response) {
                    return response.total;
                }
            },
            batch: false,
            pageSize: 20,
        },
        filterable: false,
        columnMenu: {
            messages: {
                columns: localizedStrings['ColumnLabel'],
                filter: localizedStrings['FilterLabel'],
            }
        },
        //columnMenu: {
        //    messages: {
        //        columns: "@SharedLocalizer["ColumnLabel"]",
        //        filter: "@SharedLocalizer["FilterLabel"]",
        //        sortAscending: "@SharedLocalizer["SortAsc"]",
        //        sortDescending: "@SharedLocalizer["SortDesc"]"
        //    }
        //},
        editable: false,
        pageable: {
            refresh: true,
            //pageSizes: true,
            buttonCount: 5,
            messages: {
                display: localizedStrings['GridDisplayLabel'] + " " + '{0}-{1}' + " " + localizedStrings['GridTotalRecordLabel'] + " " + '{2}' + " " + localizedStrings['GridRecordLabel'],
                empty: localizedStrings['NoRecordsLabel']
            }
        },
        //pageable: {
        //    messages: {
        //        display: "@SharedLocalizer["GridDisplayLabel"] {0}-{1} @SharedLocalizer["GridTotalRecordLabel"] {2} @SharedLocalizer["GridRecordLabel"]",
        //        empty: "@SharedLocalizer["NoRecordsLabel"]"
        //                    }
        //},
        //excelExport: function (e) {
        //    var columns = e.workbook.sheets[0].columns;
        //    columns.forEach(function (column) {
        //        delete column.width;
        //        column.autoWidth = true;
        //    });

        //    var sheet = e.workbook.sheets[0];

        //    for (var i = 1; i < sheet.rows.length; i++) {
        //        var row = sheet.rows[i];

        //        var idStatusApprovingManager = $('#vacation-list').data('kendoGrid').dataSource._data[(i - 1)].idStatusApprovingManager;

        //        row.cells[9].value = getStatusLabel(row.cells[9].value);
        //        row.cells[7].value = getStatusLabel(idStatusApprovingManager);
        //    }
        //},
        //pdfExport: function (e) {
        //    if (!exportFlag) {
        //        e.sender.hideColumn(12);
        //        e.preventDefault();
        //        exportFlag = true;

        //        e.sender.saveAsPDF().then(function () {
        //            e.sender.showColumn(12);
        //            exportFlag = false;
        //        });
        //    }
        //},
        //excel: {
        //    fileName: excelFileName,
        //    allPages: true
        //},
        //pdf: {
        //    fileName: pdfFileName,
        //    allPages: true,
        //    avoidLinks: true,
        //    landscape: true,
        //    scale: 0.7,
        //    paperSize: "A4",
        //    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
        //    repeatHeaders: true,
        //    forcePageBreak: "tr:nth-child(15n)",
        //    template: $("#page-template").html()
        //},
        toolbar: [{
            template: `<div class='d-inline-flex w-100 justify-content-end'>
                                <ul class="nav nav-tabs nav-tabs-bottom" style='border-bottom: 0 !important;'>
                                    <li class="nav-item"><button class="nav-link" onclick="exportToDocument('vacation-list', 3, 8)" data-id="0"><i class='la la-file-pdf-o'></i> PDF</button></li>
                                    <li class="nav-item"><button class="nav-link" onclick="exportToDocument('vacation-list', 1, 8)" data-id="1"><i class='la la-file-excel-o'></i> EXCEL</button></li>
                                    <li class="nav-item"><button class="nav-link" onclick="exportToDocument('vacation-list', 2, 8)" data-id="2"><i class='la la-file-excel-o'></i> CSV</button></li>
                                </ul>
                           </div>` }],
        columns:
            [{
                field: "employeeName",
                title: localizedStrings['EmployeeLabel'],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdEmployeeNavigation.FirstName+LastName"
                },
            },
            {
                field: "vacationTypeTitle",
                title: localizedStrings['VacationTypeLabel'],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdVacationTypeNavigation.TitleSq"
                },
            },
            {
                field: "entryDate",
                type: "date",
                title: localizedStrings['RequestDateLabel'],
                hidden: true,
                format: "{0:dd.MM.yyyy}",
                parseFormats: "{0:dd.MM.yyyy}",
                filterable: {
                    extra: false,
                    operators: {
                        date: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    },
                },
                attributes: {
                    "name": "EntryDate"
                },
            },
            {
                field: "from",
                type: "date",
                title: localizedStrings['FromLabel'],
                format: "{0:dd.MM.yyyy}",
                parseFormats: "{0:dd.MM.yyyy}",
                filterable: {
                    extra: false,
                    operators: {
                        date: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    },
                },
                attributes: {
                    "name": "From"
                },
            },
            {
                field: "to",
                type: "date",
                title: localizedStrings["ToLabel"],
                format: "{0:dd.MM.yyyy}",
                parseFormats: "{0:dd.MM.yyyy}",
                filterable: {
                    extra: false,
                    operators: {
                        date: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    },
                },
                attributes: {
                    "name": "To"
                },
            },
            {
                field: "dateReturnToWork",
                type: "date",
                title: localizedStrings['ReturnDateLabel'],
                format: "{0:dd.MM.yyyy}",
                parseFormats: "{0:dd.MM.yyyy}",
                filterable: {
                    extra: false,
                    operators: {
                        date: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    },
                },
                attributes: {
                    "name": "DateReturnToWork"
                },
            },
            {
                field: "employeeReplacerName",
                title: localizedStrings['ReplacerLabel'],
                // hidden: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdEmployeeReplacerNavigation.FirstName+LastName"
                },
            },
            {
                field: "reason",
                title: localizedStrings['ReasonLabel'],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "Reason"
                },
            },
            {
                field: "idStatusApprovingManger",
                title: localizedStrings['ManagerStatusLabel'],
                template: "#= setStatus(idStatusApprovingManager) #",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdStatusApprovingManager"
                },
            },
            {
                field: "approvingManagerName",
                title: localizedStrings['ManagerLabel'],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdApprovingManager"
                },
            },
            {
                field: "idStatusApprovingHr",
                title: localizedStrings['HRStatusLabel'],
                template: "#= setStatus(idStatusApprovingHr) #",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdStatusApprovingHr"
                }
            },
            {
                field: "approvingHrName",
                title: localizedStrings['ApprovingHrLabel'],
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                attributes: {
                    "name": "IdApprovingHr"
                }
            },
            {
                field: "",
                title: "&nbsp;",
                autoFitColumn: true,
                // hidden: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            eq: localizedStrings['EqualLabel'],
                        }
                    }
                },
                template: "#= renderButtons(id, idStatusApprovingManager, idStatusApprovingHr, isUserAdmin, isUserHr, isEmployeeManager) #"
            },
            ],
        dataBound: function () {
            //for (var i = 0; i < this.columns.length; i++) {
            //    this.autoFitColumn(i);
            //}
            this.autoFitColumn(12);
        }
    });
//}

function setStatus(status) {
    switch (status) {
        case 1:
            return '<span class="text-warning">' + $("input[name=InProcess]").val() + '</span>';
            break;
        case 2:
            return '<span class="text-success">' + $("input[name=Approved]").val() + '</span>';
            break;
        case 3:
            return '<span class="text-danger">' + $("input[name=Refused]").val() + '</span>';
            break;
        default:
            return '';
    }
}

function getStatusLabel(status) {
    switch (status) {
        case 1:
            return $("input[name=InProcess]").val();
            break;
        case 2:
            return $("input[name=Approved]").val();
            break;
        case 3:
            return $("input[name=Refused]").val();
            break;
        default:
            return '';
    }
}

function renderButtons(id, managerStatus, hrStatus, isUserAdmin, isUserHr, isEmployeeManager) {
    let button = {
        reject: '<a role="button" class="k-button k-button-icontext k-grid-edit" onclick=refuse(' + id + ')><span class="k-icon k-i-x"></span>Refuzo</a>',
        approve: '<a role="button" class="k-button k-button-icontext k-grid-edit" onclick=approve(' + id + ')><span class="k-icon k-i-check"></span>Aprovo</a> ',
        edit: '<a role="button" class="k-button k-button-icontext k-grid-edit" onclick="edit(' + id + ')"><span class="k-icon k-i-edit"></span>Ndrysho</a>'
        //reject: '<button class="btn btn-secondary btn-xs" onclick=refuse(' + id + ')><i class="la la-remove"></i>' + getResource('RefuseLabel') + '</button> ',
        //approve: '<button class="btn btn-secondary btn-xs" onclick=approve(' + id + ')><i class="la la-check"></i> ' + getResource('ApproveLabel') + '</button> ',
        //edit: '<button class="btn btn-secondary btn-xs" onclick="edit(' + id + ')"><i class="la la-pencil"></i> ' + getResource('EditLabel') + '</button>'
    }

    if (isUserHr && isEmployeeManager) {
        if (managerStatus == VACATION_STATUS.Refused)
            return button.approve + button.edit;
        if (managerStatus == VACATION_STATUS.Approved)
            return button.reject + button.edit;

        return button.reject + button.approve + button.edit;
    }

    if (isUserHr && !isEmployeeManager && managerStatus === VACATION_STATUS.Refused || (isUserAdmin && !isEmployeeManager) || (isUserHr && !isEmployeeManager && managerStatus == VACATION_STATUS.InProcess)) {
        return '';
    }

    if (isUserHr && managerStatus == VACATION_STATUS.Approved) {
        if (hrStatus == VACATION_STATUS.Refused)
            return button.approve;
        if (hrStatus == VACATION_STATUS.Approved)
            return button.reject;

        return button.reject + button.approve;
    }

    if (hrStatus == VACATION_STATUS.InProcess || managerStatus == VACATION_STATUS.InProcess) {
        return button.reject + button.approve + button.edit;
    }

    if (hrStatus == VACATION_STATUS.Refused || managerStatus == VACATION_STATUS.Refused) {
        return button.approve + button.edit;
    }
    if (hrStatus == VACATION_STATUS.Approved || managerStatus == VACATION_STATUS.Approved) {
        return button.reject + button.edit;
    }

    return '<div class="flex-row-reverse">' +button.reject + button.approve + button.edit + '</div>';
}

$('#search').click(function () {
    const filters = [];

    if ($('#employee-name')[0].selectedIndex > 0)
        filters.push({ field: "idEmployee", operator: "eq", value: $('#employee-name').val() });
    if ($('#vacation-type')[0].selectedIndex > 0)
        filters.push({ field: "idVacationType", operator: "eq", value: $('#vacation-type').val() });
    if ($('#from-date').val())
        filters.push({ field: "from", operator: "eq", value: $('#from-date').val().replace(/\//g, '.') });
    if ($('#to-date').val())
        filters.push({ field: "to", operator: "eq", value: $('#to-date').val().replace(/\//g, '.') });
    if ($('#status')[0].selectedIndex > 0)
        filters.push({ field: "idStatusApprovingManager", operator: "eq", value: $('#status').val() });

    $('#vacation-list').data('kendoGrid').dataSource.filter(filters);
});

$('#clear-filter').click(function () {
    $('#vacation-type').val('').trigger('change');
    $('#status').val('').trigger('change');
    $('#employee-name').val('').trigger('change');
    $('#from-date').val('');
    $('#to-date').val('');
    $('#vacation-list').data('kendoGrid').dataSource.filter([]);
});

function refuse(id) {
    vacationId = id;
    $('#refuse-vacation-modal').modal('toggle');
}

$('#refuse-vacation').click(function () {
    if ($('#comment').val() === '')
        $('#commentRequired').html('Komenti duhet të plotësohet');
    else {
        $('#comment').next().text('');

        const comment = {
            id: vacationId,
            reasonConfirm: $('#comment').val()
        }

        Post(comment, $("#refuse-vacation-url").val()).done(function (data) {
            $('#vacation-list').data('kendoGrid').dataSource.read();

            if (data.isValid)
                showAlert(data.message, "vacations-alert", "success");
            else
                showAlert(data.message, "vacations-alert", "error");

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('error: ', errorThrown)
        });

        $('#comment').val('');
        $('#refuse-vacation-modal').modal('toggle');
    }
});

function approve(id) {
    vacationId = id;
    $('#approve-vacation-modal').modal('toggle');
}

$('#approve-vacation').click(function () {

    Post({ vacationId }, $("#approve-vacation-url").val()).done(function (data) {
        $('#vacation-list').data('kendoGrid').dataSource.read();

        if (data.isValid)
            showAlert(data.message, "vacations-alert", "success");
        else
            showAlert(data.message, "vacations-alert", "error");

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('error: ', errorThrown)
    });

    $('#approve-vacation-modal').modal('toggle');
});

function edit(id) {
    var data = $('#vacation-list').data('kendoGrid').dataSource._data.filter(x => x.id === id)[0]

    vacationId = id;
    idEmployee = data.idEmployee;
    idVacationType = data.idVacationType;
    vacationYear = data.year;
    employeeReplacer = data.employeeReplacerName;
    employeeReplacerId = data.idEmployeeReplacer;

    $('#From').val(moment(data.from).format('DD/MM/YYYY'));
    $('#To').val(moment(data.to).format('DD/MM/YYYY'));
    $('#DateReturnToWork').val(moment(data.dateReturnToWork).format('DD/MM/YYYY'));

    $('#edit-vacation-modal').modal('toggle');
}

$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
    $(this).siblings('.panel-heading').addClass('border-bottom');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
    $(this).siblings('.panel-heading').removeClass('border-bottom');
});

$('.select2').select2({
    width: '100%',
    allowClear: true,
    placeholder: localizedStrings['SelectOptionLabel']
});

$('#employee-name').select2({
    width: '100%',
    allowClear: true,
    ajax: {
        url: $('#employee-dropdown-url').val(),
        data: function (params) {
            var query = {
                search: params.term
            }
            return query;
        },
        processResults: function (data) {
            return {
                results: data
            };
        },
    },
    placeholder: localizedStrings['SelectOptionLabel'],
    minimumInputLength: 3,
    language: {
        inputTooShort: function () {
            return localizedStrings['InputTooShort'];
        }
    }
});
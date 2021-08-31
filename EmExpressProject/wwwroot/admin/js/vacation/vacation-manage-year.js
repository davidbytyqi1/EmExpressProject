var isManagerOnly = false;

$("#vacation-manage-year").kendoGrid({
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
                url: $("#vacation-manage-year-url").val(),
                type: "POST",
                dataType: "json"
            },
            parameterMap: function (data) {

                if (data.filter) {
                    for (var i = 0; i < data.filter.filters.length; i++) {
                        if (data.filter.filters[i].field == 'entryDate') {
                            var date = kendo.toString(kendo.parseDate(data.filter.filters[i].value), "dd.MM.yyyy");
                            data.filter.filters[i].value = date;
                        }
                    }
                }
                return data;
            }
        },

        schema: {
            data: function (response) {
                isManagerOnly = response.isManagerOnly;
                return response.data;
            },
            total: function (response) {
                return response.total;
            }
        },
        batch: false,
        pageSize: 20,
    },
    filterable: {
        mode: "menu"
    },
    columnMenu: {
        messages: {
            columns: localizedStrings['ColumnLabel'],
            filter: localizedStrings['FilterLabel'],
        }
    },
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
    //excelExport: function (e) {
    //    var columns = e.workbook.sheets[0].columns;
    //    columns.forEach(function (column) {
    //        delete column.width;
    //        column.autoWidth = true;
    //    });

    //    var sheet = e.workbook.sheets[0];

    //    for (var i = 1; i < sheet.rows.length; i++) {
    //        var row = sheet.rows[i];
    //        row.cells[1].value = row.cells[1].value.firstName + ' ' + row.cells[1].value.lastName;
    //    }
    //},
    //excel: {
    //    fileName: excelFileName,
    //    allPages: true,
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
        template: `<div class='d-inline-flex w-100'>
                                <div class='d-none'>
                                    <input id='years' style='width: 100px;' />
                                    <input id='vacationTypes' style='width: 200px;' />
                                    <input id='method' style='width: 200px;' />
                                    <div id='employees' style='display: none;'><input id='id-employee' style='width: 200px;' /></div>
                                </div>
                                <ul class="nav nav-tabs nav-tabs-bottom ml-auto" style='border-bottom: 0 !important;'>
                                    <li class="nav-item"><button class="nav-link" onclick="exportToDocument('vacation-manage-year', 3, 9)" data-id="0"><i class='la la-file-pdf-o'></i> PDF</button></li>
                                    <li class="nav-item"><button class="nav-link" onclick="exportToDocument('vacation-manage-year', 1, 9)" data-id="1"><i class='la la-file-excel-o'></i> EXCEL</button></li>
                                    <li class="nav-item"><button class="nav-link" onclick="exportToDocument('vacation-manage-year', 2, 9)" data-id="2"><i class='la la-file-excel-o'></i> CSV</button></li>
                                </ul>
                           </div>` }],
    columns:
        [{
            field: "year",
            title: localizedStrings['YearLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                }
            },
            attributes: {
                "name": "Year"
            },
        },
        {
            field: "employee",
            template: "#=employee.firstName# #=employee.lastName#",
            title: localizedStrings['EmployeeLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
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
            field: "vacationType.title",
            title: localizedStrings['VacationTypeLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                },
                ui: dropdownVacationTypes,
            },
            attributes: {
                "name": "IdVacationTypeNavigation.TitleSq"
            },
        },
        {
            field: "days",
            title: localizedStrings['DaysLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                }
            },
            attributes: {
                "name": "Days"
            },
        },
        {
            field: "daysUsed",
            template: "#= (daysUsed==null) ? 0 : daysUsed#",
            title: localizedStrings['UsedLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                }
            },
            attributes: {
                "name": "DaysUsed"
            },
        },
        {
            field: "daysLeft",
            title: localizedStrings['LeftLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                }
            },
            attributes: {
                "name": "DaysLeft"
            },
        },
        {
            field: "entryUser",
            title: localizedStrings['RegistrationFromLabel'],
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                }
            },
            attributes: {
                "name": "EntryUser"
            },
        },
        {
            field: "entryDate",
            type: "date",
            title: localizedStrings['RegistrationDateLabel'],
            format: "{0:dd.MM.yyyy}",
            parseFormats: "{0:dd.MM.yyyy}",
            filterable: {
                mode: "menu",
                messages: {
                    info: localizedStrings['FilterItemsTextLabel'],
                    filter: localizedStrings['ApplyFilter'],
                    clear: localizedStrings['CancelLabel']
                },
                extra: false,
                operators: {
                    string: {
                        eq: localizedStrings['EqualLabel'],
                    }
                }
            },
            attributes: {
                "name": "EntryDate"
            },
        }],
    dataBound: function () {
        if (isManagerOnly) {
            $(".d-none").remove();
        } else {
            $(".d-none").removeClass("d-none");
        }
    }
});

function dropdownVacationTypes(input) {
    input.kendoDropDownList({
        dataSource:
        {
            type: "json",
            serverFiltering: false,
            transport: {
                read: $("#vacation-type-list-url").val()
            }
        },
        dataTextField: "text",
        dataValueField: "value",
        valuePrimitive: true,
        optionLabel: localizedStrings['SelectVacationTypeLabel']
    });
}

//$("#toolbar").kendoToolBar({
//    items: [
//        {
//            template: "<input id='years' style='width: 100px;' />",
//            overflow: "never"
//        },
//        {
//            template: "<input id='vacationTypes' style='width: 200px;' />",
//            overflow: "never"
//        },
//        {
//            template: "<input id='method' style='width: 200px;' />",
//            overflow: "never"
//        },
//        {
//            template: "<div id='employees' style='display: none;'><input id='id-employee' style='width: 200px;' /></div>",
//            overflow: "never"
//        },
//    ]
//});

$("#years").kendoDropDownList({
    optionLabel: localizedStrings['YearLabel'],
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
        { text: actualYear, value: actualYear },
        { text: actualYear + 1, value: actualYear + 1 }
    ]
});

$("#vacationTypes").kendoDropDownList({
    optionLabel: localizedStrings['VacationTypeLabel'],
    dataTextField: "text",
    dataValueField: "value",
    enable: false,
    filter: "contains",
    dataSource: {
        type: "json",
        serverFiltering: false,
        transport: {
            read: $("#vacation-type-list-url").val()
        }
    }
});

$("#method").kendoDropDownList({
    optionLabel: localizedStrings['MethodLabel'],
    dataTextField: "text",
    dataValueField: "value",
    enable: false,
    dataSource: [
        { text: localizedStrings['OpenYearEveryone'], value: 1 },
        { text: localizedStrings['OpenYearIndividual'], value: 2 }
    ]
});

$("#years").change(function () {
    let vacationTypesDropDownList = $("#vacationTypes").data("kendoDropDownList");
    vacationTypesDropDownList.enable();

    let methodDropDownList = $("#method").data("kendoDropDownList");
    methodDropDownList.enable();
});

$("#method").change(function () {
    if ($("#method").val() == 1) {
        generateVacationDays();
    } else if ($("#method").val() == 2) {
        $("#employees").css("display", "inline");
        $("#id-employee").kendoDropDownList({
            optionLabel: "Punëtori",
            filter: "contains",
            filtering: function (e) {
                let filter = e.filter;

                if (!filter.value) {
                    e.preventDefault();
                }
            },
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                type: "json",
                serverFiltering: false,
                transport: {
                    read: $("#employee-list-url").val()
                }
            }
        });
    }
});

$("#id-employee").change(function () {
    if ($("#id-employee").val() > 0)
        generateVacationDays();
});

function generateVacationDays() {
    $("#generate-vacation-days").kendoWindow({
        minWidth: "90px",
        width: "80%",
        modal: true,
        minHeight: "50px",
        height: "500px",
        //iframe: true,
        resizable: false,
        title: "Menaxhimi i pushimeve",
        content: $("#generate-vacation-days-url").val() + "?year=" + $("#years").val() + "&idVacationType=" + $("#vacationTypes").val() + "&idEmployee=" + $("#id-employee").val(),
        visible: false,
        draggable: false,
        close: onClose
    });

    var popup = $("#generate-vacation-days").data('kendoWindow');
    popup.open();
    popup.center();

    $(".k-window-titlebar").addClass("border-bottom-0");
}

function onClose(e) {
    $("#vacation-manage-year").data("kendoGrid").dataSource.filter({});
    $("#vacation-manage-year").data("kendoGrid").dataSource.read();
    resetToolbar();
}

function resetToolbar() {
    $("#years").data("kendoDropDownList").value("");
    $("#vacationTypes").data("kendoDropDownList").value("");
    $("#method").data("kendoDropDownList").value("");
    $("#vacationTypes").data("kendoDropDownList").enable(false);
    $("#method").data("kendoDropDownList").enable(false);
    if ($("#id-employee").data("kendoDropDownList"))
        $("#id-employee").data("kendoDropDownList").value("");
    $("#employees").hide();
}
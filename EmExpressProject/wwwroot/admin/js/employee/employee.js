function loadPartialView() {
    debugger
    var url = ($("#employee-controller-url").val()).replace("Index", "") + "/";
    var employeeId = $("#employee-id-value").val();
    var contractualId = $("#id-contractual").val();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        switch (hash) {
            case "salary":
                url += "getEmployeeSalaries/?employeeId=" + employeeId;
                break;
            case "familyMember":
                url += "getEmployeeFamilyMembers/" + employeeId;
                break;
            case "experience":
                url += "getEmployeeExperiences/?employeeId=" + employeeId;
                break;
            case "documents":
                url += "GetEmployeeDocuments/?employeeId=" + employeeId;
                break;
            case "complaints":
                url += "GetEmployeeComplaints/?employeeId=" + employeeId;
                break;
            case "working-time":
                url += "EmployeeWorkingTime";
                break;
            case "contractualData":
                url += "getContractualDatas/?id=" + contractualId + "&employeeId=" + employeeId;
                break;
            default:
                url += "addEmployee";
        }
    } else {
        window.location.hash = "employee";
        url += "addEmployee";
    }

    return GetEmpty(url);

}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-space')
                .attr('src', e.target.result)
                .width(78)
                .height(78);

            $('#delete-photo-button').css('display', 'block');
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#img-space')
            .attr('src', "/img/profile.png");

        $('#delete-photo-button').css('display', 'none');
    }
}

function changeTabs(tab) {
    switch (tab) {
        case "#employee-data-tab":
            break;
        case "#salary-tab":
            console.log(tab + " - hini");
            loadEmployeeSalaryTab();
            break;
        case "#family-member-data-tab":
            break;
        case "#experience-tab":
            loadEmployeeExperienceTab();
            break;
        case "#documents-tab":
            debugger
            loadEmployeeDocumentTab();
            break;
        case "#complaints-tab":
            loadEmployeeComplaintTab();
            break;
        case "#working-time-tab":
            loadEmployeeWorkingTimeData();
            break;
        default:

    }
}


//employeeData
function saveEmployeeDataForm(e) {
    debugger
    var url = $("#save-employee-data-url").val();
    var form = $("#employee-form")[0];
    var formData = new FormData(form);

    PostSync(formData, url).done(function (data) {
        if (data.isValid) {
            localStorage.clear(); // Clear storage to replace old profile picture ... look at _Layout.cshtml scripts section
            debugger
            if (!$("#HasInsurance").is(":checked")) {
                $("#InsuranceNumber").val("");
                $("#InsuranceStartDate").data("DateTimePicker").clear();
                $("#InsuranceEndDate").data("DateTimePicker").clear();
            }
            if ($("#employee-id-value").val() > 0) {
                $("#img-space").text(data.ProfilePhotoPath);
                $("#img-space").text(data.ProfilePhotoPath);
                showAlert(data.message, "employee-alert", "success");
                //$("#employee-alert").addClass("alert-success").addClass("show").removeClass("alert-danger").removeClass("alert-warning").removeClass("alert-primary");
                //$("#employee-alert p").text(data.message);
            } else {
                if ((window.location.href).includes("InternalApplication")) {
                    window.location.href = "/InternalApplication/Employee/Edit/" + data.data.id;
                }
                else {
                    window.location.href = "/Employee/Edit/" + data.data.id;
                }

            }
            return false;
        } else {
            debugger
            showAlert(data.message, "employee-alert", "error");
            //$("#employee-alert").addClass("alert-danger").addClass("show").removeClass("alert-success").removeClass("alert-warning").removeClass("alert-primary");
            //$("#employee-alert p").text(data.message);
        }
        return false;
    });
    return false;
}


//contractualData
function loadEmployeeContractualData() {
    debugger
    window.location.hash = 'contractualData';
    loadPartialView()
        .done(function (data) {
            debugger
            if (data != null) {
                $("#contractual-result").empty();
                if ('@Html.Raw(TempData["Active"])' == 'False' && '@Html.Raw(TempData["Contractual"])' == 'True') // Need to access tempdata value here
                {
                    $("#has-active-contrat").val(1);
                }
                else {
                    $("#has-active-contrat").val(0);
                }
                $("#inputs-checker").val(1);
                $("#contractual-result").html(data);
                $('.datetimepicker2').datetimepicker(
                    {
                        format: "DD.MM.YYYY"
                    });
                document.body.scrollIntoView(false);
            }
        });

}

function fillEmployeeContractualDataModel() {
    var id = $("#id-contractual").val();
    var idOrganization = $("#IdOrganisation").val();
    var idWageCoefficient = $("#select3").val();
    var grossSalary = $("#GrossSalary").val();
    var contractNumber = $("#ContractNumber").val();
    var employmentStartDate = $("#EmploymentStartDate").val();
    var employmentEndDate = $("#EmploymentEndDate").val();
    var contractStartDate = $("#ContractStartDate").val();
    var contractExpiryDate = $("#ContractExpiryDate").val();
    var idLeader = $("#select5").val();
    var isActive = $("#IsActive").val();
    var idJobPosition = $("#select4").val();
    var idEmployeeType = $("#select6").val();
    var officePhoneNumber = $("#OfficePhoneNumber").val();
    var comment = $("#Comment").val();
    var idEmployee = $("#employee-id-value").val();
    var status = id == 0 || id == null ? true : $("#status-check").val();
    return requestObj = {
        Id: id,
        IdOrganization: idOrganization,
        IdWageCoefficient: idWageCoefficient,
        GrossSalary: grossSalary,
        ContractNumber: contractNumber,
        EmploymentStartDate: employmentStartDate,
        EmploymentEndDate: employmentEndDate,
        ContractStartDate: contractStartDate,
        ContractExpiryDate: contractExpiryDate,
        IdLeader: idLeader,
        IsActive: isActive,
        IdJobPosition: idJobPosition,
        IdEmployeeType: idEmployeeType,
        OfficePhoneNumber: officePhoneNumber,
        Comment: comment,
        IdEmployee: idEmployee,
        Status: status
    }
}

function saveContractualForm(e) {

    var url = $("#save-employee-contractual-data-url").val();
    var requestObj = fillEmployeeContractualDataModel();

    Post(requestObj, url).done(function (data) {
        if (data.isValid) {
            showAlert(data.message, "employee-contractual-data-alert", "success");
            $("#contractual-result").empty();
            $("#inputs-checker").val(0);
            loadEmployeeContractualData();
            $("#inputs-checker").val(1);
            $("#has-contractual-data").val(1);
            $('.nav-tabs li').not('.active').removeClass('disabled');
            $('.nav-tabs li').not('.active').find('a').attr("data-toggle", "tab");
            return;
        }
        showAlert(data.message, "employee-contractual-data-alert", "error");
    });
    return false;
}

function editContractual(id) {
    debugger;
    const url = $("#url-edit-contractual").val();
    const employeeId = $("#employee-id-value").val();
    Get({ id: id, employeeId: employeeId }, url).done(function (data) {
        $('#form-contract-id').css('display', 'block');
        $('#add-conctractual-data').removeClass('disabled');
        $('#form-contract-id').addClass('border-bottom-0');
        $('#add-conctractual-data').fadeTo(1, 0);
        $("#status-col").css('display', 'block');
        $("#id-contractual").val(data.id);
        $("#IdOrganisation").data("kendoDropDownTree").value(data.idOrganization);
        $("#IdOrganisation").data("kendoDropDownTree").trigger("change");
        $("#select3").val(data.idWageCoefficient).trigger('change');
        $("#GrossSalary").val(data.grossSalary);
        $("#select4").val(data.idJobPosition).trigger('change');
        $("#ContractNumber").val(data.contractNumber);
        $("#EmploymentStartDate").data("DateTimePicker").date(new Date(data.employmentStartDate));
        $("#EmploymentEndDate").data("DateTimePicker").date(new Date(data.employmentEndDate));
        $("#ContractStartDate").data("DateTimePicker").date(new Date(data.contractStartDate));
        $("#ContractExpiryDate").data("DateTimePicker").date(new Date(data.contractExpiryDate));
        $("#Status").prop("checked", data.status);
        $("#status-check").val(data.status);
        $("#select5").val(data.idLeader).trigger('change');
        $("#OfficePhoneNumber").val(data.officePhoneNumber);
        $("#select6").val(data.idEmployeeType).trigger('change');
        $("#Comment").val(data.comment);
        if (!data.status) {
            $("#comment-area").removeClass("hidden");
        }
    });
}

function deactiveContract(id) {

    var url = $("#url-deactive-contractual").val() + "/" + id;
    var requestObj = fillEmployeeContractualDataModel();

    Post(requestObj, url).done(function (data) {
        if (data.isValid) {
            showAlert(data.message, "employee-contractual-data-alert", "success");
            $("#contractual-result").empty();
            $("#inputs-checker").val(0);
            loadEmployeeContractualData();
            $("#inputs-checker").val(1);
            return;
        }
        showAlert(data.message, "employee-contractual-data-alert", "error");
    });
    $("#finish-contract").modal('hide');
    return false;
}

function WageCoefficientChanger(id) {
    debugger;
    const url = $("#calculate-salary-url").val();
    if (id > 0) {
        Get({ wageCoefficientId: id }, url).done(function (data) {
            debugger;
            if (data != null) {
                debugger;
                $("#GrossSalary").attr("readonly", true);
                $("#GrossSalary").val(parseFloat(Math.round((parseFloat(data * 100)).toFixed(2)) / 100).toFixed(2));
                //document.getElementById("GrossSalary").value = parseFloat(data).toFixed(2);
            } else {
                debugger;
                $("#GrossSalary").attr("readonly", false);
                $("#GrossSalary").val("");
            }
        });
    }

}


//salary
function loadEmployeeSalaryTab() {
    debugger
    window.location.hash = 'salary';
    loadPartialView()
        .done(function (data) {
            if (data != null) {
                debugger
                $("#salary-tab").html(data);
            }
        });

}

function saveEmployeeSalary(e) {
    debugger
    var url = $("#save-employee-salary-url").val();
    var id = $("#id-salary").val();
    var idSyndicate = $("#syndicateId").val();
    var idBank = $("#bankId").val();
    var idPaymentMethod = $("#paymentMethodId").val();
    var employersContribution = $("#EmployersContribution").val();
    var employeeContribution = $("#EmployeeContribution").val();
    var selfContribution = $("#SelfContribution").val();
    var insuranceEmployersContribution = $("#InsuranceEmployersContribution").val();
    var insuranceEmployeeContribution = $("#InsuranceEmployeeContribution").val();
    var accountNumber = $("#AccountNumber").val();
    var idEmployee = $("#employee-id-value").val();
    var requestObj = {
        Id: id,
        IdSyndicate: idSyndicate,
        AccountNumber: accountNumber,
        IdBank: idBank,
        IdPaymentMethod: idPaymentMethod,
        EmployersContribution: employersContribution,
        EmployeeContribution: employeeContribution,
        InsuranceEmployersContribution: insuranceEmployersContribution,
        InsuranceEmployeeContribution: insuranceEmployeeContribution,
        SelfContribution: selfContribution,
        IdEmployee: idEmployee,

    }
    Post(requestObj, url).done(function (data) {
        debugger
        if (data.isValid) {
            showAlert(data.message, "employee-alert", "success");
            if (data.data != null && data.data.id > 0) {
                debugger
                $("#id-salary").val(data.data.id);
            }
            return;
        }
        showAlert(data.message, "employee-alert", "error");
    });
    return false;
}


//experience
function loadEmployeeExperienceTab() {
    debugger
    window.location.hash = 'experience';
    loadPartialView()
        .done(function (data) {
            if (data != null) {
                $("#experience-tab").html(data);
            }
        });
}

function saveEmployeeExperience(e) {

    debugger
    var url = $("#url-save-experience").val();
    var form = $("#experience-form")[0];
    var formData = new FormData(form);

    formData.append('idEmployee', $("#employee-id-value").val());

    PostSync(formData, url).done(function (data) {
        if (data.isValid) {
            debugger
            loadEmployeeExperienceTab();
            showAlert(data.message, "employee-alert", "success");
            return;
        } else {
            debugger
            showAlert(data.message, "employee-alert", "error");
        }
    });
    return false;
}

function editExperience(id) {
    debugger;
    const url = $("#url-edit-experience").val();
    Get({ id: id }, url).done(function (data) {
        if (data.isValid) {
            debugger
            $('#form-experience-id').css('display', 'block');
            $('#add-new-experience').css('display', 'none');
            $("#id-experience").val(data.data.id);
            $("#id-contractual").val(data.data.id);
            $("#JobPosition").val(data.data.jobPosition);
            $("#Company").val(data.data.company);
            $("#StartDate").data("DateTimePicker").date(new Date(data.data.startDate));
            if (data.data.endDate != null) {
                $("#EndDate").data("DateTimePicker").date(new Date(data.data.endDate));
            } else {
                $("#EndDate").prop("disabled", true);
                $("#IsOngoing").prop("checked", true);
            }
            $("#Place").val(data.data.place);
            if (data.data.filePath != null && data.data.filePath.substring(data.data.filePath.lastIndexOf('.') + 1) != null) {
                $("#document-employee-experience").html("<a href='" + data.data.filePath + "' target='_blank'><i class='la la-file'> Dokumenti</a>");
            }
        }

    });
}

function deleteExperience(id) {
    bootbox.confirm({
        title: "Fshije",
        message: "A jeni i sigurtë se doni t'a fshini?",
        centerVertical: true,
        buttons: {
            confirm: {
                label: 'PO',
                className: 'btn-primary'
            },
            cancel: {
                label: 'JO',
                className: 'btn-secondary'
            }
        },
        callback: function (result) {
            if (result) {
                var url = $("#url-delete-experience").val();
                DeleteEmpty(url + "/" + id).done(function (data) {
                    if (data.isValid) {
                        loadEmployeeExperienceTab();
                        showAlert(data.message, "employee-alert", "success");
                    }
                    else {
                        showAlert(data.message, "employee-alert", "error");
                    }
                });
            }
        }
    });
}


//documents
function loadEmployeeDocumentTab() {
    debugger
    window.location.hash = 'documents';
    loadPartialView()
        .done(function (data) {
            if (data != null) {
                $("#documents-tab").html(data);
            }
        });
}

function saveEmployeeDocument(e) {

    debugger
    var url = $("#save-employee-document-url").val();
    var form = $("#document-form")[0];
    var formData = new FormData(form);

    formData.append('idEmployee', $("#employee-id-value").val());

    PostSync(formData, url).done(function (data) {
        if (data.isValid) {
            debugger
            loadEmployeeDocumentTab();
            showAlert(data.message, "employee-alert", "success");
            return;
        } else {
            debugger
            showAlert(data.message, "employee-alert", "error");
        }
    });
    return false;
}

function deleteDocument(id) {
    bootbox.confirm({
        title: "Fshije",
        message: "A jeni i sigurtë se doni t'a fshini?",
        centerVertical: true,
        buttons: {
            confirm: {
                label: 'PO',
                className: 'btn-primary'
            },
            cancel: {
                label: 'JO',
                className: 'btn-secondary'
            }
        },
        callback: function (result) {
            if (result) {
                var url = $("#url-delete-document").val();
                DeleteEmpty(url + "/" + id).done(function (data) {
                    if (data.isValid) {
                        loadEmployeeDocumentTab();
                        showAlert(data.message, "employee-alert", "success");
                    }
                    else {
                        showAlert(data.message, "employee-alert", "error");
                    }
                });
            }
        }
    });
}


//complaints
function loadEmployeeComplaintTab() {
    debugger
    window.location.hash = 'complaints';
    loadPartialView()
        .done(function (data) {
            if (data != null) {
                $("#complaints-tab").html(data);
            }
        });
}

function saveEmployeeComplaint(e) {

    debugger
    var url = $("#save-employee-complaint-url").val();
    var form = $("#complaint-form")[0];
    var formData = new FormData(form);

    formData.append('idEmployee', $("#employee-id-value").val());

    PostSync(formData, url).done(function (data) {
        if (data.isValid) {
            debugger
            loadEmployeeComplaintTab();
            showAlert(data.message, "employee-alert", "success");
            return;
        } else {
            debugger
            showAlert(data.message, "employee-alert", "error");
        }
    });
    return false;
}

function editComplaint(id) {
    debugger;
    const url = $("#url-edit-complaint").val();
    const employeeId = $("#employee-id-value").val();
    Get({ id: id, employeeId: employeeId }, url).done(function (data) {
        $('#form-complaint-id').css('display', 'block');
        //$('#add-new-complaint').css('display', 'none');
        $('#form-complaint-id').addClass('border-bottom-0');
        $('#add-complaint-data').addClass('disabled');
        $('#add-complaint-data').fadeTo(1, 0);
        $("#id-complaint").val(data.id);
        $("#type").val(data.type).trigger('change');
        $("#DisiplineClassLevel").val(data.disiplineClassLevel);
        $("#DisiplinaryMeetingDate").data("DateTimePicker").date(new Date(data.disiplinaryMeetingDate));
        if (data.reviewDate != null) {
            $("#ReviewDate").data("DateTimePicker").date(new Date(data.reviewDate));
        }
        $("#VerdictNumber").val(data.verdictNumber);
        $("#Reason").val(data.reason);
        $("#Comment").val(data.comment);
        $("#Document").val();
    });
    $(window).scrollTop(0);
}

function deleteComplaint(id) {
    bootbox.confirm({
        title: "Fshije",
        message: "A jeni i sigurtë se doni t'a fshini?",
        centerVertical: true,
        buttons: {
            confirm: {
                label: 'PO',
                className: 'btn-primary'
            },
            cancel: {
                label: 'JO',
                className: 'btn-secondary'
            }
        },
        callback: function (result) {
            if (result) {
                var url = $("#url-delete-complaint").val();
                DeleteEmpty(url + "/" + id).done(function (data) {
                    if (data.isValid) {
                        loadEmployeeComplaintTab();
                        showAlert(data.message, "employee-alert", "success");
                    }
                    else {
                        showAlert(data.message, "employee-alert", "error");
                    }
                });
            }
        }
    });
}


//wotkingTime
//function loadWorkingTimeTable(data) {
//    $('#working-time-table').dataTable().fnDestroy();
//    $('#working-time-table').DataTable({
//        //"processing": true,
//        "searching": false,
//        "paging": false,
//        "info": false,
//        "aaData": data,
//        "order": [5, 'asc'],
//        "columns": [
//            {
//                "data": "day",
//                "sortable": false
//            },
//            {
//                "data": "from",
//                "sortable": false
//            },
//            {
//                "data": "to",
//                "sortable": false
//            },
//            {
//                "data": "isWorkingDayText",
//                "sortable": false
//            },
//            {
//                data: null,
//                className: "center",
//                sortable: false,
//                defaultContent: '<a href="#" class="btn btn-secondary btn-xs" onclick="aClick(event, this)"><i class="fa fa-pencil"></i> Edito</a>'
//            },
//            {
//                "data": "id",
//                "searchable": false,
//                "visible": false,
//            },
//            {
//                "data": "idEmployee",
//                "visible": false,
//                "searchable": false
//            },
//            {
//                "data": "idDefaultDailyWorkingTime",
//                "visible": false,
//                "searchable": false
//            },
//            {
//                "data": "isWorkingDay",
//                "visible": false,
//                "searchable": false,
//                "sortable": false
//            }
//        ]
//    });
//}

function loadEmployeeWorkingTimeData() {
    debugger
    window.location.hash = 'working-time';
    loadPartialView()
        .done(function (data) {
            if (data != null) {
                //loadWorkingTimeTable(data);
                $("#working-time-tab").html(data);
            }
        });
}

//datatable inline editing
//function editRow(oTable, nRow) {
//    debugger
//    var aData = oTable.fnGetData(nRow);
//    var jqTds = $('>td', nRow);
//    //jqTds[0].innerHTML = '<input type="text" id="rDay" value="' + aData.day + '">';
//    jqTds[1].innerHTML = '<input type="text" id="rFrom" value="' + aData.from + '">';
//    jqTds[2].innerHTML = '<input type="text" id="rTo" value="' + aData.to + '">';
//    jqTds[3].innerHTML = '<input type="checkbox" id="rIsWorkingDay"' + (aData.isWorkingDay ? 'checked' : ' ') + '>';
//    jqTds[4].innerHTML = '<a href="#" class="edit btn btn-primary" onclick="aClick(event, this)" >Save</a>';
//    jqTds[4].innerHTML += ' <a href="#" class="edit btn btn-outline-secondary" onclick="aClick(event, this)" >Cancel</a>';
//}

//function restoreRow(oTable, nRow) {
//    debugger
//    var aData = oTable.fnGetData(nRow);
//    var newArray = [aData.day, aData.from, aData.to, aData.isWorkingDayText, aData.id, aData.idEmployee, aData.idDefaultDailyWorkingTime, aData.isWorkingDay];
//    var jqTds = $('>td', nRow);

//    for (var i = 1, iLen = jqTds.length; i <= iLen; i++) {
//        oTable.fnUpdate(newArray[i], nRow, i, false);
//    }

//    oTable.fnDraw();
//}

//function saveRow(oTable, nRow, data) {
//    debugger
//    //var aData = oTable.fnGetData(nRow);
//    var jqInputs = $('input', nRow);
//    oTable.fnUpdate(jqInputs[0].value, nRow, 1, false);
//    oTable.fnUpdate(jqInputs[1].value, nRow, 2, false);
//    oTable.fnUpdate(data.isWorkingDayText, nRow, 3, false);
//    oTable.fnUpdate('<a href="#" class="btn btn-secondary btn-xs" onclick="aClick(event, this)"><i class="fa fa-pencil"></i> Edito</a>', nRow, 4, false);
//    oTable.fnDraw();
//    //loadEmployeeWorkingTimeData();
//}

//function saveEmployeeWorkingTime(oTable, nRow) {
//    debugger;
//    //wTimeData.day = $("#rDay").val();
//    var wTimeData = oTable.fnGetData(nRow);
//    wTimeData.from = $("#rFrom").val();
//    wTimeData.to = $("#rTo").val();
//    wTimeData.isWorkingDay = $("#rIsWorkingDay").is(":checked");
//    wTimeData.isWorkingDayText = wTimeData.isWorkingDay ? "Po" : "Jo";
//    wTimeData.negationIsWorkingDayText = !wTimeData.isWorkingDay ? "Po" : "Jo";
//    var url = $("#url-edit-working-time").val();
//    Post(wTimeData, url).done(function (data) {
//        if (data.isValid) {
//            debugger
//            saveRow(oTable, nRow, wTimeData);
//            showAlert(data.message, "employee-alert", "success");
//        } else {
//            restoreRow(oTable, nRow);
//            showAlert(data.message, "employee-alert", "error");
//        }
//    });
//}
//




//funcs
function switchToTab(hashtag) {
    $('a[href="' + hashtag + '-tab"]').trigger('click');
    changeTabs(hashtag + '-tab');
    //$('#tabii a[href="'+hashtag+'-tab"]').tab('show');
}
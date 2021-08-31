$(document).ready(() => GetEmpty('/Home/GetResources').then(result => {
    window.resources = result;
    ticketsGrid();
    [...$('#readTickets button.custom-link')].forEach(button => $(button).bind('click', chooseTicketStatus));
    [...$('button.nav-link')].forEach(button => $(button).bind('click', chooseTicketType));
}));

const chooseTicketType = function () {
    $('button.nav-link').removeClass('active');
    $(this).addClass('active');
    //let isDelegated = $('.nav-tabs .nav-item button.active').attr('data-id') == 0 ? null : $('.nav-tabs .nav-item button.active').attr('data-id') == 1;
    //let data = $("#tickets-list").data("kendoGrid").dataSource.data();
    //console.log(data);
    //let newData = data.filter(d => {
    //    if (d.idAssignedTeamNavigation)
    //        return d.idAssignedTeamNavigation.teamMembers.find(m => m.idMemberUser == window.iduser)
    //    return d.idAssignedUser == window.iduser;
    //});
    //console.log(newData);
    //return false;
}

const chooseTicketStatus = function () {
    $('.custom-link').removeClass('active');
    $(this).addClass('active');
}

const getResource = key => {
    let resource = window.resources.find(r => r.key == key);
    if (!resource)
        return undefined;
    return resource.value;
}

const ticketsGrid = () => {
    $("#tickets-list").kendoGrid({
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
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "./ReadTickets",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    fields: {
                        entryDate: { type: "date" }
                    }
                }
            },
            batch: false,
            pageSize: 10,
        }),
        sortable: true,
        columnMenu: {
            messages: {
                columns: getResource('ColumnLabel'),
                filter: getResource('FilterLabel'),
                sortAscending: getResource('SortAsc'),
                sortDescending: getResource('SortDesc')
            }
        },
        filterable: {
            mode: "menu",
            messages: {
                info: getResource('FilterItemsTextLabel'),
                filter: getResource('ApplyFilter'),
                clear: getResource('CancelLabel')
                }
        },
        filterMenuInit: e => e.container.find(".k-filter-help-text").text(getResource('FilterItemsTextLabel')),
        selectable: ['cell', 'row'],
        pageable: {
            refresh: true,
            //pageSizes: true,
            buttonCount: 5,
            messages: {
                display: getResource('GridDisplayLabel') + " " + '{0}-{1}'+ " " + getResource('GridTotalRecordLabel') + " " + '{2}' + " " + getResource('GridRecordLabel'),
                empty: getResource('NoRecordsLabel')
            }
        },

        toolbar: [{
            template: `<div class='d-inline-flex w-100 justify-content-between'>
                                <a class='nav-link' href='./AddTicket' style='color: \\#b6b6b6;background-color: \\#fafafa;border: 1px solid \\#dedede;'><span class='k-icon k-i-plus' style='opacity: 1'></span></a>
                                <ul class="nav nav-tabs nav-tabs-bottom" style='border-bottom: 0 !important;'>
                                    <li class="nav-item"><button class="nav-link" data-id="0"><i class='la la-file-pdf-o'></i> PDF</button></li>
                                    <li class="nav-item"><button class="nav-link" data-id="1"><i class='la la-file-excel-o'></i> EXCEL</button></li>
                                    <li class="nav-item"><button class="nav-link" data-id="2"><i class='la la-file-excel-o'></i> CSV</button></li>
                                </ul>
                           </div>` }],
        columns: [
            {
                field: "code",
                title: getResource('DocumentLabel'),
                template: "<a href='\\javascript:void(0)' onclick='openTicket(#:id#)' style='color:\\#f97403'>#: code #</a>",
                attributes: {
                    "data-field": "code",
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: getResource('ContainsLabel'),
                            eq: getResource('EqualLabel'),
                            neq: getResource("NotEqualToLabel"),
                        }
                    },
                }
            },
            {
                field: "subject",
                title: getResource('SubjectLabel'),
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: getResource('ContainsLabel'),
                            eq: getResource('EqualLabel'),
                            neq: getResource("NotEqualToLabel"),
                        }
                    },
                }
            },
            {
                field: "priority",
                title: getResource('PriorityLabel'),
                width: 150,
                filterable: {
                    extra: false,
                    ui: element => {
                        setTimeout(() => $(element).parent().prev().remove(), 1);
                        element.kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: './ReadPriorities'
                                }
                            },
                            dataTextField: 'title',
                            dataValueField: 'title',
                            optionLabel: getResource('SelectPriorityLabel')
                        });
                    }
                }
            },
            {
                field: "fullName",
                title: getResource('DelegateLabel'),
                attributes: {
                    "data-field": "entryUser",
                },
                template: "<a href='\\javascript:void(0)' onclick='openProfile(#:idEntryUser #, false)' style='color:\\#f97403'>#: fullName #</a>",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: getResource('ContainsLabel'),
                            eq: getResource('EqualLabel'),
                            neq: getResource("NotEqualToLabel"),
                        }
                    },
                }
            },
            {
                field: "assignedUser",
                title: getResource('ReceiverLabel'),
                attributes: {
                    "data-field": "assignedTo",
                },
                template: "<a href='\\javascript:void(0)' onclick='openProfile(#:idAssignedTeam == null ? idAssignedUser : idAssignedTeam #, #:idAssignedTeam != null#)' style='color:\\#f97403'>#: assignedUser #</a>",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: getResource('ContainsLabel'),
                            eq: getResource('EqualLabel'),
                            neq: getResource("NotEqualToLabel"),
                        }
                    },
                }
            },
            {
                field: "status",
                title: getResource('StatusLabel'),
                filterable: {
                    extra: false,
                    ui: element => {
                        setTimeout(() => $(element).parent().prev().remove(), 1);
                        element.kendoDropDownList({
                            dataSource: {
                                transport: {
                                    read: './ReadStatuses'
                                }
                            },
                            dataTextField: 'title',
                            dataValueField: 'title',
                            optionLabel: getResource('SelectStatusLabel')
                        });
                    }
                }
            },
            {
                field: "entryDate",
                type: "date",
                title: getResource('DateLabel'),
                template: "#= kendo.toString(kendo.parseDate(entryDate), 'dd.MM.yyyy HH:mm')#",
                filterable: {
                    extra: false,
                    ui: element => element.kendoDatePicker({
                            format: '{0: dd.MM.yyyy}'
                        }),
                    operators: {
                        date: {
                            eq: getResource('EqualLabel'),
                            neq: getResource('NotEqualLabel'),
                            gt: getResource('GreaterThanLabel'),
                            gte: getResource('GreaterThanOrEqualTo'),
                            lt: getResource('LessThanLabel'),
                            lte: getResource('LessThanOrEqualToLabel'),
                        }
                    },
                }
            }]
    });
}

const openTicket = idTicket => {
    let ticket = $("#tickets-list").data("kendoGrid").dataSource.data().filter(e => e.id == idTicket)[0];
    if (ticket)
        Get({ Id: ticket.id, IdAssignedTeam: ticket.idAssignedTeam, IdAssignedUser: ticket.idAssignedUser, IdTicketAssignType: ticket.idTicketAssignType, IdTicketType: ticket.idTicketType, Subject: ticket.subject, Priority: ticket.priority, Category: ticket.category, Status: ticket.status, FullName: ticket.fullName, EntryDate: new Date(ticket.entryDate).toLocaleString(), Progress: ticket.progress, IdTicketStatus: ticket.idTicketStatus, IDEntryUser: ticket.idEntryUser }, './GetTicket').then(result => {
            $(result).appendTo($('body'));
            $("#ticketModal").modal('show');
            $("#ticketModal").on('hidden.bs.modal', function () {
                $(this).remove();
            });
            setTimeout(() => scrollChatToBottom(), 500);
            $('button.edit-icon').bind('click', editTicket);
            slider();
        });
}

const scrollChatToBottom = () => $('.chat').scrollTop(([...$('.chat > div')].reduce((accumulator, currentValue) => accumulator + $(currentValue).height(), 0) + 100));

const openProfile = (id, isTeam) => {
    Get({ id }, isTeam ? './GetTeam' : './GetUser')
        .then(result => {
            $(result).appendTo($('body'));
            $(`#${isTeam ? 'team' : 'user'}InfoModal`).modal('show');
            $(`#${isTeam ? 'team' : 'user'}InfoModal`).on('hidden.bs.modal', function () {
                $(this).remove();
            });
        });
}

onTicketReply = response => {
    let result = response.responseJSON;
    if (result) {
        if (result.status != 0)
            alert(getResource('AnErrorHasOccuredLabel'));
        else {
            let files = '';
            if ($("#fileUpload").get(0).files.length > 0)
                files = "<p class='mt-2 mb-1'>" + getResource('AttachedLabel') + ": </p>" + [...$("#fileUpload").get(0).files].map(file => `<p><a href='#'>${file.name}</a></p>`);

            $(`<div class='d-inline-flex justify-content-end w-100 mb-3'>
                            <div class='d-flex flex-column justify-content-start w-50 pt-3 pb-3 pl-2 pr-2' style='background-color: #ffebda;border-radius:12px 12px 0px 12px'>
                                <div class='w-100 d-inline-flex justify-content-between'>
                                    <div class='col-8'>
                                        <p class='m-0 text-break'>${$("#Message").val()}</p>
                                        ${files}
                                    </div>
                                    <div class='col-4 d-flex justify-content-start align-items-end flex-column'>
                                        <p class="m-0 font-weight-bold">${window.firstLast}</p>
                                        <p class='m-0'>${$(".reply #IdTicketStatus option:selected").text()}</p>
                                        <p class='m-0'>${new Date().toLocaleString('de-de')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`).insertBefore('.chat > div.sticky-bottom');
            $('.chat').animate({
                scrollTop: [...$('.chat > div')].reduce((accumulator, currentValue) => accumulator + $(currentValue).height(), 0)
            }, 250);
            $('#Message').val('');
            $('.chat > div.sticky-bottom form').next().remove();
            $('.custom-select#IdTicketStatus').val($(".reply #IdTicketStatus").val());
            $('.custom-select#IdTicketStatus').prev().text($(".reply #IdTicketStatus option:selected").text());
            $("button.nav-link.active").submit();
        }
        return;
    }
    alert(getResource('AnErrorHasOccuredLabel'));
}

const onFileUpload = e => {
    if ($('form.ticket-reply').next())
        $('form.ticket-reply').next().remove();

    let allowedFileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg'];
    let files = $(e).get(0).files;
    if (files) {
        if ([...files].filter(file => allowedFileTypes.indexOf(file.type) < 0).length > 0) {
            $(e).val();
            $(`<p class='file-names text-danger mb-0 mt-2'>${getResource('FileTypeNotAllowedLabel')}</p>`).insertAfter('form.ticket-reply');
            return;
        }
        let fileNames = [...files].map(file => file.name);
        $(`<p class='file-names text-success mb-0 mt-2'>${fileNames.join(', ')}</p>`).insertAfter('form.ticket-reply');
    }
}

const slider = () => {
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value + '%');
        });

        range.on('input', function () {
            $(this).next(value).html(this.value + '%');
        });
    });
}

const editTicket = function() {
    let slider = $('form#edit-ticket .range-slider');
    slider.removeClass('hidden').removeAttr('disabled');
    slider.prev().addClass('hidden');

    if (window.ticketOwner) {
        $("form#edit-ticket input.editable, form#edit-ticket select").each(function () {
            $(this).removeClass('hidden').removeAttr('disabled');
            $(this).prev().addClass('hidden');
        });
    }
    setTimeout(() => $(this).attr('type', 'submit').find('i').addClass('fa-check').removeClass('fa-pencil'), 100);
    $(this).unbind('click');
}

onTicketEdit = response => {
    let result = response.responseJSON;
    if (result) {
        if (result.status == 0) {
            $('form#edit-ticket input.editable, form#edit-ticket select, form#edit-ticket .range-slider').each(function () {
                switch ($(this).prop('nodeName')) {
                    case 'SELECT':
                        $(this).prev().text($(this).find('option:selected').text());
                        break;
                    case 'INPUT':
                        $(this).prev().text($(this).val());
                        break;
                    case 'DIV':
                        $(this).prev().text($(this).find("input[type='range']").val() + "%");
                }
                $(this).addClass('hidden').attr('disabled', true);
                $(this).prev().removeClass('hidden');
            });
            $('button.edit-icon').attr('type', 'button').find('i').removeClass('fa-check').addClass('fa-pencil');
            $('button.edit-icon').bind('click', editTicket);
            $("#tickets-list").data('kendoGrid').dataSource.read();
            return;
        }
        if (result.status == 5)
            alert(getResource('AnErrorHasOccuredLabel'));
        else
            alert(getResource('AnErrorHasOccuredLabel'));
    }
    else alert(getResource('AnErrorHasOccuredLabel'));
}

onSearchComplete = () => {
    let search = $('#ticketSearch').val();
    if (!search)
        $('#tickets-list').data('kendoGrid').dataSource.filter({});
    else
        $('#tickets-list').data('kendoGrid').dataSource.filter(
            {
                filters: [{
                    field: "code",
                    operator: "contains",
                    value: search
                }, {
                    field: "subject",
                    operator: "contains",
                    value: search
                }]
            },
            { logic: "or" });
}

ticketsReadOnBegin = (data, settings) => {
    let isDelegated = $('.nav-tabs .nav-item button.active').attr('data-id') == 0 ? null : $('.nav-tabs .nav-item button.active').attr('data-id') == 1;
    let statusType = $('.custom-link.active').attr('data-id');
    settings.data = `isDelegated=${isDelegated}&statusType=${statusType}&${settings.data}`;
}

ticketsReadOnComplete = response => {
    let isDelegated = $('.nav-tabs .nav-item button.active').attr('data-id') == 0 ? null : $('.nav-tabs .nav-item button.active').attr('data-id') == 1;
    switch (isDelegated) {
        case null:
            {
                $("#tickets-list").data("kendoGrid").showColumn("fullName");
                $("#tickets-list").data("kendoGrid").showColumn("assignedUser");
                break;
            }
        case true:
            {
                $("#tickets-list").data("kendoGrid").hideColumn("fullName");
                $("#tickets-list").data("kendoGrid").showColumn("assignedUser");
                break;
            }
        case false:
            {
                $("#tickets-list").data("kendoGrid").showColumn("fullName");
                $("#tickets-list").data("kendoGrid").hideColumn("assignedUser");
                break;
            }
    }
    $("#tickets-list").data("kendoGrid").dataSource.data(response.responseJSON);
    [...$('#readTickets button.custom-link')].forEach(button => $(button).bind('click', chooseTicketStatus));
}

ticketsHeaderOnBegin = (data, settings) => {
    let isDelegated = $('.nav-tabs .nav-item button.active').attr('data-id') == 0 ? null : $('.nav-tabs .nav-item button.active').attr('data-id') == 1;
    settings.data = `isDelegated=${isDelegated}&${settings.data}`
}

ticketsHeaderOnComplete = () => $("#readTickets").submit(); 
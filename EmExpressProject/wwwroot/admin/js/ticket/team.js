$(document).ready(() => GetEmpty('/Home/GetResources')
    .then(result => {
        window.resources = result
        teamsGrid();
        addTeam();
    }));

const getResource = key => {
    let resource = window.resources.find(r => r.key == key);
    if (!resource)
        return undefined;
    return resource.value;
}

const teamsGrid = () => {
    $('#teams-list').kendoGrid({
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
                    url: "./ReadTeams",
                    dataType: "json",
                }
            },
            batch: false,
            pageSize: 10,
        }),
        sortable: true,
        filterable: {
            mode: "menu",
            messages: {
                info: getResource('FilterItemsTextLabel'),
                filter: getResource('ApplyFilter'),
                clear: getResource('CancelLabel')
            },
            extra: false,
            operators: {
                string: {
                    contains: getResource('EqualLabel')
                }
            }
        },
        selectable: ['cell', 'row'],
        detailInit: detailInit,
        toolbar: [{
            template: `<div class='d-inline-flex w-100 justify-content-between'>
                                <a href='javascript:void(0)' class='nav-link' id='addTeam' style='color: \\#b6b6b6;background-color: \\#fafafa;border: 1px solid \\#dedede;'><span class='k-icon k-i-plus' style='opacity: 1'></span></a>
                                <ul class="nav nav-tabs nav-tabs-bottom" style='border-bottom: 0 !important;'>
                                    <li class="nav-item"><button class="nav-link" data-id="0"><i class='la la-file-pdf-o'></i> PDF</button></li>
                                    <li class="nav-item"><button class="nav-link" data-id="1"><i class='la la-file-excel-o'></i> EXCEL</button></li>
                                    <li class="nav-item"><button class="nav-link" data-id="2"><i class='la la-file-excel-o'></i> CSV</button></li>
                                </ul>
                           </div>` }],
        dataBound: e => {
            e.sender.dataSource.data().forEach(item => $(`tr[data-uid=${item.uid}] a.edit-team-link`).bind('click', () => {
                let teamMembers = [];
                item.teamMembers.forEach(member => teamMembers.push({ Id: member.id, IdMemberUser: member.idMemberUser, First: member.first, Last: member.last, Organisation: member.organisation }));
                Post({ Id: item.id, Title: item.title, Description: item.description, teamMembers: teamMembers }, './AddEditTeam')
                    .then(result => {
                        $(result).appendTo($('body'));
                        $('#userLookup').bind('keyup', userLookup);
                        $("#addEditTeamModal").modal('show');
                        $("#addEditTeamModal").on('hidden.bs.modal', function () {
                            $(this).remove();
                        });
                    });
            }));
        },
        pageable: {
            messages: {
                display: getResource('GridDisplayLabel')+ " " + '{0}-{1}' + " " + getResource('GridTotalRecordLabel') + " " + '{2}' + " " + getResource('GridRecordLabel'),
                empty: getResource('NoRecordsLabel')
            }
        },
        columns: [
            {
                field: "id",
                title: "Id",
                hidden: true,
                width: 240,
                filterable: {
                    extra: false,
                }
            },
            {
                field: "title",
                title: getResource('TitleLabel'),
                filterable: {
                    extra: false,
                }
            },
            {
                template: "#:teamMembers.length#",
                title: getResource('TeamMembersLabel'),
                attributes: {
                    class: 'text-center',
                },
            },
            {
                command: { name: "edit", template: "<a class='edit-team-link k-button k-button-icontext' href='javascript:void(0)'><span class='k-icon k-i-edit' style='opacity:1;top:-1px;'></span> #= getResource('EditLabel') # </a>" },
                attributes: {
                    class: 'd-flex justify-content-center'
                },
            }
        ]
    });
}

const detailInit = e => {
    let dataItem = e.data;
    let descriptionHeader = `<div class='text-center pt-3 pb-2' style='background-color:#ffebda'><p class='description'>${getResource('DescriptionLabel')} </p><p>${dataItem.description}</p></div>`;
    $(`<div>${descriptionHeader}`).appendTo(e.detailCell).kendoGrid({
        dataSource: {
            type: "odata",
            data: dataItem.teamMembers,
        },
        pageable: {
            refresh: true,
            pageSize: 5,
            buttonCount: 5,
            messages: {
                display: getResource('GridDisplayLabel')+" " + '{0}-{1}' + " " + getResource('GridTotalRecordLabel') + " " + '{2}' + " " + getResource('GridRecordLabel'),
                empty: getResource('NoRecordsLabel')
            }
        },
        scrollable: false,
        sortable: true,
        columns: [
            { field: "first", title: getResource('NameLabel'), width: "110px" },
            { field: "last", title: getResource('SurnameLabel'), width: "110px" },
        ]
    });
}

const addUserToList = (id, fullname, organisation) => {
    if ($(`.selected-users .item[data-iduser='${id}']`).length > 0)
        return;
    $(`<div class='item d-inline-flex align-items-center justify-content-between m-2' style='background-color:#fafafa;border:1px solid #ececec;padding:5px' data-iduser='${id}'>
               <div class='d-flex flex-column'>
                   <span class='fullname''>${fullname}</span>
                   <span style='color: #525252;font-size:.85em'>${organisation}</span>
               </div>
               <span class='remove-user' onclick='$(this).parent().remove()'></span>
           </div>`).appendTo($('.selected-users'));
}

const userLookup = event => {
    if ($(event.currentTarget).val().length > 3)
        Get({ value: $(event.currentTarget).val() }, './ReadUsers').then(result => {
            if (result.length == 0)
                html = `<h4>${getResource('NoResultLabel')}</h4>`;
            else
                html = result.map(item => `<div class='item'>
                                                    <div class='d-inline-flex align-items-center w-30 mr-3'>
                                                        <span onclick="addUserToList(${item.id}, '${item.first + ' ' + item.last}', '${item.organisation}')" class="mr-2 select-user"></span>
                                                        <div class='d-flex flex-column align-items-start'>
                                                            <span class='fullname'>${item.first + ' ' + item.last}</span>
                                                            <span class='username'>${item.account}</span>
                                                        </div>
                                                    </div>
                                                    <div class='d-flex flex-column align-items-${item.organisation == null ? "end" : "start"}'>
                                                        <span class='font-weight-bold'>${item.organisation == null ? '' : item.organisation}</span>
                                                        <span style='color: #525252;font-size:.85em'>${item.role}</span>
                                                    </div>
                                                </div>`);
            $(".user-results").html(html);
        });
    if ($(event.currentTarget).val().length == 0)
        $(".user-results").html(`<h4>${getResource('SearchUserLabel')}...</h4>`);
}

const addTeam = () => {
    $('#addTeam').bind('click', () => {
        GetEmpty('./AddEditTeam')
            .then(result => {
                $(result).appendTo($('body'));
                $('#userLookup').bind('keyup', userLookup);
                $("#addEditTeamModal").modal('show');
                $("#addEditTeamModal").on('hidden.bs.modal', function () {
                    $(this).remove();
                });
            });
    });
}

onBegin = (data, settings) => {
    let teamMembers = [];
    $('.selected-users .item').each(function () {
        teamMembers.push({ Id: $(this).attr('data-idmember'), IdMemberUser: $(this).attr('data-iduser') });
    });
    settings.data = `${decodeURIComponent($.param({ teamMembers: teamMembers }))}&${settings.data}`;
}

onComplete = response => {
    let result = response.responseJSON;
    if (result) {
        if (result.status != 0) {
            if (result.status == 5)
                alert(getResource('ModelNotValidLabel'));
            else alert(getResource('AnErrorHasOccuredLabel'));
            return;
        }
        $("#addEditTeamModal").modal('hide');
        $("#addEditTeamModal").on('hidden.bs.modal', function () {
            $(this).remove();
        });
        $('#teams-list').data('kendoGrid').dataSource.read();
        setTimeout(() => $("table[role='treegrid'] tr:first-child").click(), 500);
        return;
    }
    alert(getResource('AnErrorHasOccuredLabel'));
}
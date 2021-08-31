$(document).ready(() => {
    GetEmpty('/Home/GetResources').then(result => window.resources = result);
    $('#userLookup').bind('keyup', userLookup);
    $('#teamLookup').bind('keyup', teamLookup);
    $("#attachments").kendoUpload({
        async: {
            chunkSize: 11000,// bytes
            autoUpload: false,
        },
        validation: {
            maxFileSize: 4194304,
            allowedExtensions: ['doc', 'docx', 'xls', '.xlsx', 'pdf', 'png', 'jpg', 'jpeg']
        }
    });
});

/**
 * gets resource from the list (resource list is registered on window object in document ready)
 * @param {any} key
 */
const getResource = key => {
    let resource = window.resources.find(r => r.key == key);
    if (!resource)
        return undefined;
    return resource.value;
}

/** used on add ticket view
 * selects a user or a team from search results
 * @param {any} element
 */
const selectItem = element => {
    $("#AssignedToError").text('');
    $(element).toggleClass('selected');
    if ($(element).parent().hasClass('team-results')) {
        $(`.team-results .item:not([data-id='${$(element).attr('data-id')}'])`).removeClass('selected');
        $(`.user-results .item`).removeClass('selected')
        $('input#IdAssignedTeam').val($('.team-results .item.selected').attr('data-id'));
        $('input#IdAssignedUser').val(null);
        return;
    }
    $(`.user-results .item:not([data-id='${$(element).attr('data-id')}'])`).removeClass('selected');
    $(`.team-results .item`).removeClass('selected');
    $('input#IdAssignedUser').val($('.user-results .item.selected').attr('data-id'));
    $('input#IdAssignedTeam').val(null);
}
/**
 * takes keyboard event as a parameter
 * used to lookup users
 * @param {any} event
 */
const userLookup = event => {
    if ($(event.currentTarget).val().length > 3)
        Get({ value: $(event.currentTarget).val() }, './ReadUsers').then(result => {
            if (result.length == 0)
                html = `<h4>${getResource('NoResultLabel')}</h4>`;
            else
                html = result.map(item => `<div class='item' data-id=${item.id} onclick='selectItem(this)'>
                                                    <div class='d-inline-flex align-items-center w-30'>
                                                        <span class="mr-2 circle-check"></span>
                                                        <div class='d-flex flex-column align-items-start'>
                                                            <span class='fullname'>${item.first + ' ' + item.last}</span>
                                                            <span class='username'>${item.account}</span>
                                                        </div>
                                                    </div>
                                                    <div class='d-flex flex-column align-items-start'>
                                                        <span class='font-weight-bold'>${item.organisation == null ? "" : item.organisation}</span>
                                                        <span style='color: #525252;font-size:.85em'>${item.role}</span>
                                                    </div>
                                                </div>`);
            $(".user-results").html(html);
        });
    if ($(event.currentTarget).val().length == 0)
        $(".user-results").html(`<h4>${getResource('SearchUserLabel')}...</h4>`);
}
/** 
 * takes keyboard event as a parameter
 * used to lookup teams
 * @param {any} event
 */
const teamLookup = event => {
    if ($(event.currentTarget).val().length > 3)
        Get({ value: $(event.currentTarget).val() }, './ReadTeams').then(result => {
            if (result.length == 0)
                html = `<h4>${getResource('NoResultLabel')}</h4>`;
            else
                html = result.map(item => `<div class='item' data-id=${item.id} onclick='selectItem(this)'>
                                                    <div class='d-inline-flex align-items-center w-30'>
                                                        <span class="mr-2 circle-check"></span>
                                                        <div class='d-flex flex-column align-items-start'>
                                                            <span class='fullname'>${item.title}</span>
                                                        </div>
                                                    </div>
                                                    <div class='d-flex flex-column align-items-start'>
                                                        <span class='font-weight-bold'>${item.description}</span>
                                                        <span class='members' style='color: #525252;font-size:.85em'>Anëtarë: ${item.teamMembers.length} (${item.teamMembers.map(member => `<span>${member.first + ' ' + member.last}</span>`)})</span>
                                                    </div>
                                                </div>`);
            $(".team-results").html(html);
        });
    if ($(event.currentTarget).val().length == 0)
        $(".team-results").html(`<h4>${getResource('SearchTeamLabel')}...</h4>`);
}

onBegin = () => {
    if (!$("#IdAssignedUser").val() && !$("#IdAssignedTeam").val()) {
        $("#AssignedToError").text(getResource('AssignedToErrorLabel'));
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        return false;
    }
    $("#AssignedToError").text('');
}

onComplete = response => {
    let result = response.responseJSON;
    debugger;
    if (result.status == 0) {
        Get({
            hasError: false, message: getResource('SuccessfulTicketRegistrationLabel') }, './TicketResponseHandler')
            .then(result => {
                $(result).appendTo($('body'));
                $('#response').modal();
                $("#response").on('hidden.bs.modal', function () {
                    $(this).remove();
                });
            });

        $("#addTicket input, #addTicket textarea, #addTicket select").each(function () {
            if ($(this).prop('type') == 'select-one')
                $(this).prop('selectedIndex', 0);
            else
                $(this).val(null);
        });

        $('.field-validation-error').html(null);
        $(".user-results").html(`<h4>${getResource('SearchUserLabel')}...</h4>`);
        $(".team-results").html(`<h4>${getResource('SearchTeamLabel')}...</h4>`);
        $(".k-upload-files > li").remove();
    }
    else
        Get({
            hasError: true, message: result.status == 5 ? getResource('ModelNotValidLabel') : getResource('AnErrorHasOccuredLabel')
        }, './TicketResponseHandler')
            .then(result => {
                $(result).appendTo($('body'));
                $('#response').modal();
                $("#response").on('hidden.bs.modal', function () {
                    $(this).remove();
                });
            });
}
function AddRole() {
    var url = $("#urlAddRole").val();
    var data = {
        Title: $("#RoleNameAddModal").val(),
        Description: $("#DescriptionAddModal").val(),

    }
    Post(data, url).done(function (result) {
        $(".roles-menu ul li:last").append('<li class="li-class" id="role-' + result.id + '">' +
            '<a onclick="changeView(' + result.id + ')" id-role="' + result.id + '" role-name="' + result.title + '">' +
            '<span id="data-' + result.id + '">' + result.title + '</span>' +
            '<span class="role-action">' +
            '<input type="hidden" id="RoleDiv-' + result.id + '" value="' + result.title + '" />' +
            '<input type="hidden" id="DescriptionRoleDiv-' + result.id + '" value="' + result.description + '" />' +
            '<input type="hidden" id="IDRoleDiv-' + result.id + '" value="' + result.id + '" />' +
            '<span class="action-circle large" data-toggle="modal" data-target="#edit_role" onclick="showRoleName(' + result.id + ')">' +
            '<i class="material-icons">edit</i>' +
            '</span>' +
            '<span class="action-circle large delete-btn" data-toggle="modal" data-target="#delete_role" onclick="deleteRoleName(' + result.id + ')">' +
            '<i class="material-icons">delete</i>' +
            '</span>' +
            '</span>' +
            '</a>' +
            '</li>');

        $("#add_role").toggle();
        $(".modal-backdrop").removeClass("modal-backdrop");
    });
}
function EditRole() {
    var url = $("#urlEditRole").val();
    var id = $("#IDRoleEditModal").val();
    var name = $("#RoleNameEditModal").val();
    var decription = $("#DescriptionNameEditModal").val();



    var model = {
        Title: name,
        Description: decription
    }
    Post({ data: model, id: id }, url).done(function (result) {
        $("#edit_role").toggle();
        $(".modal-backdrop").removeClass("modal-backdrop");
        $("#data-" + id).html(name);
        $("#RoleDiv-" + id).val(name);
        $("#IDRoleDiv-" + id).val(id);

    });
}
function showRoleName(id) {
    $("#IDRoleEditModal").val($("#IDRoleDiv-" + id).val());
    $("#RoleNameEditModal").val($("#RoleDiv-" + id).val());
    $("#DescriptionNameEditModal").val($("#DescriptionRoleDiv-" + id).val());
}
function deleteRoleName(id) {

    $("#IDRoleDeleteModal").val(id);
}
function DeleteRole() {
    var url = $("#urlRemoveRole").val();
    var id = $("#IDRoleDeleteModal").val();
    Post({ ID: id }, url).done(function (result) {
        $("#role-" + id).remove();
        $("#delete_role").toggle();
        $(".modal-backdrop").removeClass("modal-backdrop");
    });
}

function loadPartialModule(id) {
    var url = $("#urlModule").val();
    Get({ ID: id }, '@Url.Action("GetModules", "Administration")').done(function (data) {
        $("#data-result").html(data);
    });
}

function changeView(id) {
    debugger;
    loadPartialModule(id);
    $(".li-class").removeClass("active");
    $("#role-" + id).addClass("active");
}
function loadPartialModule(id) {
    var url = $("#urlModule").val();
    Get({ ID: id }, url).done(function (data) {
        $("#data-result").html(data);
    });
}
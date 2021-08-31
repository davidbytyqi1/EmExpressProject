function getAllVisibleColumns(gridId) {
    var grid = $("#" + gridId).data("kendoGrid");
    var columns = grid.columns;

    var visibleColumns = [];
    for (var i = 0; i < columns.length; i++) {
        if (!columns[i].hidden) {
            visibleColumns.push(columns[i]);
        }
    }
    return visibleColumns;
}

function exportToDocument(gridId, exportTypeId, gridNameId) {
    var grid = $("#" + gridId).data("kendoGrid");
    var filters = grid.dataSource.filter();
    var sorts = grid.dataSource.sort();
    var visibleColumns = getAllVisibleColumns(gridId);
    var columns = []
    for (var i = 0; i < visibleColumns.length; i++) {
        if (visibleColumns[i].field == null || visibleColumns[i].field == "") {
            continue;
        }
        var obj = {
            "columnName": visibleColumns[i].attributes.name,
            "displayName": visibleColumns[i].title
        }
        columns[i] = obj;
    }
    var data = {
        Filter: filters,
        Sort: sorts,
        Column: columns,
        ExportTypeId: exportTypeId,
        GridId: gridNameId
    };
    Post(data, $("#export-grid-document-url").val()).done(function (response) {
        debugger
        if (response.isValid) {
            debugger
            downloadURI(response.data.fullPath, response.data.filename);
        } else {
            showAlert("Diçka shkoi gabim, ju lutemi provoni me vonë!", "general-alert-area", "error");
        }
    });

}

function exportLogDataChangeToDocument(gridId, exportTypeId) {
    var grid = $("#" + gridId).data("kendoGrid");
    var filters = grid.dataSource.filter();
    var sorts = grid.dataSource.sort();
    var visibleColumns = getAllVisibleColumns(gridId);
    var columns = []
    for (var i = 0; i < visibleColumns.length; i++) {
        if (visibleColumns[i].field == null || visibleColumns[i].field == "") {
            continue;
        }
        var obj = {
            "columnName": visibleColumns[i].attributes.name,
            "displayName": visibleColumns[i].title
        }
        columns[i] = obj;
    }
    var data = {
        Filter: filters,
        Sort: sorts,
        Column: columns,
        ExportTypeId: exportTypeId
    };
    Post(data, $("#export-data-change-url").val()).done(function (response) {
        debugger
        if (response.isValid) {
            debugger
            downloadURI(response.data.fullPath, response.data.filename);
        } else {
            showAlert("Diçka shkoi gabim, ju lutemi provoni me vonë!", "general-alert-area", "error");
        }
    });

}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    window.open(link.href, "_blank");
    //link.target = 
    //link.dispatchEvent(new MouseEvent('click'));
}

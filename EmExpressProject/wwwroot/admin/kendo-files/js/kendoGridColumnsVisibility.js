
setTimeout(() => {
    if ($(".k-grid[data-role='grid']").length) {
        $(".k-grid[data-role='grid']").each(function () {
            if (localStorage.getItem($(this).attr('id') + "-columns") !== null)
                JSON.parse(localStorage.getItem($(this).attr('id') + "-columns")).forEach(e => {
                    if (e.hidden)
                        $("#" + $(this).attr('id')).data("kendoGrid").hideColumn(e.title);
                    else
                        $("#" + $(this).attr('id')).data("kendoGrid").showColumn(e.title)
                });
        });
    };

    $("th.k-header.k-with-icon a").bind("click", function () {
        var grid = $(this).closest('.k-grid').attr('id')
        $("ul > li.k-item[role='menuitemcheckbox']").click(function () {
            setTimeout(() => {
                var columns = [];
                $("#" + grid).data("kendoGrid").columns.forEach(function (col) { columns.push({ 'title': col.field, 'hidden': col.hidden }); });
                localStorage.setItem(grid + '-columns', JSON.stringify(columns));
            }, 100)
        });
    });
}, 100);
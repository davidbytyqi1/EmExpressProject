var first = $('#vacation .nav-item').first();
first.children('.nav-link').addClass('active show');
loadFirstPartial(first.attr("data-url"), 'tab-content');

function showPartial(url, content) {
    $("#preloader").fadeIn("fast");
    var content = $("#" + content);
    content.fadeOut("fast", function () {
        content.html("");
        GetPartial(url).done(function (result) {
            content.html(result);
            content.fadeIn();
        });
    });
};

function loadFirstPartial(url, content) {
    var content = $("#" + content);
    content.fadeOut("fast", function () {
        GetEmpty(url).done(function (result) {
            content.html(result);
            content.fadeIn();
        });
    });
};

let vacationId = 0;
let idEmployee = 0;
let idVacationType = 0;
let vacationYear = 0;
let employeeReplacerId = 0;
let employeeReplacer = '';
let actualYear = new Date().getFullYear();

const VACATION_STATUS = {
    InProcess: 1,
    Approved: 2,
    Refused: 3
}
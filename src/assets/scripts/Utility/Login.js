$(document).ready(function () {
    //shortcut.add("Ctrl+S", function () {
    //    $("#btnSubmit").click();
    //});
    //shortcut.add("esc", function () {
    //    $("#btnCancel").click();
    //});
    $('#btnSubmit').click(function () {
    });
    $("#UserName").keypress(function (e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#btnSubmit").click();
            return false;
        }
    });
    $("#Password").keypress(function (e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#btnSubmit").click();
            return false;
        }
    });
});


//Common date format in entire application
var dFormat = "dd/mm/yy";

jQuery(document).ready(function () {

    var path = window.location.pathname;
    var abc = path.split("/");
    var controller = abc[1];
    var action = abc[2] || "index";
    $("#divNotification").hide();
    if ((controller.toLowerCase() == "home" && action.toLowerCase() == "index") ||
        (controller.toLowerCase() == "account" && (action.toLowerCase() == "myappointments" || action.toLowerCase() == "upcomingschedule"))) {
        CheckBrowser();
    }
    if ((controller.toLowerCase() == "videoconsultation" && action.toLowerCase().indexOf("videoconversation") >= 0)) {
        $("#divNotification").hide();
    }
    else {
        sipUnRegister();
        $("#divNotification").hide();
        GetAppointmentNotifications();
        setInterval("GetAppointmentNotifications();", 60000);
    }

   

    ActiveAntiscroll();

    /* Load All Text box Validations*/
    kcs_Common.init();

    //Prevent paste functionality.
    kcs_Common.disablePaste();

    /* All Required, email, web url, decimal validation*/
    kcs_Common.ActiveBlur();

    /* Check Box Select All */
    //kcs_Common.ApplyUniform();

    /* Apply Date Picker */
    kcs_Common.ApplyDatePicker();

    /* Apply Time Picker */
    jQuery('.time').each(function () { //loop through each input
        var time = this.value;
        if (time == '') {
            $('#' + this.id).timepicker({
                defaultTime: 'current',
                minuteStep: 1,
                disableFocus: true,
                showMeridian: true
            });
        }
        else {
            $('#' + this.id).timepicker({
                defaultTime: time,
                minuteStep: 1,
                disableFocus: true,
                showMeridian: true
            });
        }
        jQuery("#" + this.id).mask('99:99 aM');
    });

    /* Apply Color Picker */
    jQuery('.color').each(function () { //loop through each input
        jQuery("#" + this.id).colorpicker();
    });

    /* Focus change */
    jQuery('input:text, input:password, input:checkbox, input:radio, select').on('keydown', function (event) {
        if (jQuery(this).attr("id") != "strUserName" && jQuery(this).attr("id") != "strPassword" && jQuery(this).attr("id") != "inputTextMessage") {
            var key = (event.which || event.keyCode || event.charCode);
            if (key == 13) {
                var next = jQuery(this).attr('next');
                if (jQuery("#" + next).is('select') && jQuery("#" + next).hasClass('chosen')) {
                    jQuery("#txt" + next).focus()
                }
                else {
                    jQuery("#" + next).focus();
                }
                return false;
            }
        }
    });

    /* Tool Tips */
    kcs_Common.ApplyToolTip();

    /*Apply Auto complete to drop down list.*/
    kcs_Common.ApplyChosen();

    /**/
    kcs_Common.acc_icons();
    /**/
    jQuery('input:text').each(function () {
        var mLen = jQuery(this).attr('maxlength');
        if (mLen == undefined) {
            if (jQuery(this).attr("id") != "inputTextMessage") {
                jQuery(this).attr('maxlength', 50);
            }
        }
    });

    /*Disable Input*/
    $('.disable').attr("disabled", "disabled");

    /*Readonly Input*/
    $('.readonly').attr("readonly", "readonly");

    //Print pls add jQuery.print.js
    $(".print").click(function () {
        // Print the DIV.
        $(".printContent").print();
        return (false);
    });

    jQuery('.urlvalidate').on('blur', function (event) {
        if (ValidateURL($(this).val().trim())) {
            //your custom logic goes here if its valid web site URL
            return true;
        }
        else {
            jAlert("Please enter a valid URL");
            return false;
        }
    });
    $("input:enabled:visible, textarea:enabled:visible, select:enabled:visible").first().focus();
    $("#strCountryId").change(function () {
        var countryId = $(this).val().split('|');
        $("#CountryCode").val("");
        if (countryId.length > 2) {
            var countryCode = "+" + countryId[1];
            $("#CountryCode").val(countryCode);
        }
    });
    $('.auth_title').click(function (e) {
        e.stopPropagation();
        $('.auth-function').toggleClass('open-function')
        return false;
    });
    $(document).click(function () {
        $('.auth-function').removeClass('open-function');
    });
    $(".doctorprofile-btn").live("click", function () {
        BindDoctorProfile($(this).attr("doctorId"));
        return false;
    });
    $(".patientprofile-btn").live("click", function () {
        BindPatientProfile($(this).attr("doctorId"));
        return false;
    });
    $(".view-patientprofile-btn").live("click", function () {
        BindPatientProfile($(this).attr("doctorId"));
        return false;
    });

    $("#lgCountryId").change(function () {
        var objControlId = '#lgStateId';
        var ddlDropDown = $(objControlId);
        if (ddlDropDown.length > 0) {
            ddlDropDown.empty();
            $.post("/Admin/Common/GetAllStateByCountryId/",
            { countryId: $('#lgCountryId').val() },
                function (data) {
                    ddlDropDown.empty();
                    $.each(data, function (index, Select) {
                        ddlDropDown.append($('<option/>').attr('value', Select.Value).text(Select.Text));
                    });
                    BindCity();
                });
            jQuery.ajaxSetup({ async: true });
            ddlDropDown.trigger("chosen:updated");
        }
    });
    $("#lgStateId").change(function () {
        BindCity();
    });
    $(".medicalReportViewer").live("click", function () {
        BindReport($(this).attr("reportid"));
        return false;
    });
    $(".aUploadAppointmentReport").live("click", function () {
        BindUploadReport($(this).attr("appointmentId"));
        return false;
    });
});
function BindCity() {
    var objControlId = '#lgCityId';
    var ddlDropDown = $(objControlId);
    if (ddlDropDown.length > 0) {
        ddlDropDown.empty();
        $.post("/Admin/Common/GetAllCityByStateId/",
        { stateId: $('#lgStateId').val() },
            function (data) {
                ddlDropDown.empty();
                $.each(data, function (index, Select) {
                    ddlDropDown.append($('<option/>').attr('value', Select.Value).text(Select.Text));
                });
            });
        jQuery.ajaxSetup({ async: true });
        ddlDropDown.trigger("chosen:updated");
    }
}
function BindDoctorProfile(userId) {
    $(".doctorProfile").html("");
    $("#hdnDoctorId").val(userId);
    $.post("/VideoConsultation/GetDoctorProfile", {
        userId: userId
    },
    function (data) {
        $(".doctorProfile").html(data);
    });
}
function BindPatientProfile(userId) {
    $(".patientProfile").html("");
    $("#hdnPatientId").val(userId);
    $.post("/VideoConsultation/GetpatientProfile", {
        userId: userId
    },
    function (data) {
        $(".patientProfile").html(data);
    });
}
function BindReport(reportId) {
    $("#divReportViewer").html("");
    $.post("/VideoConsultation/ReportViewer", { reportId: reportId },
    function (data) {
        $("#divReportViewer").html(data);
    });
}
function BindUploadReport(appointmentId) {
    $("#divUploadReport").html("");
    $.post("/VideoConsultation/UploadAppointmentReport", { appointmentId: appointmentId },
    function (data) {
        $("#divUploadReport").html(data);
    });
}
function ValidateURL(urlToCheck) {
    var pattern = new RegExp(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);
    return pattern.test(urlToCheck);
}

//Progress Bar
function ProgressBar() {
    jQuery("BODY").append('<div id="p_overlay"></div>');
    jQuery("#p_overlay").css({
        position: 'absolute',
        zIndex: 99998,
        top: '0px',
        left: '0px',
        width: '100%',
        height: jQuery(document).height(),
        background: '#FFF',
        opacity: '.50'
    });
    if (document.getElementById('loading_layer') != null) {
        document.getElementById('loading_layer').style.display = 'block';
    }
}

//Close progress bar
function CloseProgressBar() {
    jQuery("#p_overlay").remove();
    if (document.getElementById('loading_layer') != null) {
        document.getElementById('loading_layer').style.display = 'none';
    }
}

//Display server side message and redirect page
function DisplayMessage(url) {
    var message = document.getElementById('hdnMessage').value;
    var redirectAfterMsg = document.getElementById('hdnRedirectMsg').value;

    if (message != '') {
        if (redirectAfterMsg == 'false') {
            jAlert(message);
            document.getElementById('popup_ok').setAttribute('onclick', 'CloseDialog();');
        }
        else {
            jAlert(message);
            if (typeof IframeFlag != 'undefined' && IframeFlag != '') {
                document.getElementById('popup_ok').setAttribute('onclick', 'CloseDialog();');
            }
            else if (url != '')
                document.getElementById('popup_ok').setAttribute('onclick', 'if(CloseDialog()){window.location.href="' + url + '";}');
            else {
                document.getElementById('popup_ok').setAttribute('onclick', 'CloseDialog();$(".md-close").click();');
            }
        }
        document.getElementById('popup_ok').focus();
        document.getElementById('hdnMessage').value = '';
        document.getElementById('hdnRedirectMsg').value = 'false';
    }
}

function CloseDialog() {
    debugger;
    if (document.getElementById('hdnSuccess') != null && document.getElementById('hdnSuccess').value == "1") {
        try {
            if ($('#hdniFrame').val().toLowerCase() != 'false') {
                window.parent.$("#divDialog").dialog("close");
                return false;
            }
            return true;
        } catch (e) {
            return true;
        }
    }
    else {
        return false;
    }
}

//Trim the string
function trim(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

///Sort date time column of data-table
function dateHeight(dateStr) {
    var x;
    if (trim(dateStr) != '') {
        var frDate = trim(dateStr).split(' ');
        var frTime = frDate[1].split(':');
        var frDateParts;
        if (frDate[0].indexOf('/') > 0) {
            frDateParts = frDate[0].split('/');
        }
        else {
            frDateParts = frDate[0].split('-');
        }
        //var frDateParts = frDate[0].split('/');
        var day, month;
        if (dFormat == "dd/mm/yy") {
            day = frDateParts[0] * 60 * 24;
            month = frDateParts[1] * 60 * 24 * 31;
        }
        else if (dFormat == "mm/dd/yy") {
            day = frDateParts[1] * 60 * 24;
            month = frDateParts[0] * 60 * 24 * 31;
        }
        var year = frDateParts[2] * 60 * 24 * 366;
        var tt = frDate[2];
        var hour = ((tt == 'PM') ? (parseInt(frTime[0]) + ((parseInt(frTime[0]) == 12) ? 0 : 12)) : frTime[0]) * 60;
        if (hour <= 999) {
            hour = '0' + hour;
        }
        var minutes = frTime[1];
        x = day + month + year + hour + minutes + tt;
    } else {
        x = 99999999999999999; //GoHorse!
    }
    return x;
}

//Change focus to next control on enter key.
function FocusChange(evnt, objCntrl) {
    var key = (evnt.which || evnt.keyCode || evnt.charCode);
    if (key == 13) {
        if (document.getElementById(objCntrl) != null) {
            document.getElementById(objCntrl).focus();
            return false;
        }
    }
}

// Get all selected check box value with ',' separator.
function GetSelectedChkBoxValue(objClass) {
    var chkVal = '';
    $('.' + objClass).each(function () { //loop through each check box
        if (this.checked) {
            if (chkVal != '') {
                chkVal += ',' + this.val();
            }
            else {
                chkVal = this.val();
            }
        }
    });
    return chkVal;
}

// Compare 2 dates. If from-date is greater then to date it will return false.
function CompareDate(fromdate, todate) {
    var year1, month1, day1;
    var year2, month2, day2;
    if (dFormat == "dd/mm/yy") {
        year1 = parseInt(fromdate.substring(6, 10).toString());
        month1 = parseInt(fromdate.substring(3, 5).toString()) - 1; // Months start with 0 in JavaScript - June
        day1 = parseInt(fromdate.substring(0, 2).toString());

        year2 = parseInt(todate.substring(6, 10).toString());
        month2 = parseInt(todate.substring(3, 5).toString()) - 1; // Months start with 0 in JavaScript - June
        day2 = parseInt(todate.substring(0, 2).toString());
    }
    else if (dFormat == "mm/dd/yy") {
        year1 = parseInt(fromdate.substring(6, 10).toString());
        month1 = parseInt(fromdate.substring(0, 2).toString()) - 1; // Months because the months start with 0 in JavaScript - June
        day1 = parseInt(fromdate.substring(3, 5).toString());

        year2 = parseInt(todate.substring(6, 10).toString());
        month2 = parseInt(todate.substring(0, 2).toString()) - 1; // Months because the months start with 0 in JavaScript - June
        day2 = parseInt(todate.substring(3, 5).toString());
    }
    var myDate1 = new Date(year1, month1, day1);
    var myDate2 = new Date(year2, month2, day2);
    if (myDate1 > myDate2) {
        return false;
    }
    return true;
}

//Put (,) separator for integer value and append .00 for decimal
function FormatNumber(val, decimalPlaces) {

    //NB   If this formatting is changed the VB formatting needs to be changed.
    var Temp, NewText, Len, SepPos, SepNo, DecPlace, Neg, Whole, i;

    val.value = val.value.replace(/,/g, "");

    //Check to see the decimal places
    if (decimalPlaces != null) {

        val.value = parseFloat(val.value).toFixed(decimalPlaces);
    }

    Temp = val.value;
    //Check to see the thousands seperator
    //check if the number is valid or not
    if (isNaN(val.value)) {
        val.value = "";//parseFloat(0).toFixed(val.decplace);
    }

    Temp = Temp.split(".", -1);
    //Check if the number is negative
    Whole = Temp[0];
    if (parseInt(Whole) < 0) Neg = true;
    Whole = Math.abs(Whole);
    //This is to cast as a string
    Whole = Whole + "";
    Len = Whole.length;
    DecPlace = Temp[1];
    SepPos = Len - (parseInt(Len / 3) * 3);

    if (parseInt(Len) > 3) {
        SepNo = 0;
        i = SepPos;
        while (i <= parseInt(Len)) {
            Temp = Whole.substring(SepNo, i);
            if (SepNo == 0) {
                NewText = Temp;
            }
            else {
                NewText = NewText + ',' + Temp;
            }

            SepNo = i;
            i = i + 3;
        }
        //Check if to put the decimal places on
        if (DecPlace != undefined) {
            NewText = NewText + "." + DecPlace;
        }
        //Check if we need to put the negative back
        if (Neg == true) NewText = "-" + NewText;
        val.value = NewText;
    }

    //alert(txtName);
}

//Remove (,) separator for for decimal
function RemoveFormatNumber(val) {
    val.value = val.value.replace(/,/g, "");
}

function BindPreferredTime(userId, date) {
    var objControlId = '#lgTimeSloatId';
    var ddlDropDown = $(objControlId);
    if (ddlDropDown.length > 0) {
        ddlDropDown.empty();
        $.post("/Admin/Common/GetAllDoctorTimeSloat/",
        { userId: userId, date: date },
            function (data) {
                ddlDropDown.empty();
                $.each(data, function (index, Select) {
                    ddlDropDown.append($('<option/>').attr('value', Select.Value).text(Select.Text));
                });
            });
        jQuery.ajaxSetup({ async: true });
        ddlDropDown.trigger("chosen:updated");
    }
}
//Parse date from string
function ParseDate(objDate) {
    var year1, month1, day1;
    if (dFormat == "dd/mm/yy") {
        year1 = parseInt(objDate.substring(6, 10).toString());
        month1 = parseInt(objDate.substring(3, 5).toString()) - 1; // Months start with 0 in JavaScript - June
        day1 = parseInt(objDate.substring(0, 2).toString());
    }
    else if (dFormat == "mm/dd/yy") {
        year1 = parseInt(objDate.substring(6, 10).toString());
        month1 = parseInt(objDate.substring(0, 2).toString()) - 1; // Months because the months start with 0 in JavaScript - June
        day1 = parseInt(objDate.substring(3, 5).toString());
    }
    var myDate1 = new Date(year1, month1, day1);
    return myDate1;
}

//Bind Drop Down
function DDLRebind(ControlId, Method) {
    jQuery.post(Method, { IsAll: false }, function (response) {
        var ddlDropDown = jQuery('#' + ControlId);
        ddlDropDown.empty();
        jQuery.each(response, function (index, obj) {
            ddlDropDown.append(jQuery('<option/>').attr('value', obj.Value).text(obj.Text));
        });
        $("#" + ControlId + "").trigger("chosen:updated");
    });
}

//Show Dialog 
var objHeight = parseInt(window.screen.availHeight) - 95;
var objWidth = 750;
var objControlId;
var objMethod;

function showDialog(PageSource, ControlId, Method, callback) {
    jQuery("#divDialog").html('<iframe id="modalIframeId" width="100%" height="98%" marginWidth="0" marginHeight="0" frameBorder="0" />');
    jQuery("#modalIframeId").attr("src", PageSource + "?iFrame=1");
    jQuery("#divDialog").dialog({
        autoOpen: true,
        position: { my: "center", at: "top+250", of: window },
        width: 1000,
        height: 400,
        resizable: true,
        modal: true,
        close: function () {
            //RemoveIframe();
            jQuery("#divDialog").html('');
            if (callback) {
                callback(true);
            }
            else {
                DDLRebind(ControlId, Method);
            }
        }
    });
    return false;
}
function OnAnchorClick(e) {
    var id = e.id.replace("anchor_", "");
    var lblId = "lbl_" + id;
    $("#" + lblId).text('');
    $("#" + id).click();
    return false;
}
function FileUploadOnChange(e) {
    var lblId = "lbl_" + e.id;
    var imgId = "#img_" + e.id;
    var validId = "#valid_" + e.id;
    var extension = e.files[0].name.split('.').pop().toUpperCase();
    if (extension != "PDF") {
        $(validId).val("0");
        alert("Allowed File Extensions : .pdf");
        return false;
    }
    else if (e.files[0].size > 10485760) {
        $(validId).val("0");
        alert("The email signature file is bigger in size. Only file size upto 10 MB is allowed");
        return false;
    }
    else {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(imgId).attr('src', e.target.result);
        }
        reader.readAsDataURL(e.files[0]);
        $(validId).val("1");
        $("#" + lblId).html(e.files[0].name);
    }
}
function FileUploadOnChangeForProfileImage(e) {
    var lblId = "lbl_" + e.id;
    var imgId = "#img_" + e.id;
    var validId = "#valid_" + e.id;
    var extension = e.files[0].name.split('.').pop().toUpperCase();
    if (extension != "JPG" && extension != "JPEG" && extension != "PNG") {
        $(validId).val("0");
        alert("Allowed File Extensions : .jpg, .jpeg, .png");
        return false;
    }
    else if (e.files[0].size > 10485760) {
        $(validId).val("0");
        alert("The user image file is bigger in size. Only file size upto 10 MB is allowed");
        return false;
    }
    else {

        var reader = new FileReader();
        reader.onload = function (e) {
            $(imgId).attr('src', e.target.result);
        }
        reader.readAsDataURL(e.files[0]);
        $(validId).val("1");
        $("#" + lblId).html(e.files[0].name);

        var formdata = new FormData();
        var presentationFile = document.getElementById(e.id);

        if (presentationFile.files.length > 0) {
            {
                formdata.append("UserProfileUpload", presentationFile.files[0]);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/Account/UploadUserImage');
                xhr.send(formdata);
                xhr.onreadystatechange = function () {
                    if (xhr.status == 200 && xhr.readyState == 4) {
                        window.location.reload();
                    }
                }
            }
        }
    }
}
// sends SIP REGISTER (expires=0) to logout
function sipUnRegister() {
    if (typeof oSipStack === 'undefined') {

    }
    else {
        if (oSipStack) {
            oSipStack.stop(); // shutdown all sessions
            btnSendMessage.disabled = true;
        }
    }
}
//resert iframe flag when popup is closed
function RemoveIframe() {
    jQuery.post("/Master/RemoveIframe/", {}, function () { });
}

/*Anti Scroll for side menu*/
function ActiveAntiscroll() {
    $('#side_accordion').on('hidden shown', function () {

    });
    var lastWindowHeight = $(window).height();
    var lastWindowWidth = $(window).width();
    $(window).on("debouncedresize", function () {
        if ($(window).height() != lastWindowHeight || $(window).width() != lastWindowWidth) {
            lastWindowHeight = $(window).height();
            lastWindowWidth = $(window).width();

            if (!is_touch_device()) {
                //$('.sidebar_switch').qtip('hide');
            }
        }
    });

    kcs_sidebar.handleMainMenu();
    kcs_sidebar.handleSubMenu();
}

function is_touch_device() {
    return !!('ontouchstart' in window);
}


kcs_sidebar = {
    handleMainMenu: function () {
        jQuery('.page-sidebar .has-sub > a').click(function () {
            var last = jQuery('.has-sub.open', $('.page-sidebar'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
        });
    },

    handleSubMenu: function () {
        jQuery('.page-sidebar .has1-sub > a').click(function () {
            var last = jQuery('.has1-sub.open', $('.page-sidebar'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
        });
    }
};


kcs_Common = {
    init: function () {
        if (jQuery.browser.mozilla) {
            /* Check Pressed key for numeric value with Space
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  Space,(TAB),(bs)
            */
            jQuery('.numwithspc').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 32) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for numeric value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  (TAB),(bs)
            */
            jQuery('.numwospc').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if ((charCode >= 48 && charCode <= 57) || charCode == 8) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for decimal value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  (TAB),(bs),(dot-decimal notification)
            */
            jQuery('.decimal').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if (charCode == 46 && jQuery(this).val().indexOf('.') != -1) {
                    return false;
                }
                if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 46) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for aphanumeric value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  A To Z
            3)  Space,(cr),(bs)
            */
            jQuery('.alphanumwithspc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 13 || charCode == 32 || charCode == 8) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for aphanumeric value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  A To Z
            3)  (cr),(bs)
            */
            jQuery('.alphanumwospc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 13 || charCode == 8) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });
            /* Check Pressed key for aphabets value with space
            Allowed Characters are :
            1)  A To Z
            2)  Space,(cr),(bs)
            */
            jQuery('.alphawithspc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if ((charCode > 96 && charCode < 123) || (charCode > 64 && charCode < 91) || charCode == 32 || charCode == 13 || charCode == 8) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for aphabets value with space
            Allowed Characters are :
            1)  A To Z
            2)  (cr),(bs)
            */
            jQuery('.alphawospc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.charCode;
                var keyCode = event.keyCode;
                if ((charCode > 96 && charCode < 123) || (charCode > 64 && charCode < 91) || charCode == 13 || charCode == 8) {
                    return true;
                }
                else if (keyCode == 9 || keyCode == 46 || (keyCode > 36 && keyCode < 41) || (keyCode > 34 && keyCode < 37)) {
                    return true;
                }
                return false;
            });

        }
        else {
            /* Check Pressed key for numeric value with Space
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  Space,(TAB),(bs)
            */
            jQuery('.numwithspc').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.charCode;
                if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 32) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for numeric value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  (TAB),(bs)
            */
            jQuery('.numwospc').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode >= 48 && charCode <= 57) || charCode == 8) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for decimal value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  (TAB),(bs),(dot-decimal notification)
            */
            jQuery('.decimal').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.keyCode;
                if (charCode == 46 && jQuery(this).val().indexOf('.') != -1) {
                    return false;
                }
                if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 46) {
                    return true;
                }
                return false;
            });

            /* Check Pressed key for aphanumeric value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  A To Z
            3)  Space,(cr),(bs)
            */
            jQuery('.alphanumwithspc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 13 || charCode == 32 || charCode == 8)
                    return true;
                else
                    return false;
            });

            /* Check Pressed key for aphanumeric value
            Allowed Characters are :
            1)  1,2,3,4,5,6,7,8,9,0
            2)  A To Z
            3)  (cr),(bs)
            */
            jQuery('.alphanumwospc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 13 || charCode == 8)
                    return true;
                else
                    return false;
            });

            /* Check Pressed key for aphabets value with space
            Allowed Characters are :
            1)  A To Z
            2)  Space,(cr),(bs)
            */
            jQuery('.alphawithspc').on('keypress', function (event) {

                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode > 96 && charCode < 123) || (charCode > 64 && charCode < 91) || charCode == 32 || charCode == 13 || charCode == 8)
                    return true;
                else
                    return false;
            });

            /* Check Pressed key for aphabets value with space
            Allowed Characters are :
            1)  A To Z
            2)  (cr),(bs)
            */
            jQuery('.alphawospc').on('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode > 96 && charCode < 123) || (charCode > 64 && charCode < 91) || charCode == 13 || charCode == 8)
                    return true;
                else
                    return false;
            });


        }
    },
    disablePaste: function () {
        jQuery('.numwithspc, .numwospc, .decimal, .alphawithspc, .alphawospc').on('paste', function () {
            return false;
        });
    },
    ActiveBlur: function () {

        jQuery('.required').on('blur', function (event) {
            if (jQuery(this).val().trim() == '') {
                jQuery(this).addClass('empty');
            }
            else {
                jQuery(this).removeClass("empty");
            }
        });

        jQuery('.decimal').each(function () {
            FormatNumber(this, 2);
            jQuery("#" + this.id).on('blur', function (event) {
                FormatNumber(this, 2);//decimal places
            }).on('focus', function (event) {
                RemoveFormatNumber(this);
            });
        });

        jQuery('input:submit').on('click', function () {
            jQuery('.decimal, .numwospc').each(function () {
                RemoveFormatNumber(this);
            });
        });

        jQuery('.numwospc').on('blur', function (event) {
            //FormatNumber(this, 0);//decimal places
        });

        jQuery('.range').on('blur', function (event) {
            if (jQuery(this).val().trim() != '') {
                var min_Value = parseInt(jQuery(this).attr("minvalue").toString());
                var max_Value = parseInt(jQuery(this).attr("maxvalue").toString());
                var entered_Value = parseInt(jQuery(this).val().trim().replace(',', ''));

                if (entered_Value < min_Value || entered_Value > max_Value) {
                    jAlert('Enter Value must be between ' + min_Value + ' and ' + max_Value + '!!', jQuery(this).attr("id").toString());
                    return false;
                }
            }
            return true;
        });

        /* Validate Email Id
        Check Email Id with Regular Expression
        */
        jQuery('.emailid').on('blur', function (event) {
            if (jQuery(this).val().trim() != "") {
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (!filter.test(jQuery(this).val().trim())) {
                    jAlert('Invalid Email Address..', jQuery(this).attr("id").toString());
                    return false;
                }
            }
            return true;
        });

        /* Validate Web URL
        Check Web URL with Regular Expression
        */
        jQuery('.weburl').on('blur', function (event) {
            if (jQuery(this).val().trim() != "") {
                var filter = new RegExp("^((http|https|ftp)\://)*([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&%\$#\=~_\-]+))*$");
                if (!filter.test(jQuery(this).val().trim())) {
                    jAlert('Invalid Email Address..', jQuery(this).attr("id").toString());
                    return false;
                }
            }
            return true;
        });
    },
    ApplyUniform: function () {

        jQuery('input:checkbox, input:radio').uniform();

        jQuery('.chkall').click(function (event) {  //on click 
            if (this.checked) { // check select status
                $('.chkselect').each(function () { //loop through each check box
                    this.checked = true;  //select all check boxes with class "checkbox1"
                    jQuery(this).parent().addClass('checked');
                });
            } else {
                $('.chkselect').each(function () { //loop through each check box
                    this.checked = false; //Deselect all check boxes with class "checkbox1" 
                    jQuery(this).parent().removeClass('checked');
                });
            }
        });

        jQuery('.chkselect').click(function (event) {  //on click
            var total = $('.chkselect').length;
            var count = 0;
            $('.chkselect').each(function () { //loop through each check box
                if (this.checked) {
                    count++;
                }
            });
            if (total == count) {
                $('.chkall').each(function () {
                    this.checked = true; //Deselect all check boxes with class "checkbox1" 
                    jQuery(this).parent().addClass('checked');
                });
            }
            else {
                $('.chkall').each(function () {
                    this.checked = false; //Deselect all check boxes with class "checkbox1" 
                    jQuery(this).parent().removeClass('checked');
                });
            }
        });

        jQuery('.stdtable .chkall').click(function () {
            var parentTable = jQuery(this).parents('table');
            var ch = parentTable.find('tbody input[type=checkbox]');
            if (jQuery(this).is(':checked')) {

                //check all rows in table
                ch.each(function () {
                    jQuery(this).attr('checked', true);
                    jQuery(this).parent().addClass('checked'); //used for the custom checkbox style
                });

                //check both table header and footer
                parentTable.find('.checkall').each(function () { jQuery(this).attr('checked', true); });

            } else {

                //uncheck all rows in table
                ch.each(function () {
                    jQuery(this).attr('checked', false);
                    jQuery(this).parent().removeClass('checked'); //used for the custom checkbox style
                });

                //uncheck both table header and footer
                parentTable.find('.checkall').each(function () { jQuery(this).attr('checked', false); });
            }
        });

    },
    ApplyDatePicker: function () {
        jQuery('.date').each(function () { //loop through each input
            jQuery("#" + this.id).mask('99/99/9999');
            jQuery("#" + this.id).datepicker({ dateFormat: dFormat, changeMonth: true, changeYear: true });
        });

        jQuery('.wdate').each(function () { //loop through each input
            jQuery("#" + this.id).wdatepicker({ format: 'dd/mm/yyyy' });
        });

        /*Validate Date*/
        jQuery('.date').on('blur', function (event) {
            var strChallanDate = '';

            if (jQuery(this).val() != null) {
                strChallanDate = jQuery(this).val().toString();

                if (strChallanDate != '' && strChallanDate != '__/__/____') {
                    if (strChallanDate.length < 10) {
                        jQuery(this).val(''); //jAlert('Valid format dd/MM/yyyy.', jQuery(this).attr("id").toString());
                    }
                    else if (strChallanDate.charAt(2) != '/' || strChallanDate.charAt(5) != '/') {
                        //jAlert('Valid format dd/MM/yyyy.', jQuery(this).attr("id").toString());
                    }
                    else {
                        var year, month, day;
                        if (dFormat == "dd/mm/yy") {
                            year = parseInt(strChallanDate.substring(6, 10).toString());
                            month = parseInt(strChallanDate.substring(3, 5).toString()) - 1; // Months start with 0 in JavaScript - June
                            day = parseInt(strChallanDate.substring(0, 2).toString());
                        }
                        else if (dFormat == "mm/dd/yy") {
                            year = parseInt(strChallanDate.substring(6, 10).toString());
                            month = parseInt(strChallanDate.substring(0, 2).toString()) - 1; // Months because the months start with 0 in JavaScript - June
                            day = parseInt(strChallanDate.substring(3, 5).toString());
                        }
                        var myDate = new Date(year, month, day);
                        if ((myDate.getMonth() != month) || (myDate.getDate() != day) || (myDate.getFullYear() != year) || myDate.getFullYear() < 1753) {
                            //jAlert('Date is invalid.', jQuery(this).attr("id").toString());
                            jQuery(this).val('');
                        }
                    }
                }
            }
        });
    },
    ApplyToolTip: function () {
        /* Tool Tips */
        var gravity = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
        for (var i in gravity)
            $(".tooltip-" + gravity[i]).tipsy({ gravity: gravity[i] });

        jQuery('input:text[title], select[title], textarea[title]').tipsy({ trigger: 'focus', gravity: 'w' });
    },
    ApplyChosen: function () {
        /*Apply Auto complete to drop down list.*/
        $(".chosen").chosen({
            allow_single_deselect: true
        });
    },
    acc_icons: function () {
        var accordions = $('.main_content .accordion');

        accordions.find('.accordion-group').each(function () {
            var acc_active = $(this).find('.accordion-body').filter('.in');
            acc_active.prev('.accordion-heading').find('.accordion-toggle').addClass('acc-in');
        });
        accordions.on('show', function (option) {
            $(this).find('.accordion-toggle').removeClass('acc-in');
            $(option.target).prev('.accordion-heading').find('.accordion-toggle').addClass('acc-in');
        });
        accordions.on('hide', function (option) {
            $(option.target).prev('.accordion-heading').find('.accordion-toggle').removeClass('acc-in');
        });
    },
    AutocompleteText: function (textbox, whichconst, maxlimit, minLength, hdnId) {
        $(textbox).autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: '../Common/GetAutoCompleteData',
                    data: "{strWhichMaster :'" + whichconst + "',strSearchStr : '" + request.term + "',inMaxLimit : '" + maxlimit + "'}",
                    dataType: "json",
                    async: true,
                    success: function (data) {
                        var dataAry = data.toString().split(',');
                        if (dataAry.length > 1) {
                            var cnt = 0;
                            response($.map(data.toString().split(','),
                                function (item) {
                                    cnt = cnt + 1;
                                    return {
                                        label: item.split('|')[0].trim(),
                                        value: item.trim()
                                    }
                                }));
                        }
                        else {
                            response(data);
                        }
                    },
                    error: function (result) {
                    }
                });
            },
            minLength: minLength,
            select: function (event, ui) {
                var dataAry = ui.item.value.toString().split('|');
                if (dataAry.length > 1) {
                    ui.item.value = dataAry[0].toString().trim()
                    $(textbox).val(ui.item.value);
                    var id = hdnId.split("|");
                    $(id[0]).val(dataAry[1].toString().trim());
                    if (dataAry.length > 2 && id.length > 0) {
                        $(id[1]).val(dataAry[2].toString().trim());
                    }
                }
            }
        });
    },
    GridPageSize: 50,
    GridPageArray: [5, 10, 20, 50],
    BindSpecialization: function () {
        var objControlId = '#lgSpecializationId';
        var ddlDropDown = $(objControlId);
        if (ddlDropDown.length > 0) {
            ddlDropDown.empty();
            $.post("/Admin/Common/GetAllSpecialization/",
            {},
                function (data) {
                    ddlDropDown.empty();
                    $.each(data, function (index, Select) {
                        ddlDropDown.append($('<option/>').attr('value', Select.Value).text(Select.Text));
                    });
                });
            jQuery.ajaxSetup({ async: true });
            ddlDropDown.trigger("chosen:updated");
        }
    }
};

kcs_Message = {
    DeleteConfirm: function (objTableName) {
        return 'Are You Sure To Delete ' + objTableName + '?';
    },
    NoRecordToDelete: function (objTableName) {
        return 'Please Select At Least One ' + objTableName + ' To Delete.';
    },
    InputRequired: function (objTableName) {
        return 'Please Enter ' + objTableName + '.';
    },
    SelectRequired: function (objTableName) {
        return 'Please Select ' + objTableName + '.';
    },
    RecordInGridRequired: function (objTableName) {
        return 'Please Enter At Least One ' + objTableName + '.';
    },
    FileUploadSucess: 'File Uploaded Successfully.',
    FileInvalid: 'Invalid File.',
    jAlertTitle: 'MedJoin- Alert',
    jConfirmTitle: 'MedJoin - Confirm',
    jPromptTitle: 'MedJoin - Prompt',
    GridNoDataFound: '<div class="grid-norecords">No Data Found</div>'
};

function CheckBrowser() {
    var browser = get_browser_info();
    //if (browser.name == "Firefox" && browser.version > 39) {
    //    jAlert("Please Use Chrome Or FireFox(V39 or Lower and V29 or Greater) Browser for Better Video Experience.");
    //}
}
function ValidateBrowser(url) {
    var browser = get_browser_info();

    //if (browser.name == "Firefox" && browser.version > 39) {
    //    jAlert("Please Use Chrome Or FireFox(V39 or Lower and V29 or Greater) Browser for Better Video Experience.");
    //    return false;
    //}
    //else {
    //    window.location = url;
    //}

    window.location = url;
}
function get_browser_info() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}
function GetAppointmentNotifications() {
    $("#divNotification").hide();
    $.post("/Account/GetAppointmentNotifications", {},
   function (data) {
       $("#divNotification").html("");
       $("#divNotification").append(data.html);
       if (data.notificationCount != 0) {
           $("#divNotification").show();
           $(".divClose").on("click", function () {
               $("#divNotification").hide();
           });
       }
       else {
           $("#divNotification").hide();
       }
       //ModelInit();
   });
}

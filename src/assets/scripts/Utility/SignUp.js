$(document).ready(function () {
    $("#strFirstName").focus();
    shortcut.add("Ctrl+S", function () {
        $("#btnSignUp").click();
    });
    DisplayMessage('/Home/Index');
    $("#btnSignUp").click(function () {
        if ($('#strFirstName').val().trim() == '') {
            jAlert(kcs_Message.InputRequired('First Name'), 'strFirstName');
            return false;
        }
        if ($('#strLastName').val().trim() == '') {
            jAlert(kcs_Message.InputRequired('Last Name'), 'strLastName');
            return false;
        }

        if ($('#strEmail').val().trim() == '') {
            jAlert(kcs_Message.InputRequired('Email Id'), 'strEmail');
            return false;
        }
        if ($('#lgTimeZoneId').val().trim() == '0') {
            jAlert(kcs_Message.SelectRequired('Time Zone'), 'lgTimeZoneId');
            return false;
        }
        if ($('#strPassword').val().trim() == '') {
            jAlert(kcs_Message.InputRequired('Choose Password'), 'strPassword');
            return false;
        }
        else if ($('#strConfirmPassword').val().trim() == '') {
            jAlert(kcs_Message.InputRequired('Re-enter Password'), 'strConfirmPassword');
            return false;
        }
        if ($('#strPassword').val().trim() != '' && $('#strConfirmPassword').val().trim() != '' && $('#strPassword').val().trim() != $('#strConfirmPassword').val().trim()) {
            jAlert("Choose Password and Re-enter Password must be same.", 'strConfirmPassword');
            return false;
        }

        if ($('#lgCountryId').val().trim() == '') {
            jAlert(kcs_Message.SelectRequired('Country'), 'lgCountryId');
            return false;
        }
        if ($('#strMobileNumber').val().trim() == '') {
            jAlert(kcs_Message.InputRequired('Mobile No'), 'strMobileNumber');
            return false;
        }
        if (!$("#blTermsOfUse").is(':checked')) {
            jAlert("Please Select Terms of Use.")
            return false;
        }
    });
});


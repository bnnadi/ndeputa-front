$(document).ready(function() {

    var errorResponseTemplate = _.template('<div class="g-validation g-validation-alert g-validation-form g-validation-error"><div class="g-validation-icon pull-left"><i class="fa fa-exclamation g-icon g-icon-border"></i></div><div class="g-validation-message"><%= message %></div></div>');
    var errorResponseString;

    $('#password-reset-form-submit').click(function(e) {

        e.preventDefault();

        var $self = $(this);

        var btnText = $self.text();
        var btnLoad = window.STRINGS.GLOBAL_LOADING + '<i class="fa fa-cog fa-spin"></i>';

        $self.html(btnLoad);

        var accountType = $('#password-reset-form-accounttype').val();
        var username = $('#password-reset-form-username').val();

        $.ajax({
            url: '/api/v1/passwordReset.json',
            type: 'POST',
            data: {
                accountType: accountType,
                username: username,
            },
            error: function(jqXHR, textStatus, errorThrown) {

                if (jqXHR.status === 400) {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.PASSWORD_RESET_SERVER_RESPONSE_USERNAME
                    });
                } else if (jqXHR.status === 404) {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.PASSWORD_RESET_SERVER_RESPONSE_ACCOUNT
                    });
                } else {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.PASSWORD_RESET_SERVER_RESPONSE_GENERIC
                    });
                }

                $('.response').html(errorResponseString);

                $self.html(btnText);

            },
            success: function(response) {
                $('#password-reset-forgot-form').slideUp(function() {
                    $('.response').html(window.STRINGS.PASSWORD_RESET_START_SUCCESS);
                });
            }
        });
    });

    $('#password-verify-form-submit').click(function(e) {

        e.preventDefault();

        var $self = $(this);

        var btnText = $self.text();
        var btnLoad = window.STRINGS.GLOBAL_LOADING + '<i class="fa fa-cog fa-spin"></i>';

        $self.html(btnLoad);

        var username = $('#password-verify-form-username').val();
        var code = $('#password-verify-form-code').val();
        var password = $('#password-verify-form-password').val();
        var passwordConfirm = $('#password-verify-form-password-confirm').val();

        if (password !== passwordConfirm) {
            $('.response').html('<div class="alert alert-danger">Password Do Not Match</div>');
            return;
        }

        $.ajax({
            url: '/api/v1/passwordVerify.json',
            type: 'PUT',
            data: {
                username: username,
                code: code,
                password: password
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 400) {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.PASSWORD_RESET_SERVER_RESPONSE_INPUT
                    });
                } else if (jqXHR.status === 404) {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.PASSWORD_RESET_SERVER_RESPONSE_ACCOUNT
                    });
                } else {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.PASSWORD_RESET_SERVER_RESPONSE_GENERIC
                    });
                }

                $('.response').html(errorResponseString);

                $self.html(btnText);
            },
            success: function(response) {
                $('#password-verify-form').slideUp(function() {
                    $('.response').html(window.STRINGS.PASSWORD_RESET_START_SUCCESS);
                });
            }
        });
    });

    $('#password-reset-form-username').keypress(function(e) {
        if (e.which == 13) {
            $('#password-reset-form-submit').trigger('click');
        }
    });

    $('#password-reset-form-password, #password-reset-form-confirm-password').keypress(function(e) {
        if (e.which == 13) {
            $('#password-verify-form-submit').trigger('click');
        }
    });

});
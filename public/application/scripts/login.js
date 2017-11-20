$(document).ready(function() {

    var errorResponseTemplate = _.template('<div class="g-validation g-validation-alert g-validation-form g-validation-error"><div class="g-validation-icon pull-left"><i class="fa fa-exclamation g-icon g-icon-border"></i></div><div class="g-validation-message"><%= message %></div></div>');
    var errorResponseString;

    $('#login-form-submit').click(function(e) {

        e.preventDefault();

        var $self = $(this);

        var btnText = $self.text();
        var btnLoad = window.STRINGS.GLOBAL_LOADING + '<i class="fa fa-cog fa-spin"></i>';

        $self.html(btnLoad);

        var username = $('#login-form-username').val();
        var password = $('#login-form-password').val();

        if (username.length < 1) {
            errorResponseString = errorResponseTemplate({ message: window.STRINGS.GLOBAL_LOADING });
            $('.response').html(errorResponseString);
            $self.html(btnText);
            return;
        }

        if (password.length < 8) {
            errorResponseString = errorResponseTemplate({ message: window.STRINGS.GLOBAL_LOADING });
            $('.response').html(errorResponseString);
            $self.html(btnText);
            return;
        }

        $.ajax({
            url: '/api/v1/user/login.json',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 400) {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.LOGIN_SERVER_RESPONSE_USERNAME_PASSWORD
                    });
                } else if (jqXHR.status === 404) {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.LOGIN_SERVER_RESPONSE_ACCOUNT
                    });
                } else {
                    errorResponseString = errorResponseTemplate({
                        message: window.STRINGS.LOGIN_SERVER_RESPONSE_GENRIC
                    });

                    $('.response').html(errorResponseString);

                    $self.html(btnText);
                }
            },
            success: function(response) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', response.user);
                $self.html(window.STRINGS.GLOBAL_REDIRECTING + '<i class="fa fa-cog fa-spin"></i>');

                window.location.href = '/';
            }
        });

    });

    $('#login-form-username, #login-form-password').keypress(function(e) {
        if (e.which == 13) {
            $('#login-form-submit').trigger('click');
        }
    });
});
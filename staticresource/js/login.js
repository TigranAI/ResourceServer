let username = $('#username')
let password = $('#password')
let signin = $('#signin')
let signup = $('#signup')
let message = $('#message')

signin.on('click', login)
signup.on('click', register)

function login() {
    authorize('/authorize/login')
}

function register() {
    authorize('/authorize/register')
}

function authorize(url) {
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify({username: username.val(), password: password.val()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: (data, textStatus, jqXHR) => {
            setCookie('jwt', data, 1)
            let path = window.location.pathname;
            window.location = path === '/auth' ? '/profile' : path
        },
        error: (jqXHR, textStatus, error) => {
            message.text(jqXHR.responseText)
            message.addClass('text-danger')
        }
    })
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
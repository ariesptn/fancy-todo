let token = localStorage.getItem('token')
let baseUrl = 'http://localhost:3000'
let spinner = `
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>`

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    token = ''
    loginVerify()
}

function login() {
    $.ajax({
        url: `${baseUrl}/api/users/login`,
        method: 'POST',
        data: {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }
    })
        .done(response => {
            localStorage.setItem('token', response.token)
            token = localStorage.getItem('token')
            loginVerify()
        })
        .fail(response => {
            showError(response)
        })
}

function register() {
    $.ajax({
        url: `${baseUrl}/api/users/register`,
        method: 'POST',
        data: {
            name: $('#registerName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()
        }
    })
        .done(response => {
            localStorage.setItem('token', response.token)
            token = localStorage.getItem('token')
            loginVerify()
        })
        .fail(response => {
            showError(response)
        })
}

function loginVerify() {
    $.ajax({
        url: `${baseUrl}/api/users/loginverify`,
        headers: { token }
    })
        .done(response => {
            $('#contents').show()
            $('#loginRegister').hide()
            $('#username').text(response.name)
            $('#email').text(response.email)
            getTodoList()
        })
        .fail(response => {
            $('#contents').hide()
            $('#loginRegister').show()
            localStorage.removeItem('token')
            token = ''
        })
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    //let profile = auth2.currentUser.get().getBasicProfile();
    /*console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('Token: ' + googleUser.getAuthResponse().id_token)*/
    $.ajax({
        url: `${baseUrl}/api/googleloginverify`,
        headers: {
            'googletoken': googleUser.getAuthResponse().id_token
        }
    })
        .done(response => {
            if (!localStorage.getItem('token')) {
                localStorage.setItem('token', response.token)
                token = localStorage.getItem('token')
                loginVerify()
            }
        })
        .fail(response => {
            showError(response)
        })
}

function showError(err) {
    $('#errorMessage').text(JSON.stringify(err))
    $('#errorMessage').show()
    setTimeout(() => {
        $('#errorMessage').hide()
    }, 10000)
    console.log(response)
}

$('#contents').hide()
$('#errorMessage').hide()
$('#todoForm').hide()
$('#projectForm').hide()
$('#projectFrame').hide()

$('#todoCancel').on('click', function () {
    $('#todoForm').hide()
})

$('#projectCancel').on('click', function () {
    $('#projectForm').hide()
})

$('#createPersonalTodo').on('click', function () {
    showCreateTodoForm()
})

$('#createProject').on('click', function () {
    showCreateProjectForm()
})

$('#getPersonalTodo').on('click', function () {
    getTodoList()
})

$('#getProjectList').on('click', function () {
    getProjectList()
})

$('#registerForm').show()
$('#loginForm').show()

$('#loginSubmit').on('click', function () {
    login()
})
$('#registerSubmit').on('click', function () {
    register()
})


loginVerify()

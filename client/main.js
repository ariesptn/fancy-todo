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
    $('#loginInfo').hide()
    $('#loginButton').show()
    $('#contents').hide()
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
            localStorage.setItem('token', response.token)
            token = localStorage.getItem('token')
            $('#username').text(profile.getName())
            $('#email').text(profile.getEmail())
            $('#loginInfo').show()
            $('#loginButton').hide()
            $('#contents').show()
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

function getPersonalTodoList() {
    $('#todoList').html(spinner)
    $('#todoForm').hide()
    $.ajax({ url: `${baseUrl}/api/todos`, headers: { token } })
        .done(response => {
            showTodoList(response)
        })
        .fail(response => {
            showError(response)
        })
}

function showTodoList(data) {
    let html = ''
    data.forEach((e, i) => {
        html += `
            <li class="list-group-item" id="todo-${i}">
            <p><strong>Name</strong> : ${e.name}</p>
            <p><strong>Description</strong> : ${e.description}</p>
            <p><strong>Due date</strong> : ${e.dueDate}</p>
            <p><strong>Status</strong> : ${e.status}</p>
            <p><button class="btn" id="editTodo-${i}">Edit</button>
            <button class="btn" id="deleteTodo-${i}">Delete</button></p>
            </li>
            `
    })
    $('#todoList').html(html)
    data.forEach((e, i) => {
        $(`#editTodo-${i}`).off('click')
        $(`#editTodo-${i}`).on('click', function () {
            $('#todoName').val(e.name)
            $('#todoDescription').val(e.description)
            $('#todoDueDate').val(e.dueDate)
            $('#todoStatusUnfinished').prop('checked', e.status == 'unfinished')
            $('#todoStatusFinished').prop('checked', e.status == 'finished')
            $('#todoForm').show()
            $('#todoSubmit').off('click')
            $('#todoSubmit').on('click', function () {
                $.ajax({
                    url: `${baseUrl}/api/todos/${e._id}`,
                    method: 'PUT',
                    headers: { token },
                    data: {
                        name: $('#todoName').val(),
                        description: $('#todoDescription').val(),
                        dueDate: $('#todoDueDate').val(),
                        status: $('#todoForm input[name=todoStatus]:checked').val(),
                    }
                })
                    .done(response => {
                        getPersonalTodoList()
                    })
                    .fail(response => {
                        showError(response)
                    })
            })
        })
        $(`#deleteTodo-${i}`).off('click')
        $(`#deleteTodo-${i}`).on('click', function () {
            $.ajax({
                url: `${baseUrl}/api/todos/${e._id}`,
                method: 'DELETE',
                headers: { token },
            })
                .done(response => {
                    getPersonalTodoList()
                })
                .fail(response => {
                    showError(response)
                })

        })
    })
}

function showCreatePersonalTodoForm() {
    $('#todoName').val('')
    $('#todoDescription').val('')
    $('#todoDueDate').val('')
    $('#todoStatusUnfinished').prop('checked', true)
    $('#todoForm').show()
    $('#todoSubmit').off('click')
    $('#todoSubmit').on('click', function () {
        $.ajax({
            url: `${baseUrl}/api/todos`,
            method: 'POST',
            headers: { token },
            data: {
                name: $('#todoName').val(),
                description: $('#todoDescription').val(),
                dueDate: $('#todoDueDate').val(),
                status: $('#todoForm input[name=todoStatus]:checked').val(),
            }
        })
            .done(response => {
                getPersonalTodoList()
            })
            .fail(response => {
                showError(response)
            })
    })
}


$('#errorMessage').hide()
$('#todoForm').hide()

$('#todoCancel').on('click', function () {
    $('#todoForm').hide()
})

$('#createPersonalTodo').on('click', function () {
    showCreatePersonalTodoForm()
})

$('#getPersonalTodo').on('click', function () {
    getPersonalTodoList()
})

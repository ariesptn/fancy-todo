function getTodoList(projectData) {
    $('#todoList').html(spinner)
    $('#todoForm').hide()
    $('#projectFrame').hide()
    let url = `${baseUrl}`
    if (!projectData) {
        url += `/api/todos`
        $('#todoTitle').text('Your todos')
    } else {
        url += `/api/todos/project/${projectData._id}`
        $('#todoTitle').text(`Project todos : ${projectData.name}`)
    }
    $.ajax({ url, headers: { token } })
        .done(response => {
            showTodoList(response, projectData)
        })
        .fail(response => {
            showError(response)
        })
}

function showTodoList(todoData, projectData) {
    let html = ''
    todoData.forEach((e, i) => {
        html += `
            <li class="list-group-item" id="todo-${i}">
            <p><strong>Name</strong> : ${e.name}</p>
            <p><strong>Description</strong> : ${e.description}</p>
            <p><strong>Due date</strong> : ${e.dueDate}</p>
            <p><strong>Status</strong> : ${e.status}</p>
            <p><button class="btn btn-primary" id="editTodo-${i}">Edit</button>
            <button class="btn btn-primary" id="deleteTodo-${i}">Delete</button></p>
            </li>
            `
    })
    $('#todoList').html(html)
    todoData.forEach((e, i) => {
        $(`#editTodo-${i}`).off('click')
        $(`#editTodo-${i}`).on('click', function () {
            $('#todoFormTitle').text(`Edit todo : ${e.name}`)
            $('#todoName').val(e.name)
            $('#todoDescription').val(e.description)
            $("#todoDueDate").val(new Date(e.dueDate).toISOString().split('T')[0])
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
                        getTodoList(projectData)
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
                    getTodoList(projectData)
                })
                .fail(response => {
                    showError(response)
                })

        })
    })
}

function showCreateTodoForm(projectData) {
    $('#todoForm').show()
    $('#todoFormTitle').text(`New todo`)
    $('#todoName').val('')
    $('#todoDescription').val('')
    $("#todoDueDate").val(new Date().toISOString().split('T')[0])
    $('#todoStatusUnfinished').prop('checked', true)
    $('#todoSubmit').off('click')
    let url = `${baseUrl}`
    if (!projectData) {
        url += `/api/todos`
    } else {
        url += `/api/todos/project/${projectData._id}`
    }
    $('#todoSubmit').on('click', function () {
        $.ajax({
            url,
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
                getTodoList(projectData)
            })
            .fail(response => {
                showError(response)
            })
    })
}


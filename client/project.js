function getProjectList() {
    $('#projectList').html(spinner)
    $('#projectForm').hide()
    $('#projectFrame').show()
    $.ajax({
        url: `${baseUrl}/api/projects`,
        headers: { token }
    })
        .done(response => {
            showProjectList(response)
        })
        .fail(response => {
            showError(response)
        })
}

function showProjectList(data) {
    let html = ''
    data.forEach((e, i) => {
        html += `
            <li class="list-group-item" id="todo-${i}">
            <p><strong>Name</strong> : ${e.name}</p>
            <p><strong>Description</strong> : ${e.description}</p>
            <p><button class="btn btn-primary" id="getProjectTodo-${i}">Show todos</button>
            <button class="btn btn-primary" id="createProjectTodo-${i}">Create a todo</button>
            <button class="btn btn-primary" id="editProject-${i}">Edit</button>
            <button class="btn btn-primary" id="deleteProject-${i}">Delete</button>
            </p>
            </li>
            `
    })
    $('#projectList').html(html)
    data.forEach((e, i) => {
        $(`#editProject-${i}`).off('click')
        $(`#editProject-${i}`).on('click', function () {
            $('#projectFormTitle').text(`Edit project : ${e.name}`)
            $('#projectName').val(e.name)
            $('#projectDescription').val(e.description)
            $('#projectForm').show()
            let memberHtml = ''
            e.members.forEach((member, memberIndex) => {
                memberHtml += `
                    <div>
                    ${member.name} (${member.email})
                    <button class="btn btn-primary" id="removeMember-${memberIndex}">x</button>
                    </div>
                    `
            })
            $('#projectMemberList').html(memberHtml)
            $('#projectMembers').show()
            e.members.forEach((member, memberIndex) => {
                $(`#removeMember-${memberIndex}`).off('click')
                $(`#removeMember-${memberIndex}`).on('click', function () {
                    $.ajax({
                        url: `${baseUrl}/api/projects/member/${e._id}/${member._id}`,
                        method: 'DELETE',
                        headers: { token },
                    })
                        .done(response => {
                            getProjectList()
                        })
                        .fail(response => {
                            showError(response)
                        })
                })
            })
            $('#projectSubmit').off('click')
            $('#projectSubmit').on('click', function () {
                $.ajax({
                    url: `${baseUrl}/api/projects/${e._id}`,
                    method: 'PUT',
                    headers: { token },
                    data: {
                        name: $('#projectName').val(),
                        description: $('#projectDescription').val(),
                    }
                })
                    .done(response => {
                        getProjectList()
                    })
                    .fail(response => {
                        showError(response)
                    })
            })
        })
        $(`#deleteProject-${i}`).off('click')
        $(`#deleteProject-${i}`).on('click', function () {
            $.ajax({
                url: `${baseUrl}/api/projects/${e._id}`,
                method: 'DELETE',
                headers: { token },
            })
                .done(response => {
                    getProjectList()
                })
                .fail(response => {
                    showError(response)
                })
        })
        $(`#createProjectTodo-${i}`).off('click')
        $(`#createProjectTodo-${i}`).on('click', function () {
            showCreateTodoForm(e)
        })
        $(`#getProjectTodo-${i}`).off('click')
        $(`#getProjectTodo-${i}`).on('click', function () {
            getTodoList(e)
        })
        $(`#projectAddMember`).off('click')
        $(`#projectAddMember`).on('click', function () {
            let email = $('#projectMemberEmail').val()
            $.ajax({
                url: `${baseUrl}/api/projects/member/${e._id}/${email}`,
                method: 'POST',
                headers: { token }
            })
                .done(response => {
                    getProjectList()
                })
                .fail(response => {
                    showError(response)
                })
        })
    })
}

function showCreateProjectForm() {
    $('#projectForm').show()
    $('#projectFrame').show()
    $('#projectFormTitle').text(`New project`)
    $('#projectName').val('')
    $('#projectDescription').val('')
    $('#projectMembers').hide()
    $('#projectSubmit').off('click')
    $('#projectSubmit').on('click', function () {
        $.ajax({
            url: `${baseUrl}/api/projects`,
            method: 'POST',
            headers: { token },
            data: {
                name: $('#projectName').val(),
                description: $('#projectDescription').val()
            }
        })
            .done(response => {
                getProjectList()
            })
            .fail(response => {
                showError(response)
            })
    })
}


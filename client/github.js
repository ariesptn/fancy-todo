let baseUrl = 'http://localhost:3000'
let repoData = []
let orgData = []

function showRepo(username) {
    $('#repolist').text('Please wait...')
    let searchCategory = $('input[name=searchCategory]:checked', '#userRadio').val()
    $.ajax({
        url: `${baseUrl}/api/${searchCategory}/${username}`,
        headers: { 'token': localStorage.getItem('token') }
    })
        .done(response => {
            repoData = response
            searchRepo()
        })
        .fail(response => {
            showError(response)
            $('#repolist').text('An error has occurred.')
            console.log(response)
        })
}

function searchRepo() {
    let repolist = ''
    let search = $('#repoSearch').val()
    let filteredRepos = repoData.filter(e => {
        let full_name = e.full_name || ''
        let description = e.description || ''
        return full_name.includes(search) || description.includes(search)
    })
    filteredRepos.forEach((v, i) => {
        repolist += `
            <a href="#" onclick="showDetails('${v.full_name}')">${v.full_name}</a><br>
            ${v.description || 'no description'}<br>
            <a href="${v.html_url}">Github page</a><br><br>
            `
    })
    $('#repolist').html(repolist)
}

function showDetails(full_name) {
    $('#details').text('Please wait...')
    $.ajax({
        url: `${baseUrl}/api/readme/${full_name}`,
        headers: { 'token': localStorage.getItem('token') }
    })
        .done(response => {
            $('#details').html(response)
        })
        .fail(response => {
            showError(response)
            $('#details').text('An error has occurred.')
            console.log(response)
        })
}

function showError(error) {
    $('#error').show()
    $('#error').text(`${JSON.stringify(error)}`)
    setTimeout(() => {
        $('#error').hide()
    }, 10000)
}

function createRepo() {
    let name = $('#createRepoName').val()
    let data = {
        "name": name,
        "description": "",
        "homepage": "",
        "private": true,
        "has_issues": true,
        "has_projects": true,
        "has_wiki": true
    }
    $.ajax({
        type: "POST",
        url: `${baseUrl}/api/repos/create`,
        data,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(response => {
            showError({ message: `Repo ${name} was created successfully` })
        })
        .fail(response => {
            showError(response)
            console.log(response)
        })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
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
            $('#username').text(profile.getName())
            $('#email').text(profile.getEmail())
            $('#loginInfo').show()
            $('#loginButton').hide()
            $('#contents').show()
            showUsers()
        })
        .fail(response => {
            showError(response)
            console.log(response)
        })

}

function showUsers() {
    $.ajax({
        url: `${baseUrl}/api/orgs/members/active-fox-2018`,
        headers: { 'token': localStorage.getItem('token') }
    })
        .done(response => {
            orgData = response
            let userList = ''
            orgData.forEach((v, i) => {
                userList += `<li><a href="#" onclick="showRepo('${v.login}')">${v.login}</a></li>`
            })
            $('#userList').html(userList)
        })
        .fail(response => {
            showError(response)
            console.log(response)
        })
}

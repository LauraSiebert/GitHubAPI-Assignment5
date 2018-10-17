'use strict';

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    return responseJson.items.forEach(item => {
        let login = item.login;
        $('#results-list').append(
            `<li><strong>Username:</strong> ${login} <br>
            <strong>Repository Location:</strong> <a href="http://www.github.com/${login}?tab=repositories" target="_blank">http://www.github.com/${login}?tab=repositories</a><br>
            <ul class="sublist">Repository Contents:
                <li></li>
            </li>`
        );
        getRepo(login);
    })
};

function getUsers(userSearch) {
    console.log(`User searched for '${userSearch}'. Function getUser ran.`)
    fetch(`https://api.github.com/search/users?q=${userSearch}`)
      .then(response => response.json())
      .then(userResults => 
        displayResults(userResults))
      .catch(error => alert(`Something went wrong when getting USERS. Please try again.`));
}

function getRepo(login) {
    console.log(`Getting repository list.`)
    fetch(`https://api.github.com/users/${login}/repos`)
      .then(response => response.json())
      .then(userRepos =>
        userRepos.forEach(item => {
            $('.sublist').append(
                `<li><a href="http://www.github.com/${login}/${item.name}" target="_blank">${item.name}</a></li>`
            )
        })
        )
      .catch(error => alert(`Something went wrong when getting REPOS. Please try again.`));
}   

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userSearch = $('#js-search-term').val();
    getUsers(userSearch);
  });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
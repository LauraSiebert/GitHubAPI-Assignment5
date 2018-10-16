'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  $('#results').removeClass('hidden');
  return responseJson.items.forEach(item => {
    $('#results-list').append(
        `<li><strong>Username:</strong> ${item.login} <br>
        <strong>Repository Location:</strong> <a href="http://www.github.com/${item.login}?tab=repositories" target="_blank">http://www.github.com/${item.login}?tab=repositories</a><br>
        <ul class="sublist">Repository Contents:
            <li></li>
        </li>`
    );
  })
};

function getUser(userSearch) {
    console.log(`User searched for '${userSearch}'. Function getUser ran.`)
    fetch(`https://api.github.com/search/users?q=${userSearch}`)
      .then(response => response.json())
      .then(responseJson => 
        displayResults(responseJson))
      .catch(error => alert(`Something went wrong. Please try again.`));
}

function getRepo(responseJson) {
    console.log(`Function getRepo ran.`)
    fetch(`https://api.github.com/users/${responseJson.items.login}/repos`)
      .then(response => response.json())
      .then(responseJson1 => 
        displayResults(responseJson1))
      .catch(error => alert(`Something went wrong. Please try again.`));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userSearch = $('#js-search-term').val();
    getUser(userSearch);
  });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
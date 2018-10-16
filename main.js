'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  $('#results').removeClass('hidden');
  return responseJson.items.forEach(item => {
    $('#results-list').append(
        `<li><strong>Username:</strong> ${item.login} <br>
        <strong>Repository Location:</strong> <a href="${item.repos_url}" target="_blank">${item.repos_url}</a>
        <ul>Repository Contents:
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
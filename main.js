// adds and event listener for "submit" and executes a function
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// Saves the values of the inputs to variables
function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

// Saves the variables into an object
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

// Checks if local storage is null
  if(localStorage.getItem('issues') == null) {
    var issues = [];

    // pushes the issue object into local storage
    issues.push(issue);

    //stringifys the issue
    localStorage.setItem('issues', JSON.stringify(issues))

    // If something exits in local stoage then...
  } else {

    // Parse the issues
    var issues = JSON.parse(localStorage.getItem('issues'));

    // Push the issues again
    issues.push(issue)

    // Convert them back to JSON
    localStorage.setItem('issues', JSON.stringify(issues))
  }

  // Resets the form on submit
  document.getElementById('issueInputForm').reset();

// Runs the function every time the form submits
  fetchIssues()

// Prevents form defualt action
  e.preventDefault()
}

// When the close button is clicked then...
function setStatusClosed(id) {
  // Parse the issues
  var issues = JSON.parse(localStorage.getItem('issues'));

// loops through the issues by using the id
  for(var i = 0; i < issues.length; i++) {

    // If the id matches then..
    if (issues[i].id == id) {

      // Change the status to closed
      issues[i].status = 'Closed';
    }
  }

  // Set the items back to JSON
  localStorage.setItem('issues', JSON.stringify(issues));

// Runs the function every time the form submits
  fetchIssues()
}

//  When the delete button is clicked then...
function deleteIssue(id) {
  // Parse the issues
  var issues = JSON.parse(localStorage.getItem('issues'));

// loops through the issues by using the id
  for(var i = 0; i < issues.length; i++) {
    // If the id matches then..
    if (issues[i].id == id) {

      // Splice the post out by using the index
      issues.splice(i, 1);
    }
  }
  //Set the items back to JSON
  localStorage.setItem('issues', JSON.stringify(issues));

  // Runs the function every time the form submits
  fetchIssues()
}
// Allow a new issue to be posted
function fetchIssues() {
  // Parses all the issues
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList');

// Rests the input values
  issuesList.innerHTML = '';

// Loops through the variables
  for (var i = 0; i < issues.length; i++) {

    // Variables decalred
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    // Changes the inner html and uses the varaibels above to create the post
    issuesList.innerHTML += '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}

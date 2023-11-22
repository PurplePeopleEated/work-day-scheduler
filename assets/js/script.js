// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Add event listener for clicks on save buttons
  $('.saveBtn').on('click', function(event) {
    // Prevent default behavior/event bubbling
    event.preventDefault();
    // Pull ID from parent element 
    const timeBlockID = $(this).closest('.time-block').attr('id');
    console.log(timeBlockID);
    // Save user input with time block id to local storage
    const userInput = $(this).siblings('.description').val();
    localStorage.setItem(timeBlockID, userInput);
  });

  function displayCurrentTime() {
    // Get current time using day.js
    const now = dayjs().format('MMM D, YYYY');
    $('#currentDay').text(now);
  }

  $('.time-block').each(function() {
    let currentHour = dayjs().hour();
    // Extract numbers from id attribute of each time-block
    let blockHour = $(this).attr('id').replace(/[^\d]/g, '');
    // Compare the current hour to the time-block hour and display
    // past, present, or future
    if (currentHour > blockHour) {
      $(this).addClass('future');
    } else if (currentHour < blockHour) {
      $(this).addClass('past');
    } else {
      $(this).addClass('present');
    }
  });

  // Retrieve localStorage info and display
  $('.time-block').each(function() {
    let timeID = $(this).attr('id');
    let savedData = localStorage.getItem(timeID);

    if (savedData) {
      $(this).find('.description').val(savedData);
    }
  });

  displayCurrentTime();
});

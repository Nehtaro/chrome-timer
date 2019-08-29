// Event Listen form submission
// Store form field values into variables
// Pass values into chrome.storage

function addNewTimer() {
  let timerTitle = document.getElementById('title');
  let timerDescription = document.getElementById('description');
  let timerDatetime = document.getElementById('datetime');
  chrome.storage.sync.set({ title: timerTitle }, () => {
    console.log(`New title: ${timerTitle}`);
  });
  chrome.storage.sync.set({ description: timerDescription }, () => {
    console.log(`New description: ${timerDescription}`);
  });
  chrome.storage.sync.set({ datetime: timerDatetime }, () => {
    console.log(`New datetime: ${timerDatetime}`);
  });
}

const form = document.getElementById('form');
form.addEventListener('submit', addNewTimer());

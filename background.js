chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'var matches = document.documentElement.innerHTML.match(/(\\d{4}-\\d{2}-\\d{2})(?!T)/g); matches && matches.length > 0 ? matches[0] : null;'
  }, function(result) {
    var date = result[0];
    var domain = tab.title;
    if (date) {
      var textToCopy = 'WHOIS ENRICHMENT: ' + domain + '\nDate Registered: ' + date;
      var textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log('Date copied to clipboard: ' + date);
      showAlert('Registration Date Copied to Clipboard', 'The enrichment for ' + domain + ' determined the domain was registered on ' + date);
    } else {
      console.log('No date in the format "YYYY-MM-DD" found on the webpage.');
      showAlert('Date Not Found', 'No date in the format "YYYY-MM-DD" found on the webpage.');
    }
  });
});

function showAlert(title, message) {
  alert(title + '\n\n' + message);
}



chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var urls = request.source.split(';');

    for (index = 0; index < urls.length; index++) {
      var u = urls[index];

      $('#links').append('<a href="' + u + '">' + u + '</a>');

      //chrome.downloads.download({
      //  url: u
      //});
    }


    message.innerText = request.source;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;



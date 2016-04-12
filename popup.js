chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var urls = request.source.split(';');

    for (index = 0; index < urls.length; index++) {
      var u = urls[index];

      var last = u.lastIndexOf('/') + 1;
      var name = u.substring(last);

      if (u.length > 0 & name.length > 0) {
          $('#links').append($('<tr><td><img src="download16.png" class="mydownload" data-link="' + u + '" title="Download this story"></img></td><td><a href="' + u + '">' + name + '</a></td></tr>'));
      }

      //chrome.downloads.download({
      //  url: u
      //});
    }

    $('.mydownload').on('click', function (e) {
        var source = $(e.target); // 'img' tag that was clicked
        var u = source.data('link');
        //alert('hi ' + u);

        chrome.downloads.download({
          url: u
        });

    });

    message.innerText = 'Click icon to download...';
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



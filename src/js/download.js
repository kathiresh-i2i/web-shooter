//Do Download Stuff Here
var params = {};

if (location.search) {
  var parts = location.search.substring(1).split('&');

  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}

function passToFFmpegv2(json, consoleMessage, video, nameOfVideo) {

  nameOfVideo = decodeURIComponent(nameOfVideo).split(' ').join('_');
  //var videoArrayBuffer=dataURLtoBlob(video);
  fetch(video)
    .then((res) => res.arrayBuffer())
    .then((buf) => {
      var videoDownloadSuccess = new Promise(
        function (resolve, reject) {
          try {
            mergeAndDownload(nameOfVideo, buf, json, consoleMessage);
            return resolve();
          }
          catch (e) {
            return reject();
          }
        }
      );
      videoDownloadSuccess.then(function () {
        setTimeout(function () {
          window.close();
        }, 1000);
      })
        .catch(function () {
          document.querySelector('#error').innerHTML = '<b>Oops.. Something Went Wrong.. Trying manual download using ffmpeg</b>';
          chrome.tabs.create({ url: 'download_manual.html?localStorageId=' + params.localStorageId });
        })

      //window.close();

    });

}

onload = async function () {
  if (params.localStorageId) {
    var videoName = params.localStorageId;
    chrome.storage.local.get(videoName, function (result) {
      passToFFmpegv2(result[videoName].json, result[videoName].video, result[videoName].friendlyName);
    });
  }
  if (params.mp4 && params.json) {
    var networkRequest;
    networkRequest = await fetch(params.json)
      .then((res) => res.text())
      .then((json) => {
        return json
      });

    var consoleMessages =
    await fetch(params.console)
      .then((res) => res.text())
      .then((json) => {
        return json;
      });
    passToFFmpegv2(networkRequest, consoleMessages, params.mp4, params.customname);
  }
  if (params.vidobjurl && params.vidFileName) {
    downloadVid(params.vidobjurl, params.vidFileName);
  }
}
function downloadVid(url, name) {
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    window.close();
  }, 1000);
}
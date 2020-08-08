function passToFFmpegv2(json, consoleMessage, browserInfo, video, nameOfVideo) {
  nameOfVideo = decodeURIComponent(nameOfVideo).split(' ').join('_');
  fetch(video)
    .then(function (res) {
      return res.arrayBuffer()
    })
    .then(function (buf) {
      var videoDownloadSuccess = new Promise(
        function (resolve, reject) {
          try {
            mergeAndDownload(nameOfVideo, buf, json, consoleMessage, browserInfo);
            return resolve();
          }
          catch (e) {
            return reject();
          }
        }
      );
    });
}
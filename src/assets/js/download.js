function passToFFmpegv2(json, consoleMessage, browserInfo, video, nameOfVideo, isUploadToServer) {
  nameOfVideo = decodeURIComponent(nameOfVideo).split(' ').join('_');
  fetch(video)
    .then(function (res) {
      return res.arrayBuffer()
    })
    .then(function (buf) {
      var videoDownloadSuccess = new Promise(
        function (resolve, reject) {
          try {
            mergeAndDownload(nameOfVideo, buf, json, consoleMessage, browserInfo, isUploadToServer);
            return resolve();
          }
          catch (e) {
            return reject();
          }
        }
      );
    });
}
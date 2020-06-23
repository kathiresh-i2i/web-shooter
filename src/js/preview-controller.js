angular.module('webshooter').controller('PreviewController', [
  '$scope',
  '$location',
  '$http',
  function ($scope, $location, $http) {
    'use strict';
    var params = {};
    $scope.consoleLogs;
    $scope.network;

    var init = function () {
      if (location.search) {
        var parts = location.search.substring(1).split('&');
        for (var i = 0; i < parts.length; i++) {
          var nv = parts[i].split('=');
          if (!nv[0]) continue;
          params[nv[0]] = nv[1] || true;
        }
      }
      $scope.videoSrc = params.mp4;

      fetch(params.console)
        .then((res) => res.json())
        .then((json) => {
          if (json.length) {
            $scope.consoleLogs = json;
            console.log('====console==', json);
            
            var wrapper = document.getElementById("console");
            var tree = jsonTree.create($scope.consoleLogs, wrapper);
            tree.expand();
            tree.expand(function (node) {
              return node.childNodes.length < 2;
            });
          }
        });


      fetch(params.json)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            $scope.network = json;
            console.log('====network==', json);
            var wrapper = document.getElementById("network");
            var tree = jsonTree.create(json, wrapper);
            tree.expand();
            tree.expand(function (node) {
              return node.childNodes.length < 2;
            });
          }
        });

    };


    var videoEle = {};
    var currentTime = 0
    videoEle = document.querySelector('video')
    videoEle.ontimeupdate = function () {
      currentTime = 0
      showRequest();
    }

    var matchedReq;
    function showRequest() {
      matchedReq = '';
      // currentTime = videoEle.currentTime;
      // $scope.network.forEach(function (network) {
      //   if (network.requesttime <= videoEle.currentTime) {
      //     if ((network.requesttime > currentTime) || currentTime === 0) {
      //       if (matchedReq !== network.requestid) {
      //         currentTime = network.requesttime;
      //         matchedReq = network.requestid;
      //       }
      //     }
      //   }
      // });
    }
    videoEle.onseeked = (event) => {
      currentTime = 0;
      showRequest();
    };

    videoEle.onseeking = (event) => {
      console.log('===============Video is seeking a new position==========');
    };

  
    init();

    $scope.downloadVideo = function () {
      chrome.tabs.create({ url: 'download.html?mp4=' + params.mp4 + '&json=' + params.json + '&console=' + params.console + '&customname=' + 'kkkk' });
    }


  },
]);

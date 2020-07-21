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
          console.log('=========params', params);
          
        }
      }
      $scope.videoSrc = params.mp4;

      console.log('===params.json', params.json);

      fetch(params.console)
        .then((res) => res.json())
        .then((json) => {
          if (json.length) {
            $scope.consoleLogs = json;
            console.log('====console==', JSON.stringify(json));

            var wrapper = document.getElementById("console");
            var tree = jsonTree.create($scope.consoleLogs, wrapper);
            tree.expand();
            tree.expand(function (node) {
              return node.childNodes.length < 2;
            });
          }
        });

      var data = [{ "dateTime": "2020-06-23T07:43:36.280Z", "type": "log", "message": "\"====log=======0\"" }, { "dateTime": "2020-06-23T07:43:36.280Z", "type": "warn", "message": "\"====info=======0\"" }, { "dateTime": "2020-06-23T07:43:36.281Z", "type": "warn", "message": "\"====warn=======\"[{\"sdfsdf\":\"sdfdsfsdf\"},{\"werwer\":\"wrg\"},{\"xcv\":\"kjh\"}]" }, { "dateTime": "2020-06-23T07:43:36.282Z", "type": "debug", "message": "\"====debug=======\"[\"aaaaa\",\"dfffd\"]" }, { "dateTime": "2020-06-23T07:43:36.282Z", "type": "error", "message": "\"====error=======\"{\"ttttt\":\"rrrrrrr\",\"dfdf\":\"tytyyt\"}" }, { "dateTime": "2020-06-23T07:43:36.440Z", "type": "log", "message": "\"====log=======1\"" }, { "dateTime": "2020-06-23T07:43:36.441Z", "type": "warn", "message": "\"====info=======1\"" }, { "dateTime": "2020-06-23T07:43:36.441Z", "type": "warn", "message": "\"====warn=======\"[{\"sdfsdf\":\"sdfdsfsdf\"},{\"werwer\":\"wrg\"},{\"xcv\":\"kjh\"}]" }, { "dateTime": "2020-06-23T07:43:36.442Z", "type": "debug", "message": "\"====debug=======\"[\"aaaaa\",\"dfffd\"]" }, { "dateTime": "2020-06-23T07:43:36.443Z", "type": "error", "message": "\"====error=======\"{\"ttttt\":\"rrrrrrr\",\"dfdf\":\"tytyyt\"}" }];

      var wrapper = document.getElementById("console");
      var tree = jsonTree.create(data, wrapper);
      tree.expand();
      tree.expand(function (node) {
        return node.childNodes.length < 2;
      });

      var data1 = [
        {
           "method":"GET",
           "url":"https://reqres.in/api/unknown/23",
           "requesttime":2.128,
           "requestHeaders":{
              "Content-Type":"application/json",
              "Referer":"https://reqres.in/",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"XHR",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "age":"114",
              "cache-control":"max-age=14400",
              "cf-cache-status":"HIT",
              "cf-ray":"5abf25f78bb16c02-SJC",
              "cf-request-id":"03ab560eb200006c02131b5200000001",
              "content-length":"2",
              "content-type":"application/json; charset=utf-8",
              "date":"Wed, 01 Jul 2020 09:37:25 GMT",
              "etag":"W/\"2-vyGp6PvFo4RvsFtPoIWeCReyIC8\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"404",
              "vary":"Accept-Encoding",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":404,
           "responseTime":2.648,
           "statusLine":404,
           "responseBody":"{}",
           "requestid":"91825.737",
           "$$hashKey":"object:3"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":6.368,
           "requestHeaders":{
              "Content-Type":"application/json",
              "Referer":"https://reqres.in/",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"XHR",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5abf26121b326c02-SJC",
              "cf-request-id":"03ab561f5100006c021320e200000001",
              "content-length":"84",
              "content-type":"application/json; charset=utf-8",
              "date":"Wed, 01 Jul 2020 09:37:30 GMT",
              "etag":"W/\"54-JVFvLRkF1KtupsuBxHbhnAaV0Lo\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":7.085,
           "statusLine":201,
           "responseBody":"{\"name\":\"morpheus\",\"job\":\"leader\",\"id\":\"927\",\"createdAt\":\"2020-07-01T09:37:30.208Z\"}",
           "requestid":"91825.741",
           "$$hashKey":"object:4"
        },
        {
           "method":"GET",
           "url":"https://reqres.in/api/users?delay=3",
           "requesttime":9.319,
           "requestHeaders":{
              "Content-Type":"application/json",
              "Referer":"https://reqres.in/",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"XHR",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5abf26244fa86c02-SJC",
              "cf-request-id":"03ab562aaf00006c0213251200000001",
              "content-encoding":"br",
              "content-type":"application/json; charset=utf-8",
              "date":"Wed, 01 Jul 2020 09:37:36 GMT",
              "etag":"W/\"4c5-znzuruTKwnH4068T7ikF88YcCME\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"200",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":200,
           "responseTime":12.882,
           "statusLine":200,
           "responseBody":"{\"page\":1,\"per_page\":6,\"total\":12,\"total_pages\":2,\"data\":[{\"id\":1,\"email\":\"george.bluth@reqres.in\",\"first_name\":\"George\",\"last_name\":\"Bluth\",\"avatar\":\"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg\"},{\"id\":2,\"email\":\"janet.weaver@reqres.in\",\"first_name\":\"Janet\",\"last_name\":\"Weaver\",\"avatar\":\"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg\"},{\"id\":3,\"email\":\"emma.wong@reqres.in\",\"first_name\":\"Emma\",\"last_name\":\"Wong\",\"avatar\":\"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg\"},{\"id\":4,\"email\":\"eve.holt@reqres.in\",\"first_name\":\"Eve\",\"last_name\":\"Holt\",\"avatar\":\"https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg\"},{\"id\":5,\"email\":\"charles.morris@reqres.in\",\"first_name\":\"Charles\",\"last_name\":\"Morris\",\"avatar\":\"https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg\"},{\"id\":6,\"email\":\"tracey.ramos@reqres.in\",\"first_name\":\"Tracey\",\"last_name\":\"Ramos\",\"avatar\":\"https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg\"}],\"ad\":{\"company\":\"StatusCode Weekly\",\"url\":\"http://statuscode.org/\",\"text\":\"A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things.\"}}",
           "requestid":"91825.745",
           "$$hashKey":"object:5"
        },
        {
           "method":"GET",
           "url":"https://reqres.in/api/users/23",
           "requesttime":13.484,
           "requestHeaders":{
              "Content-Type":"application/json",
              "Referer":"https://reqres.in/",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"XHR",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cache-control":"max-age=14400",
              "cf-cache-status":"EXPIRED",
              "cf-ray":"5abf263e3d9f6c02-SJC",
              "cf-request-id":"03ab563ae100006c021329e200000001",
              "content-length":"2",
              "content-type":"application/json; charset=utf-8",
              "date":"Wed, 01 Jul 2020 09:37:37 GMT",
              "etag":"W/\"2-vyGp6PvFo4RvsFtPoIWeCReyIC8\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"404",
              "vary":"Accept-Encoding",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":404,
           "responseTime":14.148,
           "statusLine":404,
           "responseBody":"{}",
           "requestid":"91825.749",
           "$$hashKey":"object:6"
        },
        {
           "method":"PUT",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"zion resident\"}",
           "url":"https://reqres.in/api/users/2",
           "requesttime":15.952,
           "requestHeaders":{
              "Content-Type":"application/json",
              "Referer":"https://reqres.in/",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"XHR",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5abf264da9766c02-SJC",
              "cf-request-id":"03ab56448700006c02132ba200000001",
              "content-encoding":"br",
              "content-type":"application/json; charset=utf-8",
              "date":"Wed, 01 Jul 2020 09:37:39 GMT",
              "etag":"W/\"50-hyDtI74VMV3KPET9bpEsmJxeif0\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"200",
              "vary":"Accept-Encoding",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":200,
           "responseTime":16.687,
           "statusLine":200,
           "responseBody":"{\"name\":\"morpheus\",\"job\":\"zion resident\",\"updatedAt\":\"2020-07-01T09:37:39.733Z\"}",
           "requestid":"91825.753",
           "$$hashKey":"object:7"
        }
     ];
      // $scope.networkList = data1;
      var wrapper = document.getElementById("network");
      var wrapper1 = document.getElementById("network1");
      debugger;
      // var wrapper2 = document.getElementById("network2");
      var tree = jsonTree.create(data1, wrapper);
      tree.expand();
      tree.expand(function (node) {
        return node.childNodes.length < 2;
      });
      var tree1 = jsonTreee.create(data1, wrapper1);
      tree1.expand();
      tree1.expand(function (node) {
        return node.childNodes.length < 2;
      });
      // var tree2 = jsonTree.create(data1, wrapper2);
      // tree2.expand();
      // tree2.expand(function (node) {
      //   return node.childNodes.length < 2;
      // });
      fetch(params.json)
        .then((res) => res.json())
        .then((json) => {
          $scope.networkList = json;
          $scope.$apply();
          if (json) {
            console.log('====$scope.network==', JSON.stringify($scope.networkList));
            var wrapper = document.getElementById("network");
            var wrapper1 = document.getElementById("network1");
            var tree = jsonTree.create(json, wrapper);
            tree.expand();
            tree.expand(function (node) {
              return node.childNodes.length < 2;
            });
            var tree1 = jsonTree.create(json, wrapper1);
            tree1.expand();
            tree1.expand(function (node) {
              return node.childNodes.length < 2;
            });
          }
        });

    };


    var videoEle = {};
    var currentTime = 0
    videoEle = document.querySelector('video')
    var count = 0;
    videoEle.ontimeupdate = function () {
      currentTime = 0
      if(count  === 0) {
        console.log('===== $scope.network',  $scope.networkList);
        count++;
      }
      if($scope.networkList) {
        showRequest();

      }
    }

    var matchedReq;
    function showRequest() {
      matchedReq = '';
      $scope.networkList.forEach(function (network) {
        if (network.requesttime <= videoEle.currentTime) {
          if ((network.requesttime > currentTime) || currentTime === 0) {
            if (matchedReq !== network.requestid) {
              currentTime = network.requesttime;
              matchedReq = network.requestid;
              console.log('=====matchedReq', matchedReq);
              document.getElementById('timeline_'+matchedReq).classList.add('timeline-background');
            }
          }
        }
      });
    }
    videoEle.onseeked = (event) => {
      currentTime = 0;
      document.querySelectorAll('.card-body').forEach(element => {
        element.classList.remove('timeline-background');
      });
      showRequest();
    };

    videoEle.onseeking = (event) => {
      console.log('===============Video is seeking a new position==========');
      document.querySelectorAll('.card-body').forEach(element => {
        element.classList.remove('timeline-background');
      });
    };


    init();

    $scope.downloadVideo = function () {
      chrome.tabs.create({ url: 'download.html?mp4=' + params.mp4 + '&json=' + params.json + '&console=' + params.console + '&customname=' + 'kkkk' });
    }

    $scope.trackVideoToRequest = function(request) {
      console.log('==request=', request);
      document.querySelectorAll('.card-body').forEach(element => {
        element.classList.remove('timeline-background');
      });
      document.getElementById('timeline_'+request.requestid).classList.add('timeline-background');
      videoEle.currentTime = request.requesttime;
    }

  },
]);

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
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":1.793,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943bfca7ddf1-SIN",
              "cf-request-id":"0381baf9780000ddf1e11d7200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-hBl3nfOn3ybVMC8CCx4e4iQkRsc\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.271,
           "statusLine":201,
           "responseBody":"{\"id\":\"910\",\"createdAt\":\"2020-06-23T07:43:36.598Z\"}",
           "requestid":"86834.213"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":1.96,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943d0eafddf1-SIN",
              "cf-request-id":"0381bafa240000ddf1e11df200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-FkeY6hbpRH+hXywZlR2TwA2Z7hE\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.624,
           "statusLine":201,
           "responseBody":"{\"id\":\"650\",\"createdAt\":\"2020-06-23T07:43:36.757Z\"}",
           "requestid":"86834.214"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":1.793,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943bfca7ddf1-SIN",
              "cf-request-id":"0381baf9780000ddf1e11d7200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-hBl3nfOn3ybVMC8CCx4e4iQkRsc\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.271,
           "statusLine":201,
           "responseBody":"{\"id\":\"910\",\"createdAt\":\"2020-06-23T07:43:36.598Z\"}",
           "requestid":"86834.213"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":1.96,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943d0eafddf1-SIN",
              "cf-request-id":"0381bafa240000ddf1e11df200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-FkeY6hbpRH+hXywZlR2TwA2Z7hE\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.624,
           "statusLine":201,
           "responseBody":"{\"id\":\"650\",\"createdAt\":\"2020-06-23T07:43:36.757Z\"}",
           "requestid":"86834.214"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":3.793,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943bfca7ddf1-SIN",
              "cf-request-id":"0381baf9780000ddf1e11d7200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-hBl3nfOn3ybVMC8CCx4e4iQkRsc\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.271,
           "statusLine":201,
           "responseBody":"{\"id\":\"910\",\"createdAt\":\"2020-06-23T07:43:36.598Z\"}",
           "requestid":"86834.213"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":5.96,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943d0eafddf1-SIN",
              "cf-request-id":"0381bafa240000ddf1e11df200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-FkeY6hbpRH+hXywZlR2TwA2Z7hE\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.624,
           "statusLine":201,
           "responseBody":"{\"id\":\"650\",\"createdAt\":\"2020-06-23T07:43:36.757Z\"}",
           "requestid":"86834.214"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":9.793,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943bfca7ddf1-SIN",
              "cf-request-id":"0381baf9780000ddf1e11d7200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-hBl3nfOn3ybVMC8CCx4e4iQkRsc\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.271,
           "statusLine":201,
           "responseBody":"{\"id\":\"910\",\"createdAt\":\"2020-06-23T07:43:36.598Z\"}",
           "requestid":"86834.213"
        },
        {
           "method":"POST",
           "requestBody":"{\"name\":\"morpheus\",\"job\":\"leader\"}",
           "url":"https://reqres.in/api/users",
           "requesttime":11.96,
           "requestHeaders":{
              "Content-Type":"text/plain;charset=UTF-8",
              "Referer":"",
              "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36"
           },
           "type":"Fetch",
           "responseHeaders":{
              "access-control-allow-origin":"*",
              "cf-cache-status":"DYNAMIC",
              "cf-ray":"5a7c943d0eafddf1-SIN",
              "cf-request-id":"0381bafa240000ddf1e11df200000001",
              "content-length":"51",
              "content-type":"application/json; charset=utf-8",
              "date":"Tue, 23 Jun 2020 07:43:36 GMT",
              "etag":"W/\"33-FkeY6hbpRH+hXywZlR2TwA2Z7hE\"",
              "expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
              "server":"cloudflare",
              "status":"201",
              "via":"1.1 vegur",
              "x-powered-by":"Express"
           },
           "statusCode":201,
           "responseTime":2.624,
           "statusLine":201,
           "responseBody":"{\"id\":\"650\",\"createdAt\":\"2020-06-23T07:43:36.757Z\"}",
           "requestid":"86834.214"
        }
     ];
      $scope.networkList = data1;
      var wrapper = document.getElementById("network");
      var wrapper1 = document.getElementById("network1");
      // var wrapper2 = document.getElementById("network2");
      var tree = jsonTree.create(data1, wrapper);
      tree.expand();
      tree.expand(function (node) {
        return node.childNodes.length < 2;
      });
      var tree1 = jsonTree.create(data1, wrapper1);
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
          if (json) {
            $scope.network = JSON.parse(json);
            console.log('====network==', JSON.stringify(json));

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
    videoEle.ontimeupdate = function () {
      currentTime = 0
      if($scope.network) {
        showRequest();

      }
    }

    var matchedReq;
    function showRequest() {
      matchedReq = '';
      currentTime = videoEle.currentTime;
      console.log('===== $scope.network',  $scope.network);
      
      $scope.network.forEach(function (network) {
        if (network.requesttime <= videoEle.currentTime) {
          if ((network.requesttime > currentTime) || currentTime === 0) {
            if (matchedReq !== network.requestid) {
              currentTime = network.requesttime;
              matchedReq = network.requestid;
              console.log('=====matchedReq', matchedReq);
              document.getElementById('timeline_'+matchedReq.requestid).style.background = 'green';
            }
          }
        }
      });
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

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
  console.logs.push(Array.from(arguments));
  const consoleLogs = JSON.parse(
    localStorage.getItem('consoleLogs') ?
    localStorage.getItem('consoleLogs') :
    '[]'
  );
  consoleLogs.push(Array.from(arguments));
  localStorage.setItem('consoleLogs', JSON.stringify(consoleLogs));
  console.stdlog.apply(console, arguments);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    debugger;
    const logs =  localStorage.getItem('consoleLogs');
    sendResponse({ messages: logs });
  }
);

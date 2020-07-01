if (!console.stdlog) { console.stdlog = console.log.bind(console); }
if (!console.stdInfo) { console.stdInfo = console.info.bind(console); }
if (!console.stdDebug) { console.stdDebug = console.debug.bind(console); }
if (!console.stdError) { console.stdError = console.error.bind(console); }
if (!console.stdWarn) { console.stdWarn = console.warn.bind(console); }

function getConsoleLogs() {
  return JSON.parse(
    localStorage.getItem("consoleLogs")
      ? localStorage.getItem("consoleLogs")
      : '[]'
  );
}

function formattedMessages(messages) {
  var formattedMessage = '';
  messages.forEach(function (message) {
    formattedMessage += JSON.stringify(message);
  });
  return formattedMessage;

};

console.log = function () {
  const consoleLogs = getConsoleLogs();
  consoleLogs.push({ dateTime: new Date(), type: 'log', message: formattedMessages(Array.from(arguments)) });
  localStorage.setItem("consoleLogs", JSON.stringify(consoleLogs));
  console.stdlog.apply(console, arguments);
};

console.info = function () {
  const consoleLogs = getConsoleLogs();
  consoleLogs.push({ dateTime: new Date(), type: 'info', message: formattedMessages(Array.from(arguments)) });
  localStorage.setItem("consoleLogs", JSON.stringify(consoleLogs));
  console.stdInfo.apply(console, arguments);
};

console.debug = function () {
  const consoleLogs = getConsoleLogs();
  consoleLogs.push({ dateTime: new Date(), type: 'debug', message: formattedMessages(Array.from(arguments)) });
  localStorage.setItem("consoleLogs", JSON.stringify(consoleLogs));
  console.stdDebug.apply(console, arguments);
};

console.error = function () {
  const consoleLogs = getConsoleLogs();
  consoleLogs.push({ dateTime: new Date(), type: 'error', message: formattedMessages(Array.from(arguments)) });
  localStorage.setItem("consoleLogs", JSON.stringify(consoleLogs));
  console.stdError.apply(console, arguments);
};


console.warn = function () {
  const consoleLogs = getConsoleLogs();
  consoleLogs.push({ dateTime: new Date(), type: 'warn', message: formattedMessages(Array.from(arguments)) });
  localStorage.setItem("consoleLogs", JSON.stringify(consoleLogs));
  console.stdWarn.apply(console, arguments);
};

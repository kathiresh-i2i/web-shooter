import React from "react";
import Select from "react-select";
import "./Console.css";

const logOptions = [
  { value: "log", label: "Log" },
  { value: "debug", label: "Debug" },
  { value: "warn", label: "Warn" },
  { value: "error", label: "Error" }
];

const logClass = {
  log: "log",
  debug: "debug",
  warn: "warn",
  error: "error"
};
export default class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLogTypes: logOptions,
      selectedLogTypesValues: logOptions.map(logType => logType.value)
    };
  }

  handleLogTypeChange = logTypes => {
    const selectedLogTypesValues = logTypes
      ? logTypes.map(logType => logType.value)
      : [];
    this.setState({
      selectedLogTypes: logTypes,
      selectedLogTypesValues
    });
  };

  render() {
    const { selectedLogTypes, selectedLogTypesValues } = this.state;
    const { recordingStartedDateTime, currentPlaybackTime, consoleLogs } = this.props;
    return (
      <div className="mt-2">
        <Select
          value={selectedLogTypes}
          onChange={this.handleLogTypeChange}
          options={logOptions}
          isMulti
          className="w-100"
        />
        <div className="logs">
          {consoleLogs &&
            consoleLogs.map(log =>
              selectedLogTypesValues.includes(log.type) ? (
                <Log
                  log={log}
                  recordingStartedDateTime={recordingStartedDateTime}
                  currentPlaybackTime={currentPlaybackTime}
                />
              ) : (
                ""
              )
            )}
        </div>
      </div>
    );
  }
}

function Log({ log: { type, message, dateTime }, recordingStartedDateTime, currentPlaybackTime }) {
  return (
    <div
      className={`message ${logClass[type]} ${
        ((new Date(dateTime).getTime() -
          new Date(recordingStartedDateTime).getTime()) /
          1000 <
        currentPlaybackTime)
          ? ""
          : "d-none"
      }`}
    >
      {message &&
        message.map(message =>
          typeof message === "object"
            ? ` ${JSON.stringify(message)}`
            : ` ${message}`
        )}
    </div>
  );
}

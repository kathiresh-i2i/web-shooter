import React from "react";
import { Timeline, TimelineEvent } from "react-event-timeline";

function Network(props) {
  const {
    currentPlaybackTime,
    recordingStartedDateTime,
    setCurrentRequest,
    networkLogs
  } = props;
  return (
    <Timeline>
      {networkLogs && networkLogs.map((network, i) => {
        return (
          <TimelineEvent
            style={{ wordBreak: "break-word" }}
            contentStyle={{
              backgroundColor:
                (new Date(network.startedDateTime).getTime() -
                  new Date(recordingStartedDateTime).getTime()) /
                  1000 <
                currentPlaybackTime
                  ? "#e2e3e5"
                  : "",
              cursor: 'pointer'
            }}
            title="Request"
            icon={
              <i className="fa fa-external-link-square" aria-hidden="true" />
            }
            onClick={() =>
              setCurrentRequest(
                (new Date(network.startedDateTime).getTime() -
                  new Date(recordingStartedDateTime).getTime()) /
                  1000,
                  network
              )
            }
          >
            {network.request.url}
          </TimelineEvent>
        );
      })}
    </Timeline>
  );
}

export default Network;

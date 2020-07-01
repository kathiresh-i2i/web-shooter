import React from "react";
import JsonRenderer from './JsonRenderer';

function Request(props) {
  const { log } = JSON.parse(JSON.stringify(props));
  const request = log.request;
  delete log["request"];
  delete log["response"];
  return (
    <div className="p-2">
      <JsonRenderer json={log}/>
      <h5 className="font-weight-bold my-3 border-bottom">Request</h5>
      <JsonRenderer json={request}/>
    </div>
  );
}

export default Request;

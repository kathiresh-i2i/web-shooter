import React from "react";
import ReactJson from "react-json-view";

function JsonRenderer(props) {
  const { json } = props;
  return (
    <div>
      {json && Object.keys(json).map(key => (
        <div className="my-1 d-flex">
          <span className="font-weight-bold mr-2">{`${key}: `}</span>
          {typeof json[key] === "object" ? (
            <ReactJson src={json[key]} displayDataTypes={false} />
          ) : (
            json[key]
          )}
        </div>
      ))}
    </div>
  );
}

export default JsonRenderer;

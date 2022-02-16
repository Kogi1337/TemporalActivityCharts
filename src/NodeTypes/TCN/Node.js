import React from "react";
import { observer } from "mobx-react";
import { Handle } from "react-flow-renderer";

const Node = observer(({ id, data, isConnectable }) => {
  return (
    <div className="nodeTcn">
      <Handle
        id={"topNodeTcn" + id}
        position="top"
        className="node-handle"
        style={{ background: "#000" }}
      />

      <Handle
        id={"bottomNodeTcn" + id}
        position="bottom"
        className="node-handle"
        style={{ background: "#000", top: "95%" }}
      />

      <Handle
        id={"leftNodeTcn" + id}
        position="left"
        className="node-handle"
        style={{ background: "#000" }}
      />

      <Handle
        id={"rightNodeTcn" + id}
        position="right"
        className="node-handle"
        style={{ background: "#000" }}
      />

      <span>{data.label}</span>
    </div>
  );
});

export default Node;

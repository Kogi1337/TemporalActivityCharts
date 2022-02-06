import React from "react";
import { observer } from "mobx-react";
import { Handle } from "react-flow-renderer";

const Node = observer(({ id, data, isConnectable }) => {
  return (
    <div className="nodeTcn">
      <Handle
        id={"topNodeTcn" + id}
        position="top"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Handle
        id={"bottomNodeTcn" + id}
        position="bottom"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <span>{data.label}</span>
    </div>
  );
});

export default Node;

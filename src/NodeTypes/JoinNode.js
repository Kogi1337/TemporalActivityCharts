import { observer } from "mobx-react";
import React from "react";
import { Handle } from "react-flow-renderer";

const JoinNode = observer(({ id, data, isConnectable }) => {
  const path = "M 0 0 L 20 0 L 150 150 L 0 150 L 0 0";

  const setSelected = () => {
    data.elementStore.activeElementId !== id
      ? (data.elementStore.activeElementId = id)
      : (data.elementStore.activeElementId = undefined);
  };

  let style =
    data.elementStore.activeElementId === id
      ? { outline: "3px solid #555" }
      : {};

  return (
    <div className="forkNode" onClick={setSelected} style={style}>
      <svg height="150" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d={path} className="forkNodePath" />
      </svg>

      <Handle
        className="handle-vertical"
        id={"joinNodeLeft1" + id}
        position="left"
        style={{ background: "#000", top: "25%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Handle
        className="handle-vertical"
        id={"joinNodeLeft2" + id}
        position="left"
        style={{ background: "#000", top: "75%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Handle
        className="handle-vertical"
        id={"joinNodeRight" + id}
        position="right"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default JoinNode;

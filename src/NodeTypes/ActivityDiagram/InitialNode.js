import React from "react";
import { observer } from "mobx-react";
import { Handle } from "react-flow-renderer";

const InitialNode = observer(({ id, data, isConnectable }) => {
  const setSelected = () => {
    data.elementStore?.activeElementId !== id
      ? (data.elementStore.activeElementId = id)
      : (data.elementStore.activeElementId = undefined);
  };

  let style =
    data.elementStore?.activeElementId === id
      ? {
          outline: "3px solid #555",
        }
      : {};

  return (
    <div className="initialNode" onMouseDown={setSelected} style={style}>
      <Handle
        id={"initialHandle" + id}
        position="bottom"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default InitialNode;

import React from "react";
import { observer } from "mobx-react";
import { Handle } from "react-flow-renderer";

const FinalEdge = observer(({ id, data, isConnectable }) => {
  const setSelected = () => {
    data.elementStore.activeElementId !== id
      ? (data.elementStore.activeElementId = id)
      : (data.elementStore.activeElementId = undefined);
  };

  let style =
    data.elementStore.activeElementId === id
      ? {
          outline: "3px solid #000",
        }
      : {};

  return (
    <div className="finalNode" onClick={setSelected} style={style}>
      <Handle
        id={"finalHandle" + id}
        position="top"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default FinalEdge;

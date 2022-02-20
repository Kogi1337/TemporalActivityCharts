import React from "react";
import { Input } from "antd";
import { Handle } from "react-flow-renderer";
import { observer } from "mobx-react";

const MergeNode = observer(({ id, data, isConnectable }) => {
  const path = "M 55 0 L 110 55 L 55 110 L 0 55 L 55 0";

  const setSelected = () => {
    data.elementStore?.activeElementId !== id
      ? (data.elementStore.activeElementId = id)
      : (data.elementStore.activeElementId = undefined);
  };

  let style =
    data.elementStore?.activeElementId === id
      ? { stroke: "#000", strokeWidth: "2" }
      : {};

  const onChangeLabel = (ev) => {
    data.label = ev.target.value;
    data.elementStore.transformElementsToTCN();
  };

  return (
    <div className="decisionNode" onMouseDown={setSelected} style={style}>
      <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
        <path d={path} className="decisionNodePath" />
      </svg>

      <Handle
        id={"mergeNodeRight" + id}
        position="right"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Input
        className="decisionNodeInput"
        placeholder="Merge"
        defaultValue={data?.label}
        onChange={onChangeLabel}
      />

      <Handle
        id={"mergeNodeTop" + id}
        position="top"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Handle
        id={"mergeNodeBottom" + id}
        position="bottom"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default MergeNode;

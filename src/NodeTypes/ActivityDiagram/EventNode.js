import React from "react";
import { Input } from "antd";
import { Handle } from "react-flow-renderer";
import { observer } from "mobx-react";

const EventNode = observer(({ id, data, isConnectable }) => {
  const setSelected = () => {
    data.elementStore?.activeElementId !== id
      ? (data.elementStore.activeElementId = id)
      : (data.elementStore.activeElementId = undefined);
  };

  let style =
    data.elementStore?.activeElementId === id
      ? { outline: "2px solid #000" }
      : {};

  return (
    <div className="eventNode" onMouseDown={setSelected} style={style}>
      <Handle
        className="handle-vertical"
        id={"eventLeft" + id}
        position="left"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Input
        className="eventNodeLabel"
        placeholder="Parameter"
        defaultValue={data?.label}
        onChange={(ev) => (data.label = ev.target.value)}
      />

      <Handle
        className="handle-vertical"
        id={"eventRight" + id}
        position="right"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default EventNode;

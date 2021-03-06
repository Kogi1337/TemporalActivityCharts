import React from "react";
import { Input, InputNumber, Select } from "antd";
import { Handle } from "react-flow-renderer";
import { observer } from "mobx-react";

const ActivityNode = observer(({ id, data, isConnectable }) => {
  const setSelected = () => {
    data.elementStore?.activeElementId !== id
      ? (data.elementStore.activeElementId = id)
      : (data.elementStore.activeElementId = undefined);
  };

  let style =
    data.elementStore?.activeElementId === id
      ? { border: "2px solid #000" }
      : {};

  const onChangeName = (ev) => {
    data.name = ev.target.value;
    data.elementStore.transformElementsToTCN();
  };

  const onChangeDurationMin = (value) => {
    data.durationMin = value;
    data.elementStore.transformElementsToTCN();
  };

  const onChangeDurationMax = (value) => {
    data.durationMax = value;
    data.elementStore.transformElementsToTCN();
  };

  const onChangeDurationType = (value) => {
    data.durationType = value;
    data.elementStore.transformElementsToTCN();
  };

  return (
    <div className="activityNode" onMouseDown={setSelected} style={style}>
      <div className="activityNodeLeft">
        <Handle
          className="handle-horizontal"
          id={"constraintTopLeft" + id}
          position="top"
          style={{ background: "#000", left: "12.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <Handle
          className="handle-vertical"
          id={"targetLeft" + id}
          position="left"
          style={{ background: "#000" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          className="handle-horizontal"
          id={"constraintBottomLeft" + id}
          position="bottom"
          style={{ background: "#000", left: "12.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className="activityNodeMiddle">
        <Input
          defaultValue={data?.name}
          onChange={onChangeName}
          placeholder="Name"
          className="activityInputName"
        />

        <div>
          <span className="fontSizeDuration">[</span>
          <InputNumber
            min={0}
            defaultValue={data?.durationMin}
            onChange={onChangeDurationMin}
            placeholder="Duration"
            className="activityInputDuration"
          />
          <span className="fontSizeDuration">,</span>
          <InputNumber
            min={0}
            defaultValue={data?.durationMax}
            onChange={onChangeDurationMax}
            placeholder="Duration"
            className="activityInputDuration"
          />
          <span className="fontSizeDuration">]</span>
        </div>

        <Select
          defaultValue={data?.durationType}
          onChange={onChangeDurationType}
          placeholder="Duration-Type"
          className="activityInputName"
        >
          <Select.Option value="contingent">Contingent</Select.Option>
          <Select.Option value="semiContingent">Semi-Contingent</Select.Option>
          <Select.Option value="nonContingent">Non-Contingent</Select.Option>
        </Select>
      </div>

      <div className="activityNodeRight">
        <Handle
          className="handle-horizontal"
          id={"constraintTopRight" + id}
          position="top"
          style={{ background: "#000", left: "87.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          className="handle-vertical"
          id={"sourceRight" + id}
          position="right"
          style={{ background: "#000" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          className="handle-horizontal"
          id={"constraintBottomRight" + id}
          position="bottom"
          style={{ background: "#000", left: "87.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

export default ActivityNode;

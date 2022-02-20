import React from "react";
import { InputNumber, Select } from "antd";
import { observer } from "mobx-react";

const foreignObjectSize = 140;

const TimeConstraintEdgeTop = observer(
  ({ id, sourceX, sourceY, targetX, targetY, data }) => {
    const path =
      "M" +
      sourceX +
      " " +
      sourceY +
      "Q" +
      (sourceX + targetX) / 2 +
      " " +
      (sourceY > targetY ? sourceY - 200 : targetY - 200) +
      ", " +
      targetX +
      " " +
      targetY;

    const onChangeType = (value) => {
      try {
        if (value === "UBC") {
          let elements = [...data.elementStore.elements];
          data.elementStore.elements = [];

          let element = elements.find((x) => x.id === id);
          let index = elements.indexOf(element);

          elements.splice(index, 1);

          let temp = element.source;
          element.source = element.target;
          element.target = temp;

          temp = element.sourceHandle;
          element.sourceHandle = element.targetHandle;
          element.targetHandle = temp;
          elements.push(element);
          data.elementStore.elements = elements;
        }
        data.constraintType = value;
        data.elementStore.transformElementsToTCN();
      } catch (err) {
        console.log(err);
      }
    };

    const selectBefore = (
      <Select
        defaultValue={data?.constraintType}
        onChange={onChangeType}
        placeholder="Type"
      >
        <Select.Option value="LBC">LBC</Select.Option>
        <Select.Option value="UBC">UBC</Select.Option>
      </Select>
    );

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
      data.label = ev;
      data.elementStore.transformElementsToTCN();
    };

    return (
      <g onClick={setSelected}>
        <marker
          id="triangle"
          markerWidth="30"
          markerHeight="30"
          viewBox="-20 -20 40 40"
          orient="auto"
          refX="0"
          refY="0"
        >
          <polyline
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            fill="none"
            points="-15,-13 0,0 -15,13"
          />
        </marker>

        <path
          id={id}
          className="timeConstraintEdge"
          d={path}
          markerEnd="url(#triangle)"
          style={style}
        />
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={(sourceX + targetX) / 2 - 50}
          y={sourceY > targetY ? sourceY - 140 : targetY - 140}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <InputNumber
            addonBefore={selectBefore}
            min={0}
            defaultValue={data?.label}
            placeholder="Constraint"
            className="timeConstraintInput"
            onChange={onChangeLabel}
          />
        </foreignObject>
      </g>
    );
  }
);

export default TimeConstraintEdgeTop;

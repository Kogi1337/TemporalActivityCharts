import React from "react";
import { InputNumber } from "antd";
import { observer } from "mobx-react";

const foreignObjectSize = 100;

const EventEdgeLeft = observer(
  ({ id, sourceX, sourceY, targetX, targetY, data }) => {
    const path =
      "M" +
      sourceX +
      " " +
      sourceY +
      "Q" +
      (sourceX > targetX ? sourceX - 100 : targetX - 100) +
      " " +
      (sourceY + targetY) / 2 +
      ", " +
      targetX +
      " " +
      targetY;

    const setSelected = () => {
      data.elementStore.activeElementId !== id
        ? (data.elementStore.activeElementId = id)
        : (data.elementStore.activeElementId = undefined);
    };

    let style =
      data.elementStore.activeElementId === id
        ? { stroke: "#000", strokeWidth: "2" }
        : {};

    return (
      <>
        <rect
          class="btn"
          x={targetX < sourceX ? targetX - 50 : sourceX - 50}
          y={targetY < sourceY ? targetY : sourceY}
          width={Math.abs(targetX - sourceX) + 50}
          height={Math.abs(sourceY - targetY)}
          onClick={setSelected}
        />

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
          className="eventEdge"
          d={path}
          markerEnd="url(#triangle)"
          style={style}
        />

        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={sourceX > targetX ? sourceX - 160 : targetX - 160}
          y={(sourceY + targetY) / 2 - 20}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <InputNumber
            min={0}
            defaultValue={data?.label}
            placeholder="Constraint"
            className="timeConstraintInput"
            onChange={(value) => (data.label = value)}
          />
        </foreignObject>
      </>
    );
  }
);

export default EventEdgeLeft;

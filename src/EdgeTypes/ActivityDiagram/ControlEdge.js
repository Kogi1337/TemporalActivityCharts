import React from "react";
import { observer } from "mobx-react";

const ControlEdge = observer(
  ({ id, sourceX, sourceY, targetX, targetY, data }) => {
    const path = "M" + sourceX + " " + sourceY + "L" + targetX + " " + targetY;

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
          x={targetX < sourceX ? targetX : sourceX}
          y={targetY < sourceY ? targetY - 25 : sourceY - 25}
          width={Math.abs(targetX - sourceX)}
          height={Math.abs(sourceY - targetY) + 50}
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
          className="controlEdge"
          d={path}
          markerEnd="url(#triangle)"
          style={style}
        />
      </>
    );
  }
);

export default ControlEdge;

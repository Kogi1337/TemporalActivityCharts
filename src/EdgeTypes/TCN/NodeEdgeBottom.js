import React from "react";
import { observer } from "mobx-react";

const NodeEdge = observer(
  ({ id, sourceX, sourceY, targetX, targetY, data }) => {
    const path =
      "M" +
      sourceX +
      " " +
      sourceY +
      "Q" +
      (sourceX + targetX) / 2 +
      " " +
      (sourceY > targetY ? sourceY + 200 : targetY + 200) +
      ", " +
      targetX +
      " " +
      targetY;

    return (
      <>
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
          className="nodeEdge"
          d={path}
          markerEnd="url(#triangle)"
          style={style}
        />
      </>
    );
  }
);

export default NodeEdge;

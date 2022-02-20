import React from "react";
import { observer } from "mobx-react";

const foreignObjectSize = 140;

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
      (sourceY > targetY ? sourceY + 100 : targetY + 100) +
      ", " +
      targetX +
      " " +
      targetY;

    var midX = sourceX + (targetX - sourceX) * 0.5;
    var midY = sourceY + (targetY - sourceY) * 0.5;

    return (
      <>
        <marker
          id="header"
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

        <path id={id} className="nodeEdge" d={path} markerEnd="url(#header)" />

        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={midX}
          y={midY + 50}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <span>{data?.label}</span>
        </foreignObject>
      </>
    );
  }
);

export default NodeEdge;

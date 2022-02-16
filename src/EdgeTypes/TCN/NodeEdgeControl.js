import React from "react";
import { observer } from "mobx-react";

const foreignObjectSize = 140;

const NodeEdgeControl = observer(
  ({ id, sourceX, sourceY, targetX, targetY, data }) => {
    const path = "M" + sourceX + " " + sourceY + "L" + targetX + " " + targetY;

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

        <path
          id={id}
          className="controlEdge"
          d={path}
          markerEnd="url(#header)"
        />

        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={(sourceX + targetX) / 2}
          y={sourceY > targetY ? sourceY - 50 : targetY - 50}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <span>0</span>
        </foreignObject>
      </>
    );
  }
);

export default NodeEdgeControl;

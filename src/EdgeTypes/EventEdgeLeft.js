import React from 'react';
import { Input } from 'antd';

const foreignObjectSize = 100;

export default function TimeConstraintEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  arrowHeadType,
  markerEndId,
}) {
  const path =
    'M' +
    sourceX +
    ' ' +
    sourceY +
    'Q' +
    (sourceX > targetX ? sourceX - 100 : targetX - 100) +
    ' ' +
    (sourceY + targetY) / 2 +
    ', ' +
    targetX +
    ' ' +
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
        <Input placeholder="Constraint" className="timeConstraintInput" />
      </foreignObject>
    </>
  );
}

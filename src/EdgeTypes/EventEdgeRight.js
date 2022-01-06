import React from 'react';
import { InputNumber } from 'antd';

const foreignObjectSize = 100;

export default function EventEdgeRight({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  data,
}) {
  const path =
    'M' +
    sourceX +
    ' ' +
    sourceY +
    'Q' +
    (sourceX > targetX ? sourceX + 100 : targetX + 100) +
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
        x={sourceX > targetX ? sourceX + 60 : targetX + 60}
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

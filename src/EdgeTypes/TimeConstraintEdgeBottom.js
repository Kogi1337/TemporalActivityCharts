import React from 'react';
import { Input } from 'antd';

const foreignObjectSize = 100;

export default function TimeConstraintEdgeBottom({
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
    (sourceX + targetX) / 2 +
    ' ' +
    (sourceY > targetY ? sourceY + 200 : targetY + 200) +
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
        className="timeConstraintEdge"
        d={path}
        markerEnd="url(#triangle)"
        style={style}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={(sourceX + targetX) / 2 - 45}
        y={sourceY > targetY ? sourceY + 110 : targetY + 110}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <Input
          defaultValue={data?.label}
          placeholder="Constraint"
          className="timeConstraintInput"
          onChange={(ev) => (data.label = ev.target.value)}
        />
      </foreignObject>
    </>
  );
}

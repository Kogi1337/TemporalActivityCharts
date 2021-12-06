import React from 'react';

export default function ControlEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  arrowHeadType,
  markerEndId,
}) {
  const path = 'M' + sourceX + ' ' + sourceY + 'L' + targetX + ' ' + targetY;

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
        className="controlEdge"
        d={path}
        markerEnd="url(#triangle)"
        style={style}
      />
    </>
  );
}

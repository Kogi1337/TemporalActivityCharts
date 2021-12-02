import React from 'react';
import { getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';
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
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const path =
    'M' +
    sourceX +
    ' ' +
    sourceY +
    'Q' +
    (sourceX + targetX) / 2 +
    ' ' +
    (sourceY > targetY ? sourceY + 500 : targetY + 500) +
    ', ' +
    targetX +
    ' ' +
    targetY;

  return (
    <>
      <path
        id={id}
        className="timeConstraintEdge"
        d={path}
        markerEnd={markerEnd}
        style={style}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={(sourceX + targetX) / 2 - 45}
        y={sourceY > targetY ? sourceY + 255 : targetY + 255}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <Input placeholder="Constraint" className="timeConstraintInput" />
      </foreignObject>
    </>
  );
}

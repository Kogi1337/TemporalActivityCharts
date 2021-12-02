import React from 'react';
import { getMarkerEnd } from 'react-flow-renderer';
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
    (sourceX > targetX ? sourceX + 100 : targetX + 100) +
    ' ' +
    (sourceY + targetY) / 2 +
    ', ' +
    targetX +
    ' ' +
    targetY;

  return (
    <>
      <path
        id={id}
        className="eventEdge"
        d={path}
        markerEnd={markerEnd}
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
        <Input placeholder="Constraint" className="timeConstraintInput" />
      </foreignObject>
    </>
  );
}

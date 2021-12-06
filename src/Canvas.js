import React, { useState } from 'react';
import ReactFlow, {
  Background,
  removeElements,
  addEdge,
  ConnectionMode,
} from 'react-flow-renderer';
import InitialNode from './NodeTypes/InitialNode';
import ActivityNode from './NodeTypes/ActivityNode';
import FinalNode from './NodeTypes/FinalNode';
import DecisionNode from './NodeTypes/DecisionNode';
import TimeConstraintEdgeTop from './EdgeTypes/TimeConstraintEdgeTop';
import TimeConstraintEdgeBottom from './EdgeTypes/TimeConstraintEdgeBottom';
import EventNode from './NodeTypes/EventNode';
import EventEdgeLeft from './EdgeTypes/EventEdgeLeft';
import EventEdgeRight from './EdgeTypes/EventEdgeRight';
import ControlEdge from './EdgeTypes/ControlEdge';

const nodeTypes = {
  initialNode: InitialNode,
  finalNode: FinalNode,
  decisionNode: DecisionNode,
  activityNode: ActivityNode,
  eventNode: EventNode,
};

const edgeTypes = {
  timeConstraintEdgeTop: TimeConstraintEdgeTop,
  timeConstraintEdgeBottom: TimeConstraintEdgeBottom,
  eventEdgeLeft: EventEdgeLeft,
  eventEdgeRight: EventEdgeRight,
  controlEdge: ControlEdge,
};

const initialElements = [
  {
    id: '1',
    type: 'initialNode',
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    type: 'activityNode',
    data: { label: 'Action 1', duration: '[5, 25]', continuousness: 'NC' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'eventNode',
    data: { label: 'Parameter 1' },
    position: { x: 100, y: 180 },
  },
  {
    id: '4',
    type: 'activityNode',
    data: { label: 'Action 2' },
    position: { x: 250, y: 250 },
  },
  {
    id: '5',
    type: 'finalNode',
    position: { x: 250, y: 350 },
  },
];

const Canvas = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    if (
      params.sourceHandle?.toString().includes('constraintTop') &&
      params.targetHandle?.toString().includes('constraintTop')
    ) {
      params.type = 'timeConstraintEdgeTop';
    } else if (
      params.sourceHandle?.toString().includes('constraintBottom') &&
      params.targetHandle?.toString().includes('constraintBottom')
    ) {
      params.type = 'timeConstraintEdgeBottom';
    } else if (
      params.sourceHandle?.toString().includes('event') &&
      params.targetHandle?.toString().includes('eventLeft')
    ) {
      params.type = 'eventEdgeLeft';
    } else if (
      params.sourceHandle?.toString().includes('eventRight') &&
      params.targetHandle?.toString().includes('event')
    ) {
      params.type = 'eventEdgeRight';
    } else {
      params.type = 'controlEdge';
    }

    setElements((els) => addEdge(params, els));
  };

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      deleteKeyCode={46} /* 'delete'-key */
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionMode={ConnectionMode.Loose}
    >
      <Background variant="dots" />
    </ReactFlow>
  );
};

export default Canvas;

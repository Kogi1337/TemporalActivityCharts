import React, { useState } from 'react';
import ReactFlow, {
  Background,
  removeElements,
  addEdge,
  ReactFlowProvider,
} from 'react-flow-renderer';
import { notification } from 'antd';
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
import MergeNode from './NodeTypes/MergeNode';
import ForkNode from './NodeTypes/ForkNode';
import JoinNode from './NodeTypes/JoinNode';

const nodeTypes = {
  initialNode: InitialNode,
  finalNode: FinalNode,
  decisionNode: DecisionNode,
  activityNode: ActivityNode,
  eventNode: EventNode,
  mergeNode: MergeNode,
  forkNode: ForkNode,
  joinNode: JoinNode,
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
  {
    id: '6',
    type: 'decisionNode',
    position: { x: 250, y: 350 },
  },
  {
    id: '7',
    type: 'activityNode',
    data: { label: 'Action 3' },
    position: { x: 300, y: 300 },
  },
  {
    id: '8',
    type: 'mergeNode',
    position: { x: 250, y: 350 },
  },
  {
    id: '9',
    type: 'forkNode',
    position: { x: 250, y: 350 },
  },
  {
    id: '10',
    type: 'joinNode',
    position: { x: 250, y: 350 },
  },
];

const Canvas = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    let foundType = false;

    if (
      params.sourceHandle?.toString().includes('constraintTop') &&
      params.targetHandle?.toString().includes('constraintTop')
    ) {
      params.type = 'timeConstraintEdgeTop';
      foundType = true;
    } else if (
      params.sourceHandle?.toString().includes('constraintBottom') &&
      params.targetHandle?.toString().includes('constraintBottom')
    ) {
      params.type = 'timeConstraintEdgeBottom';
      foundType = true;
    } else if (
      params.sourceHandle?.toString().includes('event') &&
      params.targetHandle?.toString().includes('eventLeft')
    ) {
      params.type = 'eventEdgeLeft';
      foundType = true;
    } else if (
      params.sourceHandle?.toString().includes('eventRight') &&
      params.targetHandle?.toString().includes('event')
    ) {
      params.type = 'eventEdgeRight';
      foundType = true;
    } else if (
      (params.sourceHandle?.toString().includes('sourceRight') &&
        params.targetHandle?.toString().includes('targetLeft')) ||
      (params.sourceHandle?.toString().includes('initialHandle') &&
        params.targetHandle?.toString().includes('targetLeft')) ||
      (params.sourceHandle?.toString().includes('sourceRight') &&
        params.targetHandle?.toString().includes('finalHandle')) ||
      (params.sourceHandle?.toString().includes('sourceRight') &&
        params.targetHandle?.toString().includes('decisionNodeLeft')) ||
      ((params.sourceHandle?.toString().includes('decisionNodeTop') ||
        params.sourceHandle?.toString().includes('decisionNodeBottom')) &&
        params.targetHandle?.toString().includes('targetLeft')) ||
      (params.sourceHandle?.toString().includes('sourceRight') &&
        (params.targetHandle?.toString().includes('mergeNodeTop') ||
          params.targetHandle?.toString().includes('mergeNodeBottom'))) ||
      (params.sourceHandle?.toString().includes('mergeNodeRight') &&
        params.targetHandle?.toString().includes('finalHandle')) ||
      (params.sourceHandle?.toString().includes('sourceRight') &&
        params.targetHandle?.toString().includes('forkNodeLeft')) ||
      (params.sourceHandle?.toString().includes('forkNodeRight') &&
        params.targetHandle?.toString().includes('targetLeft')) ||
      (params.sourceHandle?.toString().includes('sourceRight') &&
        params.targetHandle?.toString().includes('joinNodeLeft')) ||
      (params.sourceHandle?.toString().includes('joinNodeRight') &&
        params.targetHandle?.toString().includes('targetLeft'))
    ) {
      params.type = 'controlEdge';
      foundType = true;
    }

    if (foundType) {
      setElements((els) => addEdge(params, els));
    } else {
      notification.error({
        message: 'Could not create edge',
        description:
          'The edge could not be created because the source and the target are not valid.',
      });
    }
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode="loose"
      >
        <Background variant="dots" />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default Canvas;

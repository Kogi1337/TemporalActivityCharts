import React, { useState, useRef } from 'react';
import ReactFlow, {
  Background,
  removeElements,
  addEdge,
  ReactFlowProvider,
  Controls,
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

import './styles/dnd.css';

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

const initialElements = [];
let id = 0;

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
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

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const getId = () => `dndnode_${id++}`;

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    console.log(id);
    console.log(type);
    console.log(position);
    const newNode = {
      id: getId(),
      type,
      position,
    };

    setElements((es) => es.concat(newNode));
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            deleteKeyCode={46} /* 'delete'-key */
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode="loose"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onLoad={onLoad}
          >
            <Background variant="dots" />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;

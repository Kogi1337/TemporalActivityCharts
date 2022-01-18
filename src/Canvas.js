import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  removeElements,
  addEdge,
  Controls,
  useZoomPanHelper,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import InitialNode from "./NodeTypes/InitialNode";
import ActivityNode from "./NodeTypes/ActivityNode";
import FinalNode from "./NodeTypes/FinalNode";
import DecisionNode from "./NodeTypes/DecisionNode";
import TimeConstraintEdgeTop from "./EdgeTypes/TimeConstraintEdgeTop";
import TimeConstraintEdgeBottom from "./EdgeTypes/TimeConstraintEdgeBottom";
import EventNode from "./NodeTypes/EventNode";
import EventEdgeLeft from "./EdgeTypes/EventEdgeLeft";
import EventEdgeRight from "./EdgeTypes/EventEdgeRight";
import ControlEdge from "./EdgeTypes/ControlEdge";
import MergeNode from "./NodeTypes/MergeNode";
import ForkNode from "./NodeTypes/ForkNode";
import JoinNode from "./NodeTypes/JoinNode";
import "./styles/dnd.css";
import { observer } from "mobx-react";

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

const Canvas = observer(({ elementStore }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { transform } = useZoomPanHelper();

  useEffect(() => {
    if (!elementStore.reactFlowInstance)
      elementStore.reactFlowInstance = reactFlowInstance;

    if (!elementStore.transform) elementStore.transform = transform;
  });

  const onElementsRemove = (elementsToRemove) => {
    elementStore.elements = removeElements(
      elementsToRemove,
      elementStore.elements
    );
  };

  const onConnect = (params) => {
    try {
      if (
        params.sourceHandle?.toString().includes("constraintTop") &&
        params.targetHandle?.toString().includes("constraintTop")
      ) {
        params.type = "timeConstraintEdgeTop";
      } else if (
        params.sourceHandle?.toString().includes("constraintBottom") &&
        params.targetHandle?.toString().includes("constraintBottom")
      ) {
        params.type = "timeConstraintEdgeBottom";
      } else if (
        params.sourceHandle?.toString().includes("eventLeft") ||
        params.targetHandle?.toString().includes("eventLeft")
      ) {
        params.type = "eventEdgeLeft";
      } else if (
        params.sourceHandle?.toString().includes("eventRight") ||
        params.targetHandle?.toString().includes("eventRight")
      ) {
        params.type = "eventEdgeRight";
      } else {
        params.type = "controlEdge";
      }

      if (params.sourceHandle !== params.targetHandle) {
        params.data = { elementStore: elementStore };
        elementStore.elements = addEdge(params, elementStore.elements);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    try {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: {},
      };

      elementStore.elements = elementStore.elements.concat(newNode);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elementStore.elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            deleteKeyCode={46} /* 'delete'-key */
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode="loose"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onLoad={setReactFlowInstance}
          >
            <Background variant="dots" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  );
});

export default Canvas;

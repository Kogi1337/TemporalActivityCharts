import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useZoomPanHelper,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import InitialNode from "./NodeTypes/ActivityDiagram/InitialNode";
import ActivityNode from "./NodeTypes/ActivityDiagram/ActivityNode";
import FinalNode from "./NodeTypes/ActivityDiagram/FinalNode";
import DecisionNode from "./NodeTypes/ActivityDiagram/DecisionNode";
import TimeConstraintEdgeTop from "./EdgeTypes/ActivityDiagram/TimeConstraintEdgeTop";
import TimeConstraintEdgeBottom from "./EdgeTypes/ActivityDiagram/TimeConstraintEdgeBottom";
import EventNode from "./NodeTypes/ActivityDiagram/EventNode";
import EventEdgeLeft from "./EdgeTypes/ActivityDiagram/EventEdgeLeft";
import EventEdgeRight from "./EdgeTypes/ActivityDiagram/EventEdgeRight";
import ControlEdge from "./EdgeTypes/ActivityDiagram/ControlEdge";
import MergeNode from "./NodeTypes/ActivityDiagram/MergeNode";
import ForkNode from "./NodeTypes/ActivityDiagram/ForkNode";
import JoinNode from "./NodeTypes/ActivityDiagram/JoinNode";
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
    elementStore.removeElement(elementsToRemove);
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
        elementStore.addEdge(params);
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

      if (type) {
        const newNode = {
          id: uuidv4(),
          type,
          position,
          data: { elementStore: elementStore },
        };

        elementStore.addElement(newNode);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unselect = (ev) => {
    if (ev?.target?.className === "react-flow__pane") {
      elementStore.activeElementId = undefined;
    }
  };

  return (
    <>
      <div id="canvas" className="dndflow" onClick={unselect}>
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

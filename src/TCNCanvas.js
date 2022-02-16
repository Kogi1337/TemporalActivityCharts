import React from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import "./styles/dnd.css";
import { observer } from "mobx-react";
import Node from "./NodeTypes/TCN/Node";
import NodeEdgeTop from "./EdgeTypes/TCN/NodeEdgeTop";
import NodeEdgeBottom from "./EdgeTypes/TCN/NodeEdgeBottom";
import NodeEdgeControl from "./EdgeTypes/TCN/NodeEdgeControl";

const nodeTypes = { node: Node };
const edgeTypes = {
  nodeEdgeTop: NodeEdgeTop,
  nodeEdgeBottom: NodeEdgeBottom,
  nodeEdgeControl: NodeEdgeControl,
};

const TCNCanvas = observer(({ elementStore }) => {
  return (
    <>
      <div id="canvas" className="dndflow">
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elementStore.tcnElements}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode="loose"
          >
            <Background variant="dots" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  );
});

export default TCNCanvas;

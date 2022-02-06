import React from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";

import "./styles/dnd.css";
import { observer } from "mobx-react";

import Node from "./NodeTypes/TCN/Node";

import NodeEdge from "./EdgeTypes/TCN/NodeEdge";

const nodeTypes = { node: Node };
const edgeTypes = { nodeEdge: NodeEdge };

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

import { makeObservable, observable } from "mobx";
import { removeElements, addEdge } from "react-flow-renderer";
export default class ElementStore {
  elements = [];
  tcnElements = [];
  transform = undefined;
  reactFlowInstance = undefined;
  activeElementId = undefined;

  constructor() {
    makeObservable(this, {
      elements: observable,
      tcnElements: observable,
      transform: observable,
      reactFlowInstance: observable,
      activeElementId: observable,
    });
  }

  transformElementsToTCN = () => {
    this.tcnElements = [];

    this.elements.forEach((element) => {
      if (element?.type === "activityNode") {
        let firstActivityNodeId = "first" + element.id;

        const firstActivityNode = {
          id: firstActivityNodeId,
          type: "node",
          position: element.position,
          data: {
            elementStore: this,
            label: (element.data?.name || "") + " .s",
            sourceActivity: element.id,
          },
        };

        this.tcnElements = this.tcnElements.concat(firstActivityNode);

        let secondNodePosition = { ...element.position };
        secondNodePosition.x += 200;

        let secondActivityNodeId = "second" + element.id;

        const secondActivityNode = {
          id: secondActivityNodeId,
          type: "node",
          position: secondNodePosition,
          data: {
            elementStore: this,
            label: (element.data?.name || "") + " .e",
            sourceActivity: element.id,
          },
        };

        this.tcnElements = this.tcnElements.concat(secondActivityNode);

        let edgeDurationMax = {
          type: "nodeEdgeTop",
          source: firstActivityNodeId,
          sourceHandle: "topNodeTcn" + firstActivityNodeId,
          target: secondActivityNodeId,
          targetHandle: "topNodeTcn" + secondActivityNodeId,
          data: {
            label:
              element.data?.durationMax !== undefined
                ? element.data.durationMax * -1
                : -1,
          },
        };
        this.tcnElements = addEdge(edgeDurationMax, this.tcnElements);

        let edgeDurationMin = {
          type: "nodeEdgeBottom",
          source: secondActivityNodeId,
          sourceHandle: "bottomNodeTcn" + secondActivityNodeId,
          target: firstActivityNodeId,
          targetHandle: "bottomNodeTcn" + firstActivityNodeId,
          data: {
            label:
              element.data?.durationMin !== undefined
                ? element.data?.durationMin
                : -1,
          },
        };
        this.tcnElements = addEdge(edgeDurationMin, this.tcnElements);
      } else if (element.type === "initialNode") {
        let firstNodeId = "first" + element.id;

        const firstNode = {
          id: firstNodeId,
          type: "node",
          position: element.position,
          data: {
            elementStore: this,
            label: "Z",
            sourceActivity: element.id,
          },
        };

        this.tcnElements = this.tcnElements.concat(firstNode);

        let secondNodePosition = { ...element.position };
        secondNodePosition.x += 200;

        let secondNodeId = "second" + element.id;

        const secondNode = {
          id: secondNodeId,
          type: "node",
          position: secondNodePosition,
          data: {
            elementStore: this,
            label: "Start",
            sourceActivity: element.id,
          },
        };

        this.tcnElements = this.tcnElements.concat(secondNode);

        let edgeTop = {
          type: "nodeEdgeTop",
          source: secondNodeId,
          sourceHandle: "topNodeTcn" + secondNodeId,
          target: firstNodeId,
          targetHandle: "topNodeTcn" + firstNodeId,
          data: {
            label: 0,
          },
        };
        this.tcnElements = addEdge(edgeTop, this.tcnElements);

        let edgeBottom = {
          type: "nodeEdgeBottom",
          source: firstNodeId,
          sourceHandle: "bottomNodeTcn" + firstNodeId,
          target: secondNodeId,
          targetHandle: "bottomNodeTcn" + secondNodeId,
          data: {
            label: 0,
          },
        };
        this.tcnElements = addEdge(edgeBottom, this.tcnElements);
      } else if (element.type === "finalNode") {
        const finalNode = {
          id: element.id,
          type: "node",
          position: element.position,
          data: {
            elementStore: this,
            label: "End",
            sourceActivity: element.id,
          },
        };

        this.tcnElements = this.tcnElements.concat(finalNode);
      }
    });

    this.elements.forEach((element) => {
      if (element.type === "controlEdge") {
        let targetType = this.elements.find(
          (x) => x.id === element.target
        ).type;

        if (targetType === "finalNode") {
          let controlEdge = {
            type: "nodeEdgeControl",
            source: element.target,
            sourceHandle: "leftNodeTcn" + element.target,
            target: "second" + element.source,
            targetHandle: "rightNodeTcnsecond" + element.source,
          };
          this.tcnElements = addEdge(controlEdge, this.tcnElements);
        } else {
          let controlEdge = {
            type: "nodeEdgeControl",
            source: "first" + element.target,
            sourceHandle: "leftNodeTcnfirst" + element.target,
            target: "second" + element.source,
            targetHandle: "rightNodeTcnsecond" + element.source,
          };
          this.tcnElements = addEdge(controlEdge, this.tcnElements);
        }
      } else if (element.type.includes("timeConstraintEdge")) {
        if (element.data?.constraintType === "LBC") {
          let source, sourceHandle, target, targetHandle;

          if (element.targetHandle.includes("Left")) {
            source = "first" + element.target;
            sourceHandle = "topNodeTcn" + source;
          } else if (element.targetHandle.includes("Right")) {
            source = "second" + element.target;
            sourceHandle = "topNodeTcn" + source;
          }

          if (element.sourceHandle.includes("Left")) {
            target = "first" + element.source;
            targetHandle = "topNodeTcn" + target;
          } else if (element.sourceHandle.includes("Right")) {
            target = "second" + element.source;
            targetHandle = "topNodeTcn" + target;
          }

          let constraintEdge = {
            type: "nodeEdgeTop",
            source: source,
            sourceHandle: sourceHandle,
            target: target,
            targetHandle: targetHandle,
            data: {
              label:
                element.data?.label !== undefined
                  ? element.data?.label * -1
                  : -1,
            },
          };
          this.tcnElements = addEdge(constraintEdge, this.tcnElements);
        } else {
          let source, sourceHandle, target, targetHandle;

          if (element.sourceHandle.includes("Left")) {
            source = "first" + element.source;
            sourceHandle = "bottomNodeTcn" + source;
          } else if (element.sourceHandle.includes("Right")) {
            source = "second" + element.source;
            sourceHandle = "bottomNodeTcn" + source;
          }

          if (element.targetHandle.includes("Left")) {
            target = "first" + element.target;
            targetHandle = "bottomNodeTcn" + target;
          } else if (element.targetHandle.includes("Right")) {
            target = "second" + element.target;
            targetHandle = "bottomNodeTcn" + target;
          }

          let constraintEdge = {
            type: "nodeEdgeBottom",
            source: source,
            sourceHandle: sourceHandle,
            target: target,
            targetHandle: targetHandle,
            data: {
              label:
                element.data?.label !== undefined ? element.data?.label : -1,
            },
          };

          this.tcnElements = addEdge(constraintEdge, this.tcnElements);
        }
      }
    });
  };

  addElement = (node) => {
    this.elements = this.elements.concat(node);
    this.transformElementsToTCN();
  };

  addEdge = (edge) => {
    this.elements = addEdge(edge, this.elements);
    this.transformElementsToTCN();
  };

  removeElement = (element) => {
    this.elements = removeElements(element, this.elements);
    this.transformElementsToTCN();
  };
}

import { makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
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
        const firstActivityNode = {
          id: uuidv4(),
          type: "node",
          position: element.position,
          data: {
            elementStore: this,
            label: (element.data?.name || "") + " .s",
          },
        };

        this.tcnElements = this.tcnElements.concat(firstActivityNode);

        let secondNodePosition = { ...element.position };
        secondNodePosition.x += 200;

        const secondActivityNode = {
          id: uuidv4(),
          type: "node",
          position: secondNodePosition,
          data: {
            elementStore: this,
            label: (element.data?.name || "") + " .e",
          },
        };

        this.tcnElements = this.tcnElements.concat(secondActivityNode);

        if (element.data.durationMin) {
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

import { makeObservable, observable } from "mobx";

export default class ElementStore {
  elements = [];
  transform = undefined;
  reactFlowInstance = undefined;

  constructor() {
    makeObservable(this, {
      elements: observable,
      transform: observable,
      reactFlowInstance: observable,
    });
  }
}

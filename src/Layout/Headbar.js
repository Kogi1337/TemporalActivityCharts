import React from "react";
import { Dropdown, Menu, Upload, Button, message, Layout } from "antd";
import dayjs from "dayjs";
import {
  DownloadOutlined,
  UploadOutlined,
  SettingOutlined,
  DownOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { create } from "xmlbuilder2";
const { Header } = Layout;

export default class Headbar extends React.Component {
  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  beforeUpload = (file) => {
    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        const flow = JSON.parse(e.target.result);

        if (flow) {
          const [x = 0, y = 0] = flow.position;
          this.props.elementStore.elements = flow.elements || [];
          this.props.elementStore.transform({ x, y, zoom: flow.zoom || 0 });

          this.props.elementStore.elements.forEach((element) => {
            if (!element?.data?.elementStore)
              element.data.elementStore = this.props.elementStore;
          });

          this.props.elementStore.transformElementsToTCN();
        }
      };
      reader.readAsText(file);
      message.success(`${file?.name} file uploaded successfully`);

      // Prevent upload
      return false;
    } catch (err) {
      console.log(err);
    }
  };

  downloadAsFile = async (array, fileName) => {
    try {
      const json = JSON.stringify(array);
      const blob = new Blob([json], { type: "application/json" });
      const href = await URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  convertToJson = () => {
    try {
      let elements = this.props.elementStore?.elements.slice();
      elements.forEach((element) => {
        if (element?.data?.elementStore) element.data.elementStore = undefined;
      });
      let metaData = {
        elementCount: elements.length,
        activityNodesCount:
          elements.filter((x) => x.type === "activityNode").length || 0,
        decisionNodesCount:
          elements.filter((x) => x.type === "decisionNode").length || 0,
        mergeNodesCount:
          elements.filter((x) => x.type === "mergeNode").length || 0,
        parameterNodesCount:
          elements.filter((x) => x.type === "eventNode").length || 0,
        forkNodesCount:
          elements.filter((x) => x.type === "forkNode").length || 0,
        joinNodesCount:
          elements.filter((x) => x.type === "joinNode").length || 0,
        controlFlowsCount:
          elements.filter((x) => x.type.includes("controlEdge")).length || 0,
        parameterEdgesCount:
          elements.filter((x) => x.type.includes("eventEdge")).length || 0,
        timeConstraintsCount:
          elements.filter((x) => x.type.includes("timeConstraint")).length || 0,
      };
      this.downloadAsFile(elements, "elements_" + dayjs().format("DD.MM.YYYY"));
      this.downloadAsFile(metaData, "metadata_" + dayjs().format("DD.MM.YYYY"));
      elements.forEach((element) => {
        if (!element?.data?.elementStore)
          element.data.elementStore = this.props.elementStore;
      });
    } catch (err) {
      console.log(err);
    }
  };

  onClickDownloadForSave = () => {
    try {
      this.props.elementStore.reactFlowInstance
        .toObject()
        .elements.forEach((element) => {
          if (element?.data?.elementStore)
            element.data.elementStore = undefined;
        });
      this.downloadAsFile(
        this.props.elementStore?.reactFlowInstance?.toObject(),
        "activity_chart_" + dayjs().format("DD.MM.YYYY")
      );
      this.props.elementStore.reactFlowInstance
        .toObject()
        .elements.forEach((element) => {
          if (!element?.data?.elementStore)
            element.data.elementStore = this.props.elementStore;
        });
    } catch (err) {
      console.log(err);
    }
  };

  addKeyToXmlElement = (root, id, forWho, desc, defaultValue) => {
    root
      .root()
      .ele("key", { id: id, for: forWho })
      .ele("desc")
      .txt(desc)
      .up()
      .ele("default")
      .txt(defaultValue);
  };

  addKeyElementsToXml(root) {
    let elements = this.props.elementStore.elements;
    let tcnElements = this.props.elementStore.tcnElements;

    let nContingent = elements.filter(
      (x) => x.type === "activityNode" && x.data?.durationType === "contingent"
    ).length;

    let nEdges = tcnElements.filter(
      (x) =>
        x.type === "nodeEdgeTop" ||
        x.type === "nodeEdgeBottom" ||
        x.type === "nodeEdgeControl"
    ).length;

    let nVerticles = tcnElements.filter((x) => x.type === "node").length;

    //Add key elements
    this.addKeyToXmlElement(
      root,
      "nContingent",
      "graph",
      "Number of contingents in the graph",
      nContingent
    );

    this.addKeyToXmlElement(
      root,
      "nObservedProposition",
      "graph",
      "Number of observed propositions in the graph",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "NetworkType",
      "graph",
      "Network Type",
      "CSTNU"
    );

    this.addKeyToXmlElement(
      root,
      "nEdges",
      "graph",
      "Number of edges in the graph",
      nEdges
    );

    this.addKeyToXmlElement(
      root,
      "nVertices",
      "graph",
      "Number of vertices in the graph",
      nVerticles
    );

    this.addKeyToXmlElement(root, "Name", "graph", "Graph Name", "ex1_stnu");

    this.addKeyToXmlElement(
      root,
      "Obs",
      "node",
      "Proposition Observed. Value specification: [a-zA-F]",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "x",
      "node",
      "The x coordinate for the visualization. A positive value.",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "Label",
      "node",
      "Label. Format: [¬[a-zA-F]|[a-zA-F]]+|⊡",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "y",
      "node",
      "The y coordinate for the visualization. A positive value.",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "Potential",
      "node",
      "Labeled Potential Values. Format: {[('node name (no case modification)', 'integer', 'label') ]+}|{}",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "Type",
      "node",
      "Type: Possible values: contingent|requirement|derived|internal.",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "Value",
      "node",
      "Value for STN edge. Format: 'integer'",
      "0"
    );

    this.addKeyToXmlElement(
      root,
      "LabeledValue",
      "node",
      "Case Value. Format: 'LC(NodeName):integer' or 'UC(NodeName):integer'",
      "0"
    );
  }

  convertTcnToXml = async () => {
    let tcnElements = this.props.elementStore.tcnElements;
    let mainpart = `<?xml version="1.0" encoding="UTF-8"?>
    <graphml xmlns="http://graphml.graphdrawing.org/xmlns/graphml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns/graphml"></graphml>`;
    const root = create(mainpart);

    this.addKeyElementsToXml(root);

    let elements = this.props.elementStore.elements;

    let nContingent = elements.filter(
      (x) => x.type === "activityNode" && x.data?.durationType === "contingent"
    ).length;

    let nEdges = tcnElements.filter(
      (x) =>
        x.type === "nodeEdgeTop" ||
        x.type === "nodeEdgeBottom" ||
        x.type === "nodeEdgeControl"
    ).length;

    let nVerticles = tcnElements.filter((x) => x.type === "node").length;

    let ele = root
      .root()
      .ele("graph", { edgedefault: "directed" })
      .ele("data", { key: "nContingent" })
      .txt(nContingent)
      .up()
      .ele("data", { key: "NetworkType" })
      .txt("STNU")
      .up()
      .ele("data", { key: "nEdges" })
      .txt(nEdges)
      .up()
      .ele("data", { key: "nVertices" })
      .txt(nVerticles)
      .up()
      .ele("data", { key: "Name" })
      .txt("ex1_stnu")
      .up();

    let edgeCounter = 0;
    tcnElements.forEach((element) => {
      //So we generate a node element in xml
      if (element.type === "node") {
        ele
          .ele("node", { id: element.data?.label })
          .ele("data", { key: "x" })
          .txt(element.position?.x)
          .up()
          .ele("data", { key: "y" })
          .txt(element.position?.y)
          .up();
      } else if (element.type === "nodeEdgeControl") {
        let source = tcnElements.find((x) => x.id === element.source);
        let target = tcnElements.find((x) => x.id === element.target);
        ele
          .ele("edge", {
            id: "e" + edgeCounter,
            source: source.data?.label,
            target: target.data?.label,
          })
          .ele("data", { key: "Type" })
          .txt("requirement")
          .up()
          .ele("data", { key: "Value" })
          .txt(element.data?.label || 0)
          .up();
        edgeCounter++;
      } else if (
        element.type === "nodeEdgeTop" ||
        element.type === "nodeEdgeBottom"
      ) {
        let source = tcnElements.find((x) => x.id === element.source);
        let target = tcnElements.find((x) => x.id === element.target);
        ele
          .ele("edge", {
            id: "e" + edgeCounter,
            source: source.data?.label,
            target: target.data?.label,
          })
          .ele("data", { key: "Type" })
          .txt("contingent")
          .up()
          .ele("data", { key: "Value" })
          .txt(element.data?.label || " ")
          .up();
        edgeCounter++;
      }
    });

    // convert the XML tree to string
    const xmlString = root.end({ prettyPrint: true });

    try {
      const blob = new Blob([xmlString], { type: "application/xml" });
      const href = await URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "tcn_" + dayjs().format("DD.MM.YYYY") + ".xml";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let menu = (
      <Menu>
        <Menu.Item key="1">
          <Upload
            accept=".json"
            customRequest={this.dummyRequest}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <UploadOutlined /> Import from file
          </Upload>
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onClickDownloadForSave}>
          <DownloadOutlined /> Save for import
        </Menu.Item>
        <Menu.Item key="3" onClick={this.convertToJson}>
          <DownloadOutlined /> Export with metadata
        </Menu.Item>
        <Menu.Item key="4" onClick={this.convertTcnToXml}>
          <ExportOutlined /> Download TCN as XML-File
        </Menu.Item>
      </Menu>
    );

    return (
      <Header class="myHeader">
        <div className="headbarTitle">
          <h1>Temporal activity charts</h1>
        </div>
        <div className="optionsDropdown">
          <Dropdown overlay={menu}>
            <Button icon={<SettingOutlined />}>
              Options <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

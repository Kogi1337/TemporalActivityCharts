import React from "react";
import { Dropdown, Menu, Upload, Button, message, Layout } from "antd";
import dayjs from "dayjs";
import {
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
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

  render() {
    let menu = (
      <Menu>
        <Menu.Item key="1">
          <ExportOutlined /> Export to temporal constraint network
        </Menu.Item>
        <Menu.Item key="2">
          <Upload
            accept=".json"
            customRequest={this.dummyRequest}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <UploadOutlined /> Import from file
          </Upload>
        </Menu.Item>
        <Menu.Item key="3" onClick={this.onClickDownloadForSave}>
          <DownloadOutlined /> Save for import
        </Menu.Item>
        <Menu.Item key="4" onClick={this.convertToJson}>
          <DownloadOutlined /> Export with metadata
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

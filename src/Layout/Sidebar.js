import React from "react";
import { Layout, Menu } from "antd";
import Activity from "../images/activity.png";
import decisionNode from "../images/decisionNode.png";
import finalNode from "../images/finalNode.png";
import forkNode from "../images/forkNode.png";
import initialNode from "../images/initialNode.png";
import joinNode from "../images/joinNode.png";
import mergeNode from "../images/mergeNode.png";
import parameterNode from "../images/parameterNode.png";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Sidebar extends React.Component {
  onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  render() {
    return (
      <Sider width={270} collapsible={false}>
        <div className="sidebar">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["components"]}
            className="sidebarMenu"
          >
            <SubMenu key="components" title="Components">
              <Menu.Item
                style={{ height: "150px" }}
                key="activityNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "activityNode")}
              >
                <div>Activity</div>
                <img src={Activity} alt="activity_image" height={75} />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="initialNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "initialNode")}
              >
                <div>Initial Node</div>
                <img src={initialNode} alt="initialNode_image" height={75} />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="finalNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "finalNode")}
              >
                <div>Final Node</div>
                <img src={finalNode} alt="finalNode_image" height={75} />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="decisionNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "decisionNode")}
              >
                <div>Decision Node</div>
                <img src={decisionNode} alt="decisionNode_image" height={75} />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="mergeNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "mergeNode")}
              >
                <div>Merge Node</div>
                <img src={mergeNode} alt="mergeNode_image" height={75} />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="parameterNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "eventNode")}
              >
                <div>Parameter Node</div>
                <img
                  src={parameterNode}
                  alt="parameterNode_image"
                  height={75}
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="forkNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "forkNode")}
              >
                <div>Fork Node</div>
                <img src={forkNode} alt="forkNode_image" height={75} />
              </Menu.Item>

              <Menu.Item
                style={{ height: "150px" }}
                key="joinNode"
                draggable="true"
                onDragStart={(event) => this.onDragStart(event, "joinNode")}
              >
                <div>Join Node</div>
                <img src={joinNode} alt="joinNode_image" height={75} />
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Sider>
    );
  }
}

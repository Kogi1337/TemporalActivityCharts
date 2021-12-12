import React from 'react';
import { Layout, Menu } from 'antd';
import Activity from '../images/activity.png';
import controlFlow from '../images/controlFlow.png';
import decisionNode from '../images/decisionNode.png';
import finalNode from '../images/finalNode.png';
import forkNode from '../images/forkNode.png';
import initialNode from '../images/initialNode.png';
import joinNode from '../images/joinNode.png';
import mergeNode from '../images/mergeNode.png';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Sidebar extends React.Component {
  render() {
    return (
      <Sider width={270}>
        <div className="sidebar">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['components']}
            className="sidebarMenu"
          >
            <SubMenu key="components" title="Components">
              <div className="componentsGrid">
                <img
                  src={Activity}
                  alt="activity_image"
                  height={75}
                  width={75}
                />

                <img
                  src={controlFlow}
                  alt="controlFlow_image"
                  height={75}
                  width={75}
                />

                <img
                  src={initialNode}
                  alt="initialNode_image"
                  height={75}
                  width={75}
                />

                <img
                  src={finalNode}
                  alt="finalNode_image"
                  height={75}
                  width={75}
                />

                <img
                  src={decisionNode}
                  alt="decisionNode_image"
                  height={75}
                  width={75}
                />

                <img
                  src={mergeNode}
                  alt="mergeNode_image"
                  height={75}
                  width={75}
                />

                <img
                  src={forkNode}
                  alt="forkNode_image"
                  height={75}
                  width={75}
                />

                <img
                  src={joinNode}
                  alt="joinNode_image"
                  height={75}
                  width={75}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
      </Sider>
    );
  }
}

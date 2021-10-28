import React from 'react';
import { Layout, Menu } from 'antd';
import Activity from '../images/activity.png';
import Action from '../images/action.png';
import controlFlow from '../images/controlFlow.png';
import decisionNode from '../images/decisionNode.png';
import finalNode from '../images/finalNode.png';
import forkNode from '../images/forkNode.png';
import initialNode from '../images/initialNode.png';
import joinNode from '../images/joinNode.png';
import mergeNode from '../images/mergeNode.png';
import objectFlow from '../images/objectFlow.png';
import swimlane from '../images/swimlane.png';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Sidebar extends React.Component {
  render() {
    return (
      <Sider width={270}>
        <div className="headbarTitle">
          <h1>Temporal activity charts</h1>
        </div>

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
                  height={50}
                  width={50}
                />

                <img src={Action} alt="action_image" height={50} width={50} />

                <img
                  src={controlFlow}
                  alt="controlFlow_image"
                  height={50}
                  width={50}
                />

                <img
                  src={objectFlow}
                  alt="objectFlow_image"
                  height={50}
                  width={50}
                />

                <img
                  src={initialNode}
                  alt="initialNode_image"
                  height={50}
                  width={50}
                />

                <img
                  src={finalNode}
                  alt="finalNode_image"
                  height={50}
                  width={50}
                />

                <img
                  src={decisionNode}
                  alt="decisionNode_image"
                  height={50}
                  width={50}
                />

                <img
                  src={mergeNode}
                  alt="mergeNode_image"
                  height={50}
                  width={50}
                />

                <img
                  src={forkNode}
                  alt="forkNode_image"
                  height={50}
                  width={50}
                />

                <img
                  src={joinNode}
                  alt="joinNode_image"
                  height={50}
                  width={50}
                />

                <img
                  src={swimlane}
                  alt="swimlane_image"
                  height={50}
                  width={50}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>

        {/* <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['components']}
        >
          <SubMenu key="components" title="Components">
            <Menu.Item key="1" style={{ height: '100px' }}>
              <img
                src={Activity}
                alt="activity_image"
                height={80}
                width={110}
              />
            </Menu.Item>
            <Menu.Item key="2" style={{ height: '100px' }}>
              <img src={Action} alt="action_image" height={80} width={110} />
            </Menu.Item>
            <Menu.Item key="3" style={{ height: '100px' }}>
              <img
                src={controlFlow}
                alt="controlFlow_image"
                height={80}
                width={110}
              />
            </Menu.Item>
            <Menu.Item key="4" style={{ height: '100px' }}>
              Object flow
            </Menu.Item>
            <Menu.Item key="5" style={{ height: '100px' }}>
              Initial node
            </Menu.Item>
            <Menu.Item key="6" style={{ height: '100px' }}>
              <img
                src={finalNode}
                alt="finalNode_image"
                height={80}
                width={110}
              />
            </Menu.Item>
            <Menu.Item key="7" style={{ height: '100px' }}>
              <img
                src={decisionNode}
                alt="decisionNode_image"
                height={80}
                width={110}
              />
            </Menu.Item>
            <Menu.Item key="8">Decision node</Menu.Item>
            <Menu.Item key="9">Merge node</Menu.Item>
            <Menu.Item key="10">Fork node</Menu.Item>
            <Menu.Item key="11">Join node</Menu.Item>
            <Menu.Item key="12">Swimlane and partition</Menu.Item>
          </SubMenu>
        </Menu> */}
      </Sider>
    );
  }
}

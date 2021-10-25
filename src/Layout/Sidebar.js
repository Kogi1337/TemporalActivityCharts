import React from 'react';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Sidebar extends React.Component {
  render() {
    return (
      <Sider width="250">
        <div className="headbarTitle">
          <h1>Temporal activity charts</h1>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['components']}
          style={{ height: '100vh' }}
        >
          <SubMenu key="components" title="Components">
            <Menu.Item key="1">Activity</Menu.Item>
            <Menu.Item key="2">Action</Menu.Item>
            <Menu.Item key="3">Control flow</Menu.Item>
            <Menu.Item key="4">Object flow</Menu.Item>
            <Menu.Item key="5">Initial node</Menu.Item>
            <Menu.Item key="6">Activity final node</Menu.Item>
            <Menu.Item key="7">Object node</Menu.Item>
            <Menu.Item key="8">Decision node</Menu.Item>
            <Menu.Item key="9">Merge node</Menu.Item>
            <Menu.Item key="10">Fork node</Menu.Item>
            <Menu.Item key="11">Join node</Menu.Item>
            <Menu.Item key="12">Swimlane and partition</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

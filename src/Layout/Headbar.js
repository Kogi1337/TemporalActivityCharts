import React from 'react';
import { Layout, Button, Dropdown, Menu } from 'antd';
import {
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
  SettingOutlined,
  DownOutlined,
} from '@ant-design/icons';
const { Header } = Layout;

export default class Headbar extends React.Component {
  render() {
    let menu = (
      <Menu>
        <Menu.Item key="1">
          <ExportOutlined /> Export to temporal constraint network
        </Menu.Item>
        <Menu.Item key="2">
          <UploadOutlined /> Import from file
        </Menu.Item>
        <Menu.Item key="3">
          <DownloadOutlined /> Download as file
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="header">
        <Dropdown overlay={menu} className="optionsDropdown">
          <Button icon={<SettingOutlined />}>
            Options <DownOutlined />
          </Button>
        </Dropdown>
      </Header>
    );
  }
}

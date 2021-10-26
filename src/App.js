import './styles/App.css';
import React from 'react';
import Sidebar from './Layout/Sidebar';
import { Layout, Button, Dropdown, Menu } from 'antd';
import {
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
  SettingOutlined,
  DownOutlined,
} from '@ant-design/icons';
const { Content } = Layout;

class App extends React.Component {
  render() {
    let menu = (
      <Menu style={{ borderRadius: 20 }}>
        <Menu.Item>
          <ExportOutlined /> Export to temporal constraint network
        </Menu.Item>
        <Menu.Item>
          <UploadOutlined /> Import from file
        </Menu.Item>
        <Menu.Item>
          <DownloadOutlined /> Download as file
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Sidebar />
        <Content>
          <Dropdown overlay={menu} className="optionsDropdown">
            <Button shape="round" icon={<SettingOutlined />}>
              Options <DownOutlined />
            </Button>
          </Dropdown>
        </Content>
      </Layout>
    );
  }
}

export default App;

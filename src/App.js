import './styles/App.css';
import React from 'react';
import Sidebar from './Layout/Sidebar';
import Headbar from './Layout/Headbar';
import { Layout, Button, Dropdown, Menu } from 'antd';
import {
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
  SettingOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Canvas from './Canvas';
const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Sidebar />
          {/*<Headbar />*/}
          <Content>
            <Canvas />
          </Content>
        </Layout>
      </>
    );
  }
}

export default App;

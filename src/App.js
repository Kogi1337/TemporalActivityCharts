import './styles/App.css';
import React from 'react';
import Sidebar from './Layout/Sidebar';
import { Layout, Button } from 'antd';
import {
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
} from '@ant-design/icons';
const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <Content>
          <div className="mainContent">
            <Button className="buttons" shape="round" icon={<ExportOutlined />}>
              Export to temporal constraint network
            </Button>

            <Button className="buttons" shape="round" icon={<UploadOutlined />}>
              Import from file
            </Button>

            <Button
              className="buttons"
              shape="round"
              icon={<DownloadOutlined />}
            >
              Download as file
            </Button>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default App;

import './styles/App.css';
import React from 'react';
import Sidebar from './Layout/Sidebar';
import Headbar from './Layout/Headbar';
import { Layout } from 'antd';
import Canvas from './Canvas';
const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Headbar />
          <Layout>
            <Sidebar />
            <Content>
              <Canvas />
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;

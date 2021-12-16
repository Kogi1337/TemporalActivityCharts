import './styles/App.css';
import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
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
              <ReactFlowProvider>
                <Canvas />
              </ReactFlowProvider>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;

import "./styles/App.css";
import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Sidebar from "./Layout/Sidebar";
import Headbar from "./Layout/Headbar";
import { Layout } from "antd";
import Canvas from "./Canvas";
import { configure } from "mobx";
import ElementStore from "./Stores/ElementsStore";

configure({ useProxies: "never", enforceActions: "never" }); // Or "ifavailable".
const { Content } = Layout;
const elementStore = new ElementStore();

class App extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Headbar elementStore={elementStore} />
          <Layout>
            <Sidebar />
            <Content>
              <ReactFlowProvider>
                <Canvas elementStore={elementStore} />
              </ReactFlowProvider>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;

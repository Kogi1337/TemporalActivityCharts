import "./styles/App.css";
import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Sidebar from "./Layout/Sidebar";
import Headbar from "./Layout/Headbar";
import { Layout, Tabs } from "antd";
import Canvas from "./Canvas";
import TCNCanvas from "./TCNCanvas";
import { configure } from "mobx";
import ElementStore from "./Stores/ElementsStore";

const { TabPane } = Tabs;

configure({ useProxies: "never", enforceActions: "never" }); // Or "ifavailable".
const { Content } = Layout;
const elementStore = new ElementStore();

class App extends React.Component {
  render() {
    let canvasHeight = window.innerHeight - 100;
    let canvasStyle = { height: canvasHeight };

    return (
      <>
        <Layout>
          <Headbar elementStore={elementStore} />
          <Layout>
            <Sidebar />
            <Content>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Activity Diagram" key="1" style={canvasStyle}>
                  <ReactFlowProvider>
                    <Canvas elementStore={elementStore} />
                  </ReactFlowProvider>
                </TabPane>

                <TabPane
                  tab="Temporal Constraint Network"
                  key="2"
                  style={canvasStyle}
                >
                  <TCNCanvas elementStore={elementStore} />
                </TabPane>
              </Tabs>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;

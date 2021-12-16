import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

export default class Headbar extends React.Component {
  render() {
    return (
      <Header class="myHeader">
        <div className="headbarTitle">
          <h1>Temporal activity charts</h1>
        </div>
      </Header>
    );
  }
}

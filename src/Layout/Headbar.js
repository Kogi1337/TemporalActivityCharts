import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

export default class Headbar extends React.Component {
  render() {
    return (
      <Header style={{ paddingLeft: '24px', background: '#113453' }}></Header>
    );
  }
}

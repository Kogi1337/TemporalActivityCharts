import React, { memo } from 'react';
import { Input } from 'antd';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
  return (
    <div className="eventNode">
      <Handle
        id="eventLeft"
        type="target"
        position="left"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <Input
        className="eventNodeLabel"
        placeholder="Parameter"
        defaultValue={data?.label}
      />

      <Handle
        id="eventRight"
        type="source"
        position="right"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

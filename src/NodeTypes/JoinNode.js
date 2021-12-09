import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ id, data, isConnectable }) => {
  const path = 'M 0 0 L 20 0 L 150 150 L 0 150 L 0 0';

  return (
    <div className="forkNode">
      <svg height="150" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d={path} className="forkNodePath" />
      </svg>

      <Handle
        id={'joinNodeLeft1' + id}
        position="left"
        style={{ background: '#000', top: '25%' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <Handle
        id={'joinNodeLeft2' + id}
        position="left"
        style={{ background: '#000', top: '75%' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <Handle
        id={'joinNodeRight' + id}
        position="right"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

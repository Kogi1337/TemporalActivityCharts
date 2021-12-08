import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ id, data, isConnectable }) => {
  const path = 'M 55 0 L 110 55 L 55 110 L 0 55 L 55 0';

  return (
    <div className="decisionNode">
      <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
        <path d={path} className="decisionNodePath" />
      </svg>

      <Handle
        id={'decisionNodeLeft' + id}
        position="left"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        id={'decisionNodeRight' + id}
        position="right"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

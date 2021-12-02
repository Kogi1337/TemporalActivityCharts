import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
  return (
    <div className="finalNode">
      <Handle
        type="target"
        position="top"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

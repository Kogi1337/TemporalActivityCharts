import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ id, data, isConnectable }) => {
  return (
    <div className="initialNode">
      <Handle
        id={'initialHandle' + id}
        position="bottom"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

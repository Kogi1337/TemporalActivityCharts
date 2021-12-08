import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ id, data, isConnectable }) => {
  return (
    <div className="finalNode">
      <Handle
        id={'finalHandle' + id}
        position="top"
        style={{ background: '#000' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

import React, { memo } from 'react';
import { Input } from 'antd';
import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
  return (
    <div className="activityNode">
      <div className="activityNodeLeft">
        <Handle
          id="constraintTopLeft"
          position="top"
          style={{ background: '#000', left: '12.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id="targetLeft"
          type="target"
          position="left"
          style={{ background: '#000' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id="constraintBottomLeft"
          position="bottom"
          style={{ background: '#000', left: '12.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className="activityNodeMiddle">
        <Handle
          id="eventTopLeft"
          position="top"
          style={{ background: '#000', left: '35%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id="eventTopRight"
          position="top"
          style={{ background: '#000', left: '65%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Input
          defaultValue={data?.label}
          placeholder="Name"
          className="activityInputName"
        />

        <Input
          defaultValue={data?.duration}
          placeholder="Duration"
          className="activityInputName"
        />

        <Input
          defaultValue={data?.continuousness}
          placeholder="Continuousness"
          className="activityInputName"
        />

        <Handle
          id="eventBottomLeft"
          position="bottom"
          style={{ background: '#000', left: '35%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id="eventBottomRight"
          position="bottom"
          style={{ background: '#000', left: '65%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className="activityNodeRight">
        <Handle
          id="constraintTopRight"
          position="top"
          style={{ background: '#000', left: '87.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id="sourceRight"
          type="source"
          position="right"
          style={{ background: '#000' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id="constraintBottomRight"
          position="bottom"
          style={{ background: '#000', left: '87.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

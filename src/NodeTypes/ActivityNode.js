import React, { memo } from 'react';
import { Input } from 'antd';
import { Handle } from 'react-flow-renderer';

export default memo(({ id, data, isConnectable }) => {
  return (
    <div className="activityNode">
      <div className="activityNodeLeft">
        <Handle
          id={'constraintTopLeft' + id}
          position="top"
          style={{ background: '#000', left: '12.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        <Handle
          id={'targetLeft' + id}
          position="left"
          style={{ background: '#000' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={'constraintBottomLeft' + id}
          position="bottom"
          style={{ background: '#000', left: '12.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className="activityNodeMiddle">
        <Handle
          id={'eventTopLeft' + id}
          position="top"
          style={{ background: '#000', left: '35%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={'eventTopRight' + id}
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
          id={'eventBottomLeft' + id}
          position="bottom"
          style={{ background: '#000', left: '35%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={'eventBottomRight' + id}
          position="bottom"
          style={{ background: '#000', left: '65%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className="activityNodeRight">
        <Handle
          id={'constraintTopRight' + id}
          position="top"
          style={{ background: '#000', left: '87.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={'sourceRight' + id}
          position="right"
          style={{ background: '#000' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={'constraintBottomRight' + id}
          position="bottom"
          style={{ background: '#000', left: '87.5%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

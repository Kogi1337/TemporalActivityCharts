import React, { memo } from "react";
import { Input, InputNumber, Select } from "antd";
import { Handle } from "react-flow-renderer";

export default memo(({ id, data, isConnectable }) => {
  return (
    <div className='activityNode'>
      <div className='activityNodeLeft'>
        <Handle
          id={"constraintTopLeft" + id}
          position='top'
          style={{ background: "#000", left: "12.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <Handle
          id={"targetLeft" + id}
          position='left'
          style={{ background: "#000" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={"constraintBottomLeft" + id}
          position='bottom'
          style={{ background: "#000", left: "12.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className='activityNodeMiddle'>
        <Handle
          id={"eventTopLeft" + id}
          position='top'
          style={{ background: "#000", left: "35%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={"eventTopRight" + id}
          position='top'
          style={{ background: "#000", left: "65%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Input
          defaultValue={data?.name}
          onChange={(ev) => (data.name = ev.target.value)}
          placeholder='Name'
          className='activityInputName'
        />

        <div>
          <span className='fontSizeDuration'>[</span>
          <InputNumber
            min={0}
            defaultValue={data?.durationMin}
            onChange={(value) => (data.durationMin = value)}
            placeholder='Duration'
            className='activityInputDuration'
          />
          <span className='fontSizeDuration'>,</span>
          <InputNumber
            min={0}
            defaultValue={data?.durationMax}
            onChange={(value) => (data.durationMax = value)}
            placeholder='Duration'
            className='activityInputDuration'
          />
          <span className='fontSizeDuration'>]</span>
        </div>

        <Select
          defaultValue={data?.contingentness}
          onChange={(ev) => (data.contingentness = ev)}
          placeholder='Contingentness'
          className='activityInputName'
        >
          <Select.Option value='continous'>Contingent</Select.Option>
          <Select.Option value='semiContinous'>Semi-Contingent</Select.Option>
          <Select.Option value='nonContinous'>Non-Contingent</Select.Option>
        </Select>

        <Handle
          id={"eventBottomLeft" + id}
          position='bottom'
          style={{ background: "#000", left: "35%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={"eventBottomRight" + id}
          position='bottom'
          style={{ background: "#000", left: "65%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      </div>

      <div className='activityNodeRight'>
        <Handle
          id={"constraintTopRight" + id}
          position='top'
          style={{ background: "#000", left: "87.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={"sourceRight" + id}
          position='right'
          style={{ background: "#000" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />

        <Handle
          id={"constraintBottomRight" + id}
          position='bottom'
          style={{ background: "#000", left: "87.5%" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

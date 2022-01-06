import React, { useState, useRef } from 'react';
import ReactFlow, {
  Background,
  removeElements,
  addEdge,
  Controls,
  useZoomPanHelper,
} from 'react-flow-renderer';
import {
  DownloadOutlined,
  UploadOutlined,
  ExportOutlined,
  SettingOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown, Menu, Upload, Button, message } from 'antd';
import InitialNode from './NodeTypes/InitialNode';
import ActivityNode from './NodeTypes/ActivityNode';
import FinalNode from './NodeTypes/FinalNode';
import DecisionNode from './NodeTypes/DecisionNode';
import TimeConstraintEdgeTop from './EdgeTypes/TimeConstraintEdgeTop';
import TimeConstraintEdgeBottom from './EdgeTypes/TimeConstraintEdgeBottom';
import EventNode from './NodeTypes/EventNode';
import EventEdgeLeft from './EdgeTypes/EventEdgeLeft';
import EventEdgeRight from './EdgeTypes/EventEdgeRight';
import ControlEdge from './EdgeTypes/ControlEdge';
import MergeNode from './NodeTypes/MergeNode';
import ForkNode from './NodeTypes/ForkNode';
import JoinNode from './NodeTypes/JoinNode';
import './styles/dnd.css';
import dayjs from 'dayjs';

const nodeTypes = {
  initialNode: InitialNode,
  finalNode: FinalNode,
  decisionNode: DecisionNode,
  activityNode: ActivityNode,
  eventNode: EventNode,
  mergeNode: MergeNode,
  forkNode: ForkNode,
  joinNode: JoinNode,
};

const edgeTypes = {
  timeConstraintEdgeTop: TimeConstraintEdgeTop,
  timeConstraintEdgeBottom: TimeConstraintEdgeBottom,
  eventEdgeLeft: EventEdgeLeft,
  eventEdgeRight: EventEdgeRight,
  controlEdge: ControlEdge,
};

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const { transform } = useZoomPanHelper();

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const flow = JSON.parse(e.target.result);

      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };
    reader.readAsText(file);
    message.success(`${file?.name} file uploaded successfully`);

    // Prevent upload
    return false;
  };

  const downloadAsFile = async (array, fileName) => {
    const json = JSON.stringify(array);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToJson = () => {
    let metaData = {
      elementCount: elements.length,
      activityNodesCount:
        elements.filter((x) => x.type === 'activityNode').length || 0,
      decisionNodesCount:
        elements.filter((x) => x.type === 'decisionNode').length || 0,
      mergeNodesCount:
        elements.filter((x) => x.type === 'mergeNode').length || 0,
      parameterNodesCount:
        elements.filter((x) => x.type === 'eventNode').length || 0,
      forkNodesCount: elements.filter((x) => x.type === 'forkNode').length || 0,
      joinNodesCount: elements.filter((x) => x.type === 'joinNode').length || 0,
      controlFlowsCount:
        elements.filter((x) => x.type.includes('controlEdge')).length || 0,
      parameterEdgesCount:
        elements.filter((x) => x.type.includes('eventEdge')).length || 0,
      timeConstraintsCount:
        elements.filter((x) => x.type.includes('timeConstraint')).length || 0,
    };
    downloadAsFile(elements, 'elements_' + dayjs().format('DD.MM.YYYY'));
    downloadAsFile(metaData, 'metadata_' + dayjs().format('DD.MM.YYYY'));
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <ExportOutlined /> Export to temporal constraint network
      </Menu.Item>
      <Menu.Item key="2">
        <Upload
          accept=".json"
          customRequest={dummyRequest}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <UploadOutlined /> Import from file
        </Upload>
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() =>
          downloadAsFile(
            reactFlowInstance.toObject(),
            'activity_chart_' + dayjs().format('DD.MM.YYYY')
          )
        }
      >
        <DownloadOutlined /> Save for import
      </Menu.Item>
      <Menu.Item key="4" onClick={convertToJson}>
        <DownloadOutlined /> Export with metadata
      </Menu.Item>
    </Menu>
  );

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {
    if (
      params.sourceHandle?.toString().includes('constraintTop') &&
      params.targetHandle?.toString().includes('constraintTop')
    ) {
      params.type = 'timeConstraintEdgeTop';
    } else if (
      params.sourceHandle?.toString().includes('constraintBottom') &&
      params.targetHandle?.toString().includes('constraintBottom')
    ) {
      params.type = 'timeConstraintEdgeBottom';
    } else if (
      params.sourceHandle?.toString().includes('eventLeft') ||
      params.targetHandle?.toString().includes('eventLeft')
    ) {
      params.type = 'eventEdgeLeft';
    } else if (
      params.sourceHandle?.toString().includes('eventRight') ||
      params.targetHandle?.toString().includes('eventRight')
    ) {
      params.type = 'eventEdgeRight';
    } else {
      params.type = 'controlEdge';
    }

    params.data = {};

    setElements((els) => addEdge(params, els));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: {},
    };

    setElements((es) => es.concat(newNode));
  };

  return (
    <>
      <div className="optionsDropdown">
        <Dropdown overlay={menu}>
          <Button icon={<SettingOutlined />}>
            Options <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            deleteKeyCode={46} /* 'delete'-key */
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode="loose"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onLoad={setReactFlowInstance}
          >
            <Background variant="dots" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

export default Canvas;

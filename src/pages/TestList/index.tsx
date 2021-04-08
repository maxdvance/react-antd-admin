import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { custom } from '@/services/ant-design-pro/api';
import { Image } from 'antd';
import { Button } from 'antd';

const TestList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.CustomItem>[] = [
    {
      title: 'ID',
      dataIndex: 'item_id',
      tip: 'unique key',
      render: (dom, entity) => {
        return (
          <a>{dom}</a>
        );
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <Image 
            height={100}
            width={50}
            src={dom} 
          />
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        // Default | Error | Processing | Success
        'fault': {
          text: 'fault',
          status: 'Error',
        },
        'normal': {
          text: 'normal',
          status: 'Success',
        },
        'undetermined': {
          text: 'undetermined',
          status: 'Default',
        }
      },
    },
    {
      title: 'Create Time',
      sorter: true,
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: 'Update Time',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <>
          <Button type="primary">Normal</Button>
          <Button type="primary" danger>Fault</Button>
        </>
      ],
    },
  ];

  return (
    <ProTable<API.CustomItem, API.PageParams>
      headerTitle={'Railway Fault Database'}
      actionRef={actionRef}
      request={custom}
      columns={columns}
    />
  );
};

export default TestList;

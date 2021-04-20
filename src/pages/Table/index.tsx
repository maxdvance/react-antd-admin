import React, { useRef, useState } from 'react';
import { Image, Button, message } from 'antd';
import { StatisticCard } from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { custom } from '@/services/ant-design-pro/api';
import moment from 'moment';
import axios from 'axios';

const success = () => {
  message.success('status updated');
};

const warning = () => {
  message.warning('status remains unchanged');
};

const { Divider } = StatisticCard;

const TestList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [time, setTime] = useState(() => Date.now());
  const [statusFilter, setStatusFilter] = useState<any>(null);

  const handleClick = (e: any, record: API.CustomItem) => {
    success();
    let new_status = '';
    if (e.target.innerText === 'Normal') {
      new_status = 'normal';
    } else {
      new_status = 'fault';
    }
    axios({
      method: 'patch',
      url: `https://7m2o1d1ue4.execute-api.ap-east-1.amazonaws.com/dev/items/${record.item_id}`,
      data: { status: new_status },
    });
    actionRef.current!.reload();
  };

  const columns: ProColumns<API.CustomItem>[] = [
    {
      title: 'ID',
      dataIndex: 'item_id',
      tip: 'unique key',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      valueType: 'text',
      tip: 'click to view',
      render: (_, entity) => {
        return <Image height={150} width={50} src={entity.image} />;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      filteredValue: statusFilter,
      tip: 'click on header or stats card to filter',
      valueEnum: {
        // Default | Error | Processing | Success
        fault: { text: 'fault', status: 'Error' },
        normal: { text: 'normal', status: 'Success' },
        undetermined: { text: 'undetermined', status: 'Default' },
      },
    },
    {
      title: 'Create Time',
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: 'Update Time',
      onFilter: true,
      sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.status !== 'normal' && (
          <Button
            key="changeNormal"
            type="primary"
            onClick={(e) => {
              if (record.status === 'normal') {
                warning();
              } else {
                handleClick(e, record);
              }
            }}
          >
            Normal
          </Button>
        ),
        record.status !== 'fault' && (
          <Button
            key="changeFault"
            type="primary"
            danger
            onClick={(e) => {
              if (record.status === 'fault') {
                warning();
              } else {
                handleClick(e, record);
              }
            }}
          >
            Fault
          </Button>
        ),
      ],
    },
  ];

  return (
    <PageContainer
      ghost
      header={{
        title: 'Railway Fault Database',
      }}
    >
      <ProTable<API.CustomItem, API.PageParams>
        headerTitle={`Last update time: ${moment(time).format('HH:mm:ss')}`}
        onLoad={() => setTime(Date.now())}
        actionRef={actionRef}
        request={custom}
        columns={columns}
        rowKey="item_id"
        search={false}
        tableExtraRender={(_, data) => (
          <StatisticCard.Group>
            <StatisticCard
              statistic={{
                title: 'All',
                value: data.length,
                tip: 'Click to filter (Also applied to other status)',
              }}
              onClick={() => setStatusFilter(null)}
            />
            <Divider />
            <StatisticCard
              statistic={{
                title: 'normal',
                value: data.filter((item) => item.status === 'normal').length,
                status: 'success',
              }}
              onClick={() => setStatusFilter(['normal'])}
            />
            <StatisticCard
              statistic={{
                title: 'fault',
                value: data.filter((item) => item.status === 'fault').length,
                status: 'error',
              }}
              onClick={() => setStatusFilter(['fault'])}
            />
            <StatisticCard
              statistic={{
                title: 'undetermined',
                value: data.filter((item) => item.status === 'undetermined').length,
                status: 'default',
              }}
              onClick={() => setStatusFilter(['undetermined'])}
            />
          </StatisticCard.Group>
        )}
      />
    </PageContainer>
  );
};

export default TestList;

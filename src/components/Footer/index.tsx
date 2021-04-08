import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 MTR Data Studio"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/benlau6/react-antd-admin',
        blankTarget: true,
      },
    ]}
  />
);

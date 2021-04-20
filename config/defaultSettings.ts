import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'ORIS',
  pwa: false,
  logo: 'https://mtr-hk-dev-oris-website.s3.ap-east-1.amazonaws.com/logo.png',
  iconfontUrl: '',
};

export default Settings;

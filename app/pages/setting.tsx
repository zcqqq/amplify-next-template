import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Flex, Menu,Image} from 'antd';
import type { MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { HomeOutlined,UserOutlined,TeamOutlined,TagOutlined,ReadOutlined,CommentOutlined,SubnodeOutlined,SettingOutlined } from '@ant-design/icons';
import i18next from './i18n';

const Setting: React.FC = () => {

  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',
  ): MenuItem { return { key, icon, children, label, type, } as MenuItem; }
  
  const items: MenuProps['items'] = [
    getItem(i18next.t('setting:menu.metadata'), '/metadata', null, [getItem(i18next.t('setting:menu.customerAttributes'), '/setting/customerAttributes',<ReadOutlined/>), ], 'group'),
    getItem(i18next.t('setting:menu.configuration'), '/configuration', null, [], 'group'),
  ];

  const [loginId, setLoginId] = useState(String);
  useEffect(() => {
    const fetchLoginId = async () => {
      try {
        const { signInDetails } = await getCurrentUser();
        const id = signInDetails?.loginId ?? '';
        setLoginId(id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoginId();
  }, []);

  const [current, setCurrent] = useState('')
  const router = useRouter();
  useEffect(() => {
    router.push(current)
  }, [current])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}    >
      <Flex>
      <HomeOutlined key="home" onClick={() => router.push('/')}
              />
      </Flex>
      <Menu
      style={{ height: '100%', borderRight: 0, width: '100%' }}
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default Setting;
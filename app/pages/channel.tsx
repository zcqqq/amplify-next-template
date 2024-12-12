import { Card, Col, Row, ConfigProvider, theme, Layout } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import Index from './index';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const { Header } = Layout;
const { Meta } = Card;

const Channel: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Index />
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Row gutter={36}>
          <Col span={4}>
            <Card bordered={true} cover={<img src="/asset/logo/douyin.svg" />}
              actions={[<SettingOutlined key="connectDouyin" onClick={() => window.open('https://open.douyin.com/platform/oauth/connect/?client_key=awgqrvbxb86rz073&response_type=code&scope=user_info,renew_refresh_token,aweme.share,im.direct_message,im.group_message,im.group_fans.create_list,user.intention,tool.image.upload,im.microapp_card,im.message_card&redirect_uri=https://localhost:3000/authDouyin', '_blank')}
              />]}
            >
              <Meta title={i18n.t('channel:douyin.channelType')} style={{ textAlign: 'center' }} />
            </Card>
          </Col>
          <Col span={4}>
          <Card bordered={true} cover={<img src="/asset/logo/weixin.png" />}
              actions={[<SettingOutlined key="connectWeixin" onClick={() => window.open('https://baidu.com', '_blank')}
              />]}
            >
              <Meta title={i18n.t('channel:weixin.channelType')} style={{ textAlign: 'center' }} />
            </Card>
          </Col>
          <Col span={4}>
          <Card bordered={true} cover={<img src="/asset/logo/weixinwork.png" />}
              actions={[<SettingOutlined key="connectWeixinWork" onClick={() => window.open('https://baidu.com', '_blank')}
              />]}
            >
              <Meta title={i18n.t('channel:weixinwork.channelType')} style={{ textAlign: 'center' }} />
            </Card>
          </Col>
        </Row>
      </Layout>
    </Layout>
  )
};

export default Channel;
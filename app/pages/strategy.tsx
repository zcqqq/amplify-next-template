import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource'
import React, { useState, useEffect } from 'react';
import {Menu, Card, Col, Row, ConfigProvider, theme, Layout, Button, Checkbox, Form, Input, Radio, Select, Flex } from 'antd';
import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Index from './index';
const client = generateClient<Schema>();

//menu
const items: MenuProps['items'] = [
  {
    label: '视频评论',
    key: '/douyinReplyComment',
  },
  {
    label: 'Navigation Two',
    key: 'app',
  }];
const { Header, Content } = Layout;

//form display


//form submit
const onFinish = async (values: any) => {
  console.log('Success:', values);
  const { errors, data: newStrategy } = await client.models.Strategy.create(values);
  console.log(newStrategy.id);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  strategyOption?: string;
  channelStrategiesId?: string;
  contentId?: string;
  triggerOption?: string;
  triggerContent?: string;
  actionOption?: string;
  actionContent?: string;
};

const Strategy: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Index />
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <Menu mode="horizontal" items={items} />
        </Header>
        <Content>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="strategyOption">
              <Radio defaultChecked value={"replyComment"}>回复视频评论</Radio>
            </Form.Item>
            <Form.Item<FieldType>
              name="channelStrategiesId" label="选择账号">
              <Select
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="contentId">
              <Flex style={{ justifyContent: 'space-between' }}>
                <Radio.Group defaultValue={"one"} style={{ display: 'flex' }}>
                  <Radio value={"all"}>所有视频</Radio>
                  <Radio value={"one"}>单个视频</Radio>
                </Radio.Group>
                <Select
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Flex>
            </Form.Item>
            <Form.Item<FieldType>
              name="triggerOption">
                <Radio.Group defaultValue={"ai"}>
                  <Radio value={"ai"}>AI语义</Radio>
                  <Radio value={"match"}>完整匹配</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item<FieldType>
              label="评论内容"
              name="triggerContent">
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
              name="actionOption">
                <Radio.Group defaultValue={"ai"}>
                  <Radio value={"ai"}>AI生成</Radio>
                  <Radio value={"original"}>文本</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item<FieldType>
              label="回复内容"
              name="actionContent">
                <Input.TextArea/>
              </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  )
};

export default Strategy;
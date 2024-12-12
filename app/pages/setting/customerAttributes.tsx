import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource'
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, ConfigProvider, theme, Layout } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Setting from '../setting';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { cookiesClient } from "@/src/amplify-utils";

interface DataType {
    field_id: string;
    field_name: string;
    field_type: string;
} 
const columns: TableProps<DataType>['columns'] = [
    {
        title: '字段名称',
        dataIndex: 'field_name',
        key: 'field_name',
    },
    {
        title: '字段类型',
        dataIndex: 'field_type',
        key: 'field_type',
    },
];

const data: DataType[] = [
    {
        field_id: '1',
        field_name: 'John Brown',
        field_type: 'New York No. 1 Lake Park',
    },
    {
        field_id: '2',
        field_name: 'Jim Green',
        field_type: 'London No. 1 Lake Park',
    },
    {
        field_id: '3',
        field_name: 'Joe Black',
        field_type: 'Sydney No. 1 Lake Park',
    },
];

const { Header } = Layout;
const { Meta } = Card;

const CustomerAttributes: React.FC = async () => {
    const { data: customerAttributes } = await cookiesClient.models.MetaCustomerField.list();
    console.log(customerAttributes);
    return (
        <Layout hasSider>
            <Setting />
            <Layout style={{ marginLeft: 200 }}>
                <Table columns={columns}  dataSource={data}/>
            </Layout>
        </Layout>
    )
};

export default CustomerAttributes;
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { customerData } from './customerData';
import { Menubar } from 'primereact/menubar';
import NavHome from './index';

export default function DynamicColumnsDemo() {
    const items = [
        { label: '客户列表', },
        { label: '客户菜单2', },
    ];
    const [products, setProducts] = useState([]);
    const columns = [
        { field: 'nickname', header: '昵称' },
        { field: 'gender', header: '性别' },
        { field: 'field1', header: '自定义字段1' },
        { field: 'field2', header: '自定义字段2' }
    ];
    useEffect(() => {
        customerData.getCustomers().then(data => setProducts(data));
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <NavHome />
            <div style={{ width: '100vw', flexDirection: 'column' }}>
                <Menubar model={items} />
                <div className="card">
                    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                        {columns.map((col, i) => (
                            <Column key={col.field} field={col.field} header={col.header} />
                        ))}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

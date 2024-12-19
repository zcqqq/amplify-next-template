import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { NodeService } from './tagData';
import { useRouter } from 'next/router';
import { Menubar } from 'primereact/menubar';
import NavHome from './index';

export default function Tag() {
    const [nodes, setNodes] = useState([]);
    const items = [
        {label: '标签树',},
        {label: '标签列表',},
    ];

    //useEffect(() => {
    //    NodeService.getTreeNodes().then((data) => setNodes(data));
    //}, []);

    return (
        <div style={{ display: 'flex' }}>
            <NavHome />
            <div style={{ width: '100vw', flexDirection: 'column' }}>
                <Menubar model={items} />
                <Tree value={nodes} />
            </div>
        </div>
    )
}



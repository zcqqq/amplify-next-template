export const NodeService = {
    getTreeNodesData() {
        return [
            {
                key: '0',label: '用户阶段标签',data: 'Documents Folder',
                children: [
                    {
                        key: '0-0',label: 'Work',data: 'Work Folder',
                        children: [
                            { key: '0-0-0', label: 'Expenses.doc', data: 'Expenses Document' },
                            { key: '0-0-1', label: 'Resume.doc', data: 'Resume Document' }
                        ]
                    },
                    {
                        key: '0-1',label: 'Home',data: 'Home Folder',
                        children: [{ key: '0-1-0', label: 'Invoices.txt', data: 'Invoices for this month' }]
                    }
                ]
            },
            {
                key: '1',label: '购买力标签',data: 'Events Folder',
                children: [
                    { key: '1-0', label: 'Meeting', data: 'Meeting' },
                    { key: '1-1', label: 'Product Launch', data: 'Product Launch' },
                    { key: '1-2', label: 'Report Review', data: 'Report Review' }
                ]
            },
        ];
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};
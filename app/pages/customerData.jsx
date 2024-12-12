export const customerData = {
    getCustomersData() {
        return [
            {
                id: '1000',
                nickname: 'Bamboo Watch',
                gender: '男',
                field1: 'Product Description',
                field2: 65,
            },
            {
                id: '1001',
                nickname: 'Black Watch',
                gender: '男',
                field1: 'Product Description',
                field2: 72,
            },
            {
                id: '1002',
                nickname: 'Blue Band',
                gender: '女',
                field1: 'Product Description',
                field2: 79,
            },
            {
                id: '1003',
                nickname: 'Blue T-Shirt',
                gender: '男',
                field1: 'Product Description',
                field2: 29,
            },
            {
                id: '1004',
                nickname: 'Bracelet',
                gender: '女',
                field1: 'Product Description',
                field2: 15,
            },
        ];
    },

    getCustomers() {
        return Promise.resolve(this.getCustomersData());
    },
};


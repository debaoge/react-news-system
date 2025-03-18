import { Table } from 'antd'
import React, { useState, useEffect } from 'react';
import { Tag, Button } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';


import axios from 'axios';

export default function RightList() {

    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children")
            .then(res => {
                setDataSource(res.data)
            })
            .catch(error => {
                console.error('获取菜单数据失败：', error);
            });
    }, []);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => { return <b>{id}</b> }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => { return <Tag color="orange">{key}</Tag> }
        },
        {
            title: '',
            render: () => {
                return <div>
                    <Button type="primary" shape="circle" icon={<EditFilled />}></Button>
                    <Button type="primary" danger ghost shape="circle" icon={<DeleteFilled />}></Button>
                </div>
            }
        },

    ];

    return (
        <div>RightList
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    )
}

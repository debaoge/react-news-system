import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function RightList() {
    const [dataSource, setDataSource] = useState([]);
    const { confirm } = Modal;

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children")
            .then(res => {
                const list = res.data;
                list.forEach(item => {
                    if (item.children.length === 0) {
                        item.children = "";
                    }
                });
                setDataSource(list);
            })
            .catch(error => {
                console.error('获取菜单数据失败：', error);
            });
    }, []);

    const handleSwitchChange = (item, checked) => {
        // Create a copy of the item with the updated pagepermisson value
        console.log('item', item);

        const updatedItem = {
            ...item,
            pagepermisson: checked ? 1 : 0
        };

        // Update the dataSource state
        const updatedDataSource = dataSource.map(data =>
            data.id === item.id ? updatedItem : data
        );
        setDataSource(updatedDataSource);

        // Send an API request to update the backend
        axios.patch(`http://localhost:8000/rights/${item.id}`, {
            pagepermisson: checked ? 1 : 0
        });
    };

    const confirmDelete = (item) => {
        confirm({
            title: 'Do you want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDelete(item);
            },
            onCancel() { }
        });
    };

    const handleDelete = (item) => {
        if (item.grade === 1) {
            // Delete a top-level item
            setDataSource(dataSource.filter(data => data.id !== item.id));
            // axios.delete(`http://localhost:8000/rights/${item.id}`)
        } else {
            // Delete a child item
            const updatedDataSource = dataSource.map(data => {
                if (data.id === item.rightId) {
                    return {
                        ...data,
                        children: data.children.filter(child => child.id !== item.id)
                    };
                }
                return data;
            });
            setDataSource(updatedDataSource);
            // axios.delete(`http://localhost:8000/children/${item.id}`);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => { return <b>{id}</b>; }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => { return <Tag color="orange">{key}</Tag>; }
        },
        {
            title: '',
            render: (item) => {
                return (
                    <div>
                        {/* Delete Button */}
                        <Button
                            type="primary"
                            danger
                            ghost
                            shape="circle"
                            onClick={() => confirmDelete(item)}
                            icon={<DeleteFilled />}
                        />

                        {/* Popover for Page Configuration */}
                        {/* Edit Button */}
                        <Popover
                            content={
                                <div style={{ textAlign: 'center' }}>
                                    <p>配置选项</p>
                                    <Switch
                                        checked={item.pagepermisson === 1}
                                        onChange={(checked) => handleSwitchChange(item, checked)}
                                    />
                                </div>
                            }
                            title="页面配置项"
                            trigger="click"
                        >
                            {/* Edit Button */}
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<EditFilled />}
                                disabled={item.pagepermisson === undefined || item.pagepermisson === ''}
                            />
                        </Popover>
                    </div>
                );
            }
        },
    ];

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey="id"
            />
        </div>
    );
}
import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

export default function Home() {
    const ajax = async () => {
        //取数据
        // axios.get("http://localhost:8000/posts").then(res => {
        //     console.log(res.data);
        // })

        //关联从post id找到comments中的postId
        // axios.get("http://localhost:8000/posts?_embed=comments").then(res => {
        //     console.log(res.data);
        // })

        //关联从comments中postId找到posts中的id
        axios.get("http://localhost:8000/comments?_expand=posts").then(res => {
            console.log(res.data);
        })

        //增
        // axios.post("http://localhost:8000/posts", {
        //     "id": 4,
        //     "title": "444",
        //     "author": "chongbb"
        // })

        //更新
        // axios.put("http://localhost:8000/posts/1", {
        //     "title": "111-修改",
        //     "author": "lili"
        // })

        //补丁更新
        // axios.patch("http://localhost:8000/posts/d7d3", {
        //     title: "patch-111新修改"
        // });

        // 删除
        // axios.delete("http://localhost:8000/posts/d7d3");


    }
    return (
        <div>Home

            <Button type="primary" onClick={ajax}> test ajax</Button>

        </div>
    )
}

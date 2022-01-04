import { List, Avatar, Space, Image } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import style from './index.less'
import React from 'react'

export default function HotelStudyRoad() {
  const listData = [
    {
      href: 'https://ant.design',
      title: `测试名称`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description: '前端菜鸟！',
      content: '一个前端初学者的学习路线分享！如果感觉好的话就点个赞吧！'
    },
    {
      href: 'https://ant.design',
      title: `测试名称2222`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description: '前端大佬！',
      content: '一个前端进阶的学习路线分享！如果感觉好的话就点个赞吧！'
    }
  ]

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />
            ]}
            extra={
              <Image
                width={272}
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
}

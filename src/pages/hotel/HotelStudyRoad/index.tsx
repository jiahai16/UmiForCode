import { List, Avatar, Space, Image, Skeleton } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import style from './index.less'
import React, { useEffect, useState } from 'react'
import ListComment from './ListComment'
import { getShare } from 'services/hotel'

export default function HotelStudyRoad() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isCommentListVisible, setIsCommentListVisible] =
    useState<boolean>(false)
  const [shareData, setShareData] = useState([])

  const handleCommentClick = () => {
    setIsCommentListVisible(!isCommentListVisible)
  }

  const initData = async () => {
    try {
      const res = await getShare({ number: 1, size: 10 })
      if (res.code === 200) {
        setShareData(res.data.data)
        setLoading(false)
      }
    } catch (error) {}
  }

  useEffect(() => {
    initData()
    return () => {}
  }, [])

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
      <Skeleton loading={loading} active avatar>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={shareData}
          renderItem={(item: any) => (
            <>
              <List.Item
                key={item?.id}
                actions={
                  !loading
                    ? [
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
                        <div
                          onClick={handleCommentClick}
                          className={
                            item?.share?.isDiscuss === 1
                              ? ''
                              : style.commentBtnHide
                          }
                        >
                          <IconText
                            icon={MessageOutlined}
                            text="2"
                            key="list-vertical-message"
                          />
                        </div>
                      ]
                    : undefined
                }
                extra={!loading && <Image width={272} src={item.share.img} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item?.user?.img} />}
                  title={<a>{item?.share?.title}</a>}
                  description={item?.user?.name}
                />
                {item?.share?.details}
              </List.Item>
              <div
                className={
                  isCommentListVisible
                    ? style.commentWrap
                    : style.commentWrapHide
                }
              >
                <ListComment />
              </div>
            </>
          )}
        />
      </Skeleton>
    </div>
  )
}

import { List, Avatar, Space, Image, Skeleton, message } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import style from './index.less'
import React, { useEffect, useState } from 'react'
import ListComment from './ListComment'
import { getShare } from 'services/hotel'

export default function HotelStudyRoad() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isCommentListVisible, setIsCommentListVisible] = useState<
    number | null
  >(null)
  const [shareData, setShareData] = useState([])

  const handleCommentClick = (id: number) => {
      if (isCommentListVisible && isCommentListVisible !== id) {
        setIsCommentListVisible(id)
      } else if (isCommentListVisible === null) {
        setIsCommentListVisible(id)
      } else {
        setIsCommentListVisible(null)
      }
    
  }

  const handleLikeClick = (id: number) => {
  }

  const handleStarClick = (id: number) => {
    console.log(id)
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
                        <div
                          onClick={() => handleStarClick(item?.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Space>
                            <StarOutlined />
                            {0}
                          </Space>
                        </div>,
                        <div
                          onClick={() => handleLikeClick(item?.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Space>
                            <LikeOutlined />
                            {0}
                          </Space>
                        </div>,
                        <div
                          onClick={() => handleCommentClick(item?.id)}
                          style={{ cursor: 'pointer' }}
                          className={
                            item?.share?.isDiscuss === 1
                              ? ''
                              : style.commentBtnHide
                          }
                        >
                          <Space>
                            <MessageOutlined />
                            {0}
                          </Space>
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
                  isCommentListVisible === item?.id
                    ? style.commentWrap
                    : style.commentWrapHide
                }
              >
                <ListComment shareId={item?.id} />
              </div>
            </>
          )}
        />
      </Skeleton>
    </div>
  )
}

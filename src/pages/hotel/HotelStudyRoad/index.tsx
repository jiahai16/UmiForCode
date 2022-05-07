import { List, Avatar, Space, Image, Skeleton, message } from 'antd'
import { MessageTwoTone, HeartTwoTone, LikeTwoTone } from '@ant-design/icons'
import style from './index.less'
import React, { useEffect, useState } from 'react'
import ListComment from './ListComment'
import { getShare, Like, Star } from 'services/hotel'
import { debounce } from 'utils'

export default function HotelStudyRoad() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isCommentListVisible, setIsCommentListVisible] = useState<
    number | null
  >(null)
  const [shareData, setShareData] = useState([])

  const isLogin = localStorage.getItem('login') === 'true'

  const handleCommentClick = (id: number) => {
    if (isCommentListVisible && isCommentListVisible !== id) {
      setIsCommentListVisible(id)
    } else if (isCommentListVisible === null) {
      setIsCommentListVisible(id)
    } else {
      setIsCommentListVisible(null)
    }
  }

  const handleLikeClick = async (item: any) => {
    if (isLogin) {
      try {
        const res = await Like({ shareId: item.id })
        if (res.code === 200) {
          if (item.isGood) {
            message.success('取消成功～')
          } else {
            message.success('👍成功！')
          }

          initData()
        }
      } catch (error) {}
    } else {
      message.info('请先登录再进行点赞哦')
    }
  }

  const handleStarClick = async (item: any) => {
    if (isLogin) {
      try {
        const res = await Star({ shareId: item.id })
        if (res.code === 200) {
          if (item.isFollow) {
            message.success('取消成功～')
          } else {
            message.success('🌟成功！')
          }
          initData()
        }
      } catch (error) {}
    } else {
      message.info('请先登录再进行收藏哦')
    }
  }

  const initData = async () => {
    try {
      const res = await getShare({ number: 1, size: 100 })
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
                          onClick={() => handleStarClick(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Space>
                            <HeartTwoTone
                              twoToneColor={item?.isFollow ? '#ff7979' : ''}
                            />
                            {item?.followCnt}
                          </Space>
                        </div>,
                        <div
                          onClick={() => handleLikeClick(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Space>
                            <LikeTwoTone
                              twoToneColor={item?.isGood ? '#f9ca24' : ''}
                            />
                            {item?.goodCnt}
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
                            <MessageTwoTone />
                            {item?.discussCnt}
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

import { List, Avatar, Space, Image, Skeleton } from 'antd'
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
    } else if(isCommentListVisible === null){
      setIsCommentListVisible(id)
    }else{
      setIsCommentListVisible(null)
    }
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
                          onClick={() => handleCommentClick(item?.id)}
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

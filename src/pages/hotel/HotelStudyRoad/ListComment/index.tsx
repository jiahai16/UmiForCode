import {
  List,
  Comment,
  Skeleton,
  Input,
  Button,
  Avatar,
  Form,
  message,
  Divider,
  Pagination
} from 'antd'
const { TextArea } = Input
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getDiscuss, postDiscuss } from 'services/hotel'
import InfiniteScroll from 'react-infinite-scroll-component'

import style from './index.less'
type IEditorModal = {
  submitting: boolean
  value: string
  onChange: (e: any) => void
  onSubmit: () => void
  handleOpenEditor: () => void
}

type IListModal = {
  shareId: number | string
}

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  handleOpenEditor
}: IEditorModal) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder="说点啥呢？"
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        回复
      </Button>
      <Button onClick={handleOpenEditor} type="link">
        取消评论
      </Button>
    </Form.Item>
  </>
)

const pageParams = {
  number: 1,
  size: 5,
  totalSize: 0,
  totalNumber: 1
}

export default function ListComment({ shareId }: IListModal) {
  const [comments, setComments] = useState<any[]>([])
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [isEditorShow, setIsEditorShow] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>('')
  const [userInfo, setUserInfo] = useState<any>()
  const [dataLoading, setDataLoading] = useState(false)
  const [page, setPage] = useState({ ...pageParams })

  const isLogin = localStorage.getItem('login') === 'true'

  const loadMoreData = () => {
    if (dataLoading) {
      return
    }
    setDataLoading(true)
    page.number += 1
    setPage(page)
    initData()
  }

  const initData = async () => {
    try {
      const res = await getDiscuss({
        share: { id: shareId },
        number: page.number,
        size: page.size
      })
      if (res && res.code === 200) {
        setComments([...comments, ...res.data.data])
        page.totalSize = res.data.totalSize
        page.totalNumber = res.data.totalNumber
        setPage(page)
        setDataLoading(false)
      }
    } catch (error) {
      setDataLoading(false)
    }
  }

  const sendComment = async (value: string) => {
    try {
      setSubmitting(true)
      const res = await postDiscuss({
        share: { id: shareId },
        discuss: { detail: value }
      })
      if (res && res.code === 200) {
        message.success('评论成功！')
        setSubmitting(false)
        setCommentValue('')
      }
    } catch (error) {}
  }

  const handleSubmit = () => {
    if (!commentValue) {
      message.warn('请输入评论啊！')
      return
    }
    sendComment(commentValue)
  }

  const handleChange = (e: any) => {
    setCommentValue(e.target.value)
  }

  const handleOpenEditor = () => {
    if (isLogin) {
      setIsEditorShow(!isEditorShow)
    } else {
      message.info('请先登录再进行评论哦')
    }
  }

  const handleLoadMore = () => {
    page.number += 1
    setPage(page)
    initData()
  }

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUserInfo(JSON.parse(localStorage.getItem('user') as string))
    }
    initData()
  }, [])

  return (
    <div id={style.scrollWrap}>
      {isEditorShow ? (
        <Comment
          avatar={<Avatar src={userInfo?.img} alt={userInfo?.name} />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={commentValue}
              handleOpenEditor={handleOpenEditor}
            />
          }
        />
      ) : (
        <Button onClick={handleOpenEditor} type="link">
          发表评论
        </Button>
      )}
      <List
        className="comment-list"
        itemLayout="vertical"
        dataSource={comments}
        locale={{ emptyText: '暂无评论，快来评论吧！' }}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item?.actions}
              author={item?.user?.name}
              avatar={'https://joeschmoe.io/api/v1/random'}
              content={item?.discuss?.detail}
              datetime={item?.discuss?.createTime.replace('T', ' ')}
            />
          </li>
        )}
      ></List>
      {comments.length < page?.totalSize ? (
        <Button onClick={handleLoadMore} type="link">
          加载更多
        </Button>
      ) : (
        <Divider plain>只有这么多了，地主家也没有余粮了 🤐</Divider>
      )}
    </div>
  )
}

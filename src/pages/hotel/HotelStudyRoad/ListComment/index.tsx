import { List, Comment, Tooltip, Input, Button, Avatar, Form } from 'antd'
const { TextArea } = Input
import moment from 'moment'
import { useState } from 'react'
import style from './index.less'
type IModal = {
  submitting: boolean
  value: string
  onChange: (e: any) => void
  onSubmit: () => void
  handleOpenEditor: () => void
}

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  handleOpenEditor
}: IModal) => (
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

export default function ListComment() {
  const [comments, setComments] = useState<any[]>([])
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [isEditorShow, setIsEditorShow] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>('')

  const handleSubmit = () => {
    if (!commentValue) {
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setCommentValue('')
      setComments((comments) => [
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{commentValue}</p>,
          datetime: moment().fromNow()
        }
      ])
    }, 1000)
  }

  const handleChange = (e: any) => {
    setCommentValue(e.target.value)
  }

  const handleOpenEditor = () => {
    setIsEditorShow(!isEditorShow)
  }

  return (
    <>
      {isEditorShow ? (
        <Comment
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
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
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      ></List>
    </>
  )
}

import { Button, notification } from 'antd'
import { ReactNode, useState } from 'react'
import { useEffect } from 'react'

const key = `open${Date.now()}`

export const openNotification = (
  okCallBackFC: () => void,
  closeCallBackFC: () => void,
  closeNow?: boolean
) => {
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        okCallBackFC()
        notification.close(key)
      }}
    >
      恢复
    </Button>
  )
  notification.open({
    message: ' 提醒！',
    description:
      '是否恢复到上一次编辑的状态！仅此一次机会哦！点击恢复按钮继续编辑上次内容，点击关闭则会销毁上次的缓存数据！',
    btn,
    key,
    duration: null,
    onClose: () => {
      closeCallBackFC()
    }
  })
}

export const closeNotification = () => {
  notification.close(key)
}


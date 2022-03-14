import React from 'react'
import { Avatar, Popover, Input, message } from 'antd'
import { connect, history, useIntl } from 'umi'
import { UserOutlined } from '@ant-design/icons'
const { Search } = Input
import style from './index.less'
import { cookies } from 'utils/cookie'
import { logoutFunc } from 'services/user'
import useLocalStorageState from 'utils/useLocalStorageState/useLocalStorageState'

const HeaderBar: React.FC = ({ user }) => {
  const onSearch = (value: string) => console.log(value)
  const { formatMessage } = useIntl()
  const [isLogin, setIsLogin, { removeItem, isPersistent }] =
  useLocalStorageState('login', {
    defaultValue: false
  })

  const avaMap = new Map([
    ['default', <UserOutlined />],
    [
      'man1',
      <img
        src={require('@/assets/experimental-mans-head-1.png')}
        className={style.avaImg}
      />
    ],
    [
      'woman1',
      <img
        src={require('@/assets/experimental-womans-head-1.png')}
        className={style.avaImg}
      />
    ],
    [
      'woman2',
      <img
        src={require('@/assets/experimental-womans-head-2.png')}
        className={style.avaImg}
      />
    ],
    [
      'woman3',
      <img
        src={require('@/assets/experimental-womans-head-3.png')}
        className={style.avaImg}
      />
    ]
  ])
  const handleLoginClick = () => {
    history.push('/login')
  }
  const handleLoginOut = async () => {
    cookies.removeUserToken()
    removeItem()
    history.push('/overview')
    window.location.reload()
    const res = await logoutFunc()
    if (res?.code === 200) {
      message.success('退出成功')
    }
  }
  return (
    <div className={style.wrap}>
      <div className={style.searchWrap}>
        <Search
          placeholder={formatMessage({ id: 'input.搜索框' })}
          onSearch={onSearch}
          enterButton
          style={{
            marginLeft: '20px',
            width: '25%'
          }}
        />
      </div>
      <div>
        <Popover
          placement="bottomRight"
          content={
            isLogin ? (
              <a style={{ color: '#E9392F' }} onClick={handleLoginOut}>
                退出登录
              </a>
            ) : (
              <a style={{ color: '#001529' }} onClick={handleLoginClick}>
                去登录!
              </a>
            )
          }
          trigger="hover"
        >
          <Avatar
            className={style.avatar}
            shape="square"
            icon={isLogin ? avaMap.get(user?.user.img) : <UserOutlined />}
          />
        </Popover>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(HeaderBar)

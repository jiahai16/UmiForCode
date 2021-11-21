import React from 'react'
import { Avatar, Popover, Menu } from 'antd'
import {
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons'
import style from './index.less'

const { SubMenu } = Menu;

function HeaderBar() {
  return (
    <div className={style.wrap}>
      <Menu
        mode="horizontal"
      >
        <Menu.Item key="mail" icon={<MailOutlined />}>
          热点资讯
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="设置"
        >
            <Menu.Item key="setting:1">主题设置</Menu.Item>
            <Menu.Item key="setting:2">个人设置</Menu.Item>
        </SubMenu>
      </Menu>

    </div>
  )
}

export default HeaderBar

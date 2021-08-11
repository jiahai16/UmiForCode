import { Menu, Layout } from 'antd'
import { useState, useEffect } from 'react'
import style from './index.less'
import { history, withRouter } from 'umi'
import { pageRoutes } from '@/../config/routes'
import { hasAccess } from '@/../config/userAccess'

const { Sider } = Layout
const { SubMenu, Item } = Menu
const { routes } = pageRoutes

function Sidebar({ location }) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['/overview'])

  useEffect(() => {
    const route = '/' + location.pathname.replace('/', '')
    setSelectedKeys([route])
  }, [])

  const linkRoute = ({ key }) => {
    setSelectedKeys([key])
    history.push(key)
  }

  const renderMenu = ({ path, title, icon }) => {
    return (
      hasAccess(path) && (
        <Item key={path} icon={icon ? icon : ''}>
          {title}
        </Item>
      )
    )
  }
  const renderSubMenu = ({ path, icon, title, routes }) => {
    return (
      hasAccess(path) && (
        <SubMenu key={path} icon={icon ? icon : ''} title={title}>
          {getMenuList(routes)}
        </SubMenu>
      )
    )
  }
  const getMenuList = (routes) => {
    return (
      routes &&
      routes
        .filter((route) => !route.redirect)
        .map((item) => {
          if (item.routes) {
            openKeys.push(item.path)
            return renderSubMenu(item)
          }

          return renderMenu(item)
        })
    )
  }

  const openKeys = []
  const menuList = getMenuList(routes)

  return (
    <div className={style.sidebarWrap}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed)
        }}
      >
        <div className={style.siderHeader}></div>
        <Menu
          theme="dark"
          defaultOpenKeys={openKeys}
          selectedKeys={selectedKeys}
          mode="inline"
          className={style.menuWrap}
          onClick={linkRoute}
        >
          {menuList}
        </Menu>
      </Sider>
    </div>
  )
}

export default withRouter(Sidebar)

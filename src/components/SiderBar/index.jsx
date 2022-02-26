import { Menu, Layout } from 'antd'
import { useState, useEffect } from 'react'
import style from './index.less'
import { history, useIntl, withRouter } from 'umi'
import { pageRoutes } from '@/../config/routes'
import { hasAccess } from '@/../config/userAccess'
import {
  MailOutlined,
  SettingOutlined,
  PieChartOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  TeamOutlined
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu, Item } = Menu
const { routes } = pageRoutes

function Sidebar({ location }) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['/overview'])
  const { formatMessage } = useIntl()

  const IconMap = new Map([
    ['setting', <SettingOutlined />],
    ['hotInfo', <MailOutlined />],
    ['other', <AppstoreOutlined />],
    ['overview', <PieChartOutlined />],
    ['task', <DesktopOutlined />],
    ['hotel', <TeamOutlined />]
  ])

  useEffect(() => {
    const route = '/' + location.pathname.replace('/', '')
    setSelectedKeys([route])
  }, [])

  const linkRoute = ({ key }) => {
    setSelectedKeys([key])
    history.push(key)
  }

  const formatName = (name) => {
    return formatMessage({ id: `siderBar.${name}` })
  }

  const renderMenu = ({ path, name, icon }) => {
    return (
      hasAccess(path) && (
        <Item key={path} icon={IconMap.has(icon) ? IconMap.get(icon) : ''}>
          {formatName(name)}
        </Item>
      )
    )
  }
  const renderSubMenu = ({ path, icon, name, routes }) => {
    return (
      hasAccess(path) && (
        <SubMenu
          key={path}
          icon={IconMap.has(icon) ? IconMap.get(icon) : ''}
          title={formatName(name)}
        >
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
            return renderSubMenu(item)
          }

          return renderMenu(item)
        })
    )
  }

  const menuList = getMenuList(routes)

  const openKeys = [`/${location.pathname.split('/')[1]}`]

  useEffect(() => {
    const route = `/${location.pathname.replace('/', '')}`
    setSelectedKeys([route])
  }, [])

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

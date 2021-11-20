import { DrawerProps } from 'antd'
export type initDrawerProps = DrawerProps & {
  visible: boolean,
  onClose?: () => void
}
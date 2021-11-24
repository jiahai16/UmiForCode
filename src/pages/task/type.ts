import { DrawerProps } from 'antd'
export type initDrawerProps = DrawerProps & {
  visible: boolean,
  onClose?: () => void
}
export interface taskLable{
  title: string
  name: string
  count: string | number
}
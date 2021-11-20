import style from './index.less'
import { IRouteProps } from 'umi'

export default function TaskPage({ children }: IRouteProps) {
  return (
    <div>
      {children}
    </div>
  )
}
import style from './index.less'
import { IRouteProps } from 'umi'

export default function UserPage({ children }: IRouteProps) {
  return (
    <div>
      UserPage----
      {children}
    </div>
  )
}

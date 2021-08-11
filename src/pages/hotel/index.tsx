import style from './index.less'
import { IRouteProps } from 'umi'

export default function HotelPage({ children }: IRouteProps) {
  return (
    <div>
      HotelPage----
      {children}
    </div>
  )
}
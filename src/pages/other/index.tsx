import { IRouteProps } from 'umi'
import style from './index.less'

export default function Other({ children }: IRouteProps) {

  return (
    <div className={style.wrap}>
      {children}
    </div>
   )
}
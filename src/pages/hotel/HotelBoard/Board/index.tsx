import { List, Avatar, Image } from 'antd'
import style from './index.less'

const Board: React.FC<any> = ({ data }) => {
  return (
    <div className={style.board}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any, idx) => (
          <List.Item className={style.boardList}>
            <h1 className={style.boardNumber}>{++idx}.</h1>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={
                    <Image
                      src={item?.img}
                      fallback={require('@/assets/fallimg.png')}
                      preview={false}
                    />
                  }
                />
              }
              title={<a>{item?.name}</a>}
              description="Ant Design, a design language "
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Board

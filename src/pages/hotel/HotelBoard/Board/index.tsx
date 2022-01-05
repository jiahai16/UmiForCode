import { List, Avatar } from "antd";
import style from './index.less'


const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 5",
  },
  {
    title: "Ant Design Title 6",
  },
];

const Board: React.FC<any> = () => {
  return (
     <div className={style.board}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, idx) => (
            <List.Item className={style.boardList}>
              <h1 className={style.boardNumber}>{++idx}.</h1>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language "
              />
            </List.Item>
          )}
        />
      </div>
  )
}

export default Board

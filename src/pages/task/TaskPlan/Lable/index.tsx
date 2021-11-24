import { taskLable } from "task/type";
import style from './index.less'

const Lable: React.FC<any> = (props: taskLable) => {
  return (
    <div
      style={{
        marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      <div className={style.monitorTask}>
        <h1>{props.title}</h1>
        <h4>{props.count}</h4>
      </div>
    </div>
  );
}

export default Lable;
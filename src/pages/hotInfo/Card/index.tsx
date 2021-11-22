import { Card } from "antd";

function index(props:any) {
  return (
    <div>
      <Card
        title={props.title}
        extra={<a href={props.link}>了解更多</a>}
        style={{ width: "25vw", marginBottom: 20, minWidth: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
}

export default index;
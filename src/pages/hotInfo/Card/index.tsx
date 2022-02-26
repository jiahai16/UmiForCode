import { Card } from "antd";
import { useIntl } from 'umi';

function index(props:any) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <Card
        title={props.title}
        extra={<a href={props.link}>{formatMessage( {id: 'hotInfo.了解更多'} )}</a>}
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
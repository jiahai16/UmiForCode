import { Card } from 'antd'
import { useIntl } from 'umi'

function index(data: any) {
  const { formatMessage } = useIntl()
  return (
    <div>
      <Card
        title={data?.data?.title}
        extra={
          <a href={data?.data?.url} target="_blank">
            {formatMessage({ id: 'hotInfo.了解更多' })}
          </a>
        }
        style={{
          width: '25vw',
          height: 230,
          overflow: 'hidden',
          marginBottom: 20,
          minWidth: 300
        }}
      >
        <p>{data?.data?.content}</p>
      </Card>
    </div>
  )
}

export default index

import {
  Drawer,
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  Tooltip,
  message
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { initDrawerProps, taskPostParams } from 'task/type'
import moment from 'moment'
import style from './index.less'

const { RangePicker } = DatePicker

const initParams: taskPostParams = {
  name: '',
  type: '',
  userId: 0,
  tasks: {
    id: undefined,
    name: '',
    content: '',
    createTime: undefined,
    planId: undefined,
    status: '',
    userId: 0
  }
}

const NewPlanDrawer = ({
  planType,
  visible,
  onClose = () => {}
}: initDrawerProps) => {
  const [form] = Form.useForm()

  const titleMap = new Map([
    ['TODAY_PLAN', '新建今日计划'],
    ['LONG_PLAN', '新建长期计划'],
    ['COUNTDOWN_PLAN', '新建倒计时任务']
  ])

  const onFinish = () => {
    form.setFieldsValue({ type: planType })
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue(true))
      })
      .catch(() => {
        message.warn('请补充完必填项')
      })
  }
  const onCancel = () => {
    form.resetFields()
    onClose && onClose()
  }

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  return (
    <Drawer
      width="50%"
      title={titleMap.has(planType) ? titleMap.get(planType) : 'unkown'}
      placement="right"
      onClose={onCancel}
      visible={visible}
      destroyOnClose={true}
      footer={
        <div style={{ float: 'right' }} key="foot">
          <Button
            style={{ marginRight: 15, width: 88 }}
            key="cancel"
            type="default"
          >
            取消
          </Button>
          <Button
            style={{ marginRight: 15, width: 88 }}
            key="ok"
            type="primary"
            onClick={onFinish}
          >
            完成
          </Button>
        </div>
      }
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label={
            <Tooltip title="计划总要有个响亮的名字吧=。=">
              <span>计划名称</span>
            </Tooltip>
          }
          rules={[{ required: true, message: 'Missing name' }]}
        >
          <Input placeholder="请填写" />
        </Form.Item>
        {planType === 'LONG_PLAN' ? (
          <Form.Item
            name="createTime"
            label={
              <Tooltip title="这东西也就是说！你想在什么时候开始什么时候结束一件事啊！">
                <span>执行期间</span>
              </Tooltip>
            }
          >
            <RangePicker showTime />
          </Form.Item>
        ) : (
          ''
        )}
        {planType === 'COUNTDOWN_PLAN' ? (
          <Form.Item
            name="createTime"
            label={
              <Tooltip title="做事要有始有终！计划从现在开始进入倒计时！！！">
                <span>结束日期</span>
              </Tooltip>
            }
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
          </Form.Item>
        ) : (
          ''
        )}
        <Form.List name="tasks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    label={
                      <Tooltip title="将自己的一天切成小块，逐个消化！">
                        <span>任务名</span>
                      </Tooltip>
                    }
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                    rules={[{ required: true, message: 'Missing taskName' }]}
                  >
                    <Input placeholder="请填写" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label={
                      <Tooltip title="写上你到底要干啥，好吧。">
                        <span>任务内容</span>
                      </Tooltip>
                    }
                    name={[name, 'content']}
                    fieldKey={[fieldKey, 'content']}
                    rules={[{ required: true, message: 'Missing taskContent' }]}
                  >
                    <Input placeholder="请填写" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Tooltip title="开始干活！！！" placement="bottom">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加任务
                  </Button>
                </Tooltip>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  )
}

export default NewPlanDrawer

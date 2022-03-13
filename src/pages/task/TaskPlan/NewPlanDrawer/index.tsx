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
import { useIntl } from 'umi'
import { postTask, putTask } from 'services/task'
import { useEffect } from 'react'

const { RangePicker } = DatePicker

let initParams: taskPostParams = {
  name: '',
  type: '',
  createTime: undefined,
  endTime: undefined,
  tasks: [
    {
      id: '',
      planId: '',
      name: '',
      content: ''
    }
  ]
}

const NewPlanDrawer = ({
  planType,
  visible,
  record,
  onClose = () => {}
}: initDrawerProps) => {
  const [form] = Form.useForm()
  const { formatMessage } = useIntl()

  const titleMap = new Map([
    ['TODAY_PLAN', `${formatMessage({ id: 'taskplan.新建今日计划' })}`],
    ['LONG_PLAN', `${formatMessage({ id: 'taskplan.新建长期计划' })}`],
    ['COUNTDOWN_PLAN', `${formatMessage({ id: 'taskplan.新建倒计时任务' })}`]
  ])

  let isComplete: boolean = false

  const NewPlan = async () => {
    form.setFieldsValue({ type: planType })
    form
      .validateFields()
      .then(() => {
        isComplete = true
        initParams = {
          ...form.getFieldsValue(true),
          createTime:
            planType === 'LONG_PLAN'
              ? form.getFieldValue('createTime')[0]
              : undefined,
          endTime:
            planType === 'LONG_PLAN'
              ? form.getFieldValue('createTime')[1]
              : form.getFieldValue('endTime')
        }
      })
      .catch(() => {
        message.warn('请补充完必填项')
      })
    if (isComplete) {
      try {
        const { code } = await postTask(initParams)
        if (code === 200) {
          message.success('创建成功！')
          form.resetFields()
          onClose && onClose()
        }
      } catch (error) {}
    }
  }

  const UpDataPlan = async () => {
    form.setFieldsValue({ type: planType })
    form
      .validateFields()
      .then(() => {
        isComplete = true
        initParams = {
          id: record.id,
          ...form.getFieldsValue(true),
          createTime:
            planType === 'LONG_PLAN'
              ? form.getFieldValue('createTime')[0]
              : undefined,
          endTime:
            planType === 'LONG_PLAN'
              ? form.getFieldValue('createTime')[1]
              : form.getFieldValue('endTime')
        }
      })
      .catch(() => {
        message.warn('请补充完必填项')
      })
    if (isComplete) {
      try {
        const { code } = await putTask(initParams)
        if (code === 200) {
          message.success('编辑成功！')
          form.resetFields()
          onClose && onClose()
        }
      } catch (error) {}
    }
  }

  const onFinish = () => {
    if (record) {
      UpDataPlan()
    } else {
      NewPlan()
    }
  }
  const onCancel = () => {
    form.resetFields()
    onClose && onClose()
  }

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        createTime:
          planType === 'LONG_PLAN'
            ? [moment(record.createTime), moment(record.endTime)]
            : moment(record.createTime),
        endTime: moment(record.endTime)
      })
    }
  }, [form, record])

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
            {formatMessage({ id: 'input.取消' })}
          </Button>
          <Button
            style={{ marginRight: 15, width: 88 }}
            key="ok"
            type="primary"
            onClick={onFinish}
          >
            {formatMessage({ id: 'input.完成' })}
          </Button>
        </div>
      }
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label={
            <Tooltip
              title={formatMessage({ id: 'taskplan.新建抽屉.计划名称.提示' })}
            >
              <span>{formatMessage({ id: 'taskplan.新建抽屉.计划名称' })}</span>
            </Tooltip>
          }
          rules={[{ required: true, message: 'Missing name' }]}
        >
          <Input placeholder={formatMessage({ id: 'input.请输入' })} />
        </Form.Item>
        {planType === 'LONG_PLAN' ? (
          <Form.Item
            name="createTime"
            label={
              <Tooltip
                title={formatMessage({ id: 'taskplan.新建抽屉.执行期间.提示' })}
              >
                <span>
                  {formatMessage({ id: 'taskplan.新建抽屉.执行期间' })}
                </span>
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
            name="endTime"
            label={
              <Tooltip
                title={formatMessage({ id: 'taskplan.新建抽屉.结束日期.提示' })}
              >
                <span>
                  {formatMessage({ id: 'taskplan.新建抽屉.结束日期' })}
                </span>
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
                      <Tooltip
                        title={formatMessage({
                          id: 'taskplan.新建抽屉.任务名.提示'
                        })}
                      >
                        <span>
                          {formatMessage({ id: 'taskplan.新建抽屉.任务名' })}
                        </span>
                      </Tooltip>
                    }
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                    rules={[{ required: true, message: 'Missing taskName' }]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'input.请输入' })}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label={
                      <Tooltip
                        title={formatMessage({
                          id: 'taskplan.新建抽屉.任务内容.提示'
                        })}
                      >
                        <span>
                          {formatMessage({ id: 'taskplan.新建抽屉.任务内容' })}
                        </span>
                      </Tooltip>
                    }
                    name={[name, 'content']}
                    fieldKey={[fieldKey, 'content']}
                    rules={[{ required: true, message: 'Missing taskContent' }]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'input.请输入' })}
                    />
                  </Form.Item>
                  {form.getFieldValue('tasks').length > 1 ? (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  ) : (
                    ''
                  )}
                </Space>
              ))}
              <Form.Item>
                <Tooltip
                  title={formatMessage({
                    id: 'taskplan.新建抽屉.添加任务.提示'
                  })}
                  placement="bottom"
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {formatMessage({ id: 'taskplan.新建抽屉.添加任务' })}
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

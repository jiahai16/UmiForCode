import { Drawer, Form, Input, Button, DrawerProps, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { initDrawerProps } from 'task/type'
import style from './index.less'

const NewTaskDrawer = ({ visible, onClose = () => {} }: DrawerProps) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Drawer
      width="50%"
      title="新建今日计划"
      placement="right"
      onClose={onClose}
      visible={visible}
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
          >
            完成
          </Button>
        </div>
      }
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="todayName" label="计划名称">
          <Input placeholder="请填写" />
        </Form.Item>

        <Form.List name="todayTasks">
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
                    label="任务名"
                    name={[name, 'taskName']}
                    fieldKey={[fieldKey, 'taskName']}
                    rules={[{ required: true, message: 'Missing taskName' }]}
                  >
                    <Input placeholder="请填写" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="任务内容"
                    name={[name, 'taskContent']}
                    fieldKey={[fieldKey, 'taskContent']}
                    rules={[{ required: true, message: 'Missing taskContent' }]}
                  >
                    <Input placeholder="请填写" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加任务
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  )
}

export default NewTaskDrawer

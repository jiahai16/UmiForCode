import { Drawer, Form, Input, Button, DrawerProps } from 'antd'
import { initDrawerProps } from 'task/type'
import style from './index.less'

const NewTaskDrawer = ({ visible, onClose = () => {} }: DrawerProps) => {
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
  }

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
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="taskName" label="计划名称">
          <Input placeholder="请填写" />
        </Form.Item>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Form>
    </Drawer>
  )
}

export default NewTaskDrawer

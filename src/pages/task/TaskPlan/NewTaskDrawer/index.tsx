import { Drawer, Form, Input, Button, DrawerProps } from 'antd'
import { initDrawerProps } from 'task/type'
import style from './index.less'

const NewTaskDrawer = ({ visible, onClose = () => {} }: DrawerProps) => {
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 }
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
    >
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="taskName" label="计划名称">
          <Input placeholder="请填写" />
        </Form.Item>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Form>
    </Drawer>
  )
}

export default NewTaskDrawer

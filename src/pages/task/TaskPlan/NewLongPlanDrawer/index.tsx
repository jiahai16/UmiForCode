import { Drawer, Form, Input, Button, DrawerProps, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { initDrawerProps } from 'task/type'
import style from './index.less'

const NewLongPlanDrawer = ({ visible, onClose = () => {} }: DrawerProps) => {
  const [form] = Form.useForm()

  const onFinish = () => {

    console.log(form.getFieldsValue(true))
  }

  return (
    <Drawer
      width="50%"
      title="新建长期计划"
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
            onClick={onFinish}
          >
            完成
          </Button>
        </div>
      }
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="LongName" label="计划名称">
          <Input placeholder="请填写" />
        </Form.Item>

      </Form>
    </Drawer>
  )
}

export default NewLongPlanDrawer

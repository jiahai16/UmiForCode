import { Switch } from 'antd'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import style from './index.less'
import { IGraph } from '@antv/g6'

// 初始数据
const initData = {
  id: '1',
  parent: null,
  label: '新建主题',
  labelCfg: {
    style: {
      fontSize: 14
    }
  },
  style: {
    radius: 6
  },
  anchorPoints: [
    [0.5, 0],
    [0.5, 1],
    [0, 0.5],
    [1, 0.5]
  ], // 四个锚点
  children: []
}
export default function GraphBar() {
  const [graph, setGraph] = useState<any>(null)
  const [currentType, setCurrentType] = useState(null)
  const [currentId, setCurrentId] = useState(null)
  const [edit, setEdit] = useState<boolean>(false)
  const [defaultFontSize, setDefaultFontSize] = useState<number>(14)
  const [fontSize, setFontSize] = useState<number>(14)
  const [treeData, setTreeData] = useState(initData)

  const updataTreeData = (data) => {
    setTreeData(data)
  }
  const changeLabelCfg = (value, type) => {
    // 修改label样式 目前 文字大小 颜色
    if (currentId) {
      const target = graph.findDataById(currentId)
      graph.update(
        target.id,
        {
          labelCfg: {
            style: {
              [type]: value
            }
          }
        },
        true
      )
      graph.paint()
      graph.fitView()
    }
  }

  const updataEdit = (flag: boolean) => {
    setEdit(flag)
  }

  const setEditorGraph = (graph) => {
    setGraph(graph)
  }

  const updataCurrentType = (type) => {
    setCurrentType(type)
  }

  const updataCurrentId = (id) => {
    setCurrentId(id)
  }

  const addItem = (target) => {
    // 添加节点
    let id = null
    if (target.children && target.children.length > 0) {
      const tId = target.children[target.children.length - 1].id
      const cIds = tId.split('-')
      cIds[cIds.length - 1] = `${~~cIds[cIds.length - 1] + 1}`
      id = cIds.join('-')
    } else {
      // 子节点为空时 添加子节点
      id = target.id + '-' + 1
    }

    return {
      id: `${id}`,
      parent: `${target.id}`,
      label: '分支主题',
      labelCfg: {
        style: {
          fontSize: defaultFontSize
        }
      },
      style: {
        radius: 6
      },
      anchorPoints: [
        [0.5, 0],
        [0.5, 1],
        [0, 0.5],
        [1, 0.5]
      ],
      children: []
    }
  }

  const addChildItem = () => {
    if (!edit) {
      message.warning('请先切换编辑模式～')
      return
    }
    if (!currentId) {
      message.warning('请先选择目标节点～')
      return
    }
    const target = graph?.findDataById(currentId)
    // 添加子节点
    const data = addItem(target)
    graph.addChild(data, currentId)
    updataTreeData(graph.findDataById('1'))
    graph.paint()
    graph.fitView()
  }

  const addPeerItem = () => {
    if (!edit) {
      message.warning('请先切换编辑模式～')
      return
    }
    if (!currentId) {
      message.warning('请先选择目标节点～')
      return
    }
    const target = graph.findDataById(currentId)
    // 获取父节点 添加子节点
    const parent = graph.findDataById(target.parent)
    if (!target.parent) {
      message.warning('根节点无法添加同级元素～')
      return
    }
    const data = addItem(parent)
    graph.addChild(data, target.parent)
    updataTreeData(graph.findDataById('1'))
    graph.paint()
    graph.fitView()
  }

  const changeModeToEdit = () => {
    // 点击编辑按钮时
    if (edit) {
      // 清除之前选中的节点选中状态
      if (currentId) {
        const oldItem = graph.findById(currentId)
        graph.clearItemStates(oldItem, ['selected'])
      }
      // 重设为默认状态
      graph.setMode('default')
      updataEdit(false)
    } else {
      graph.setMode('edit')
      updataEdit(true)
    }
  }
  return (
    <div className={style.wrap}>
      启用编辑：
      <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    </div>
  )
}

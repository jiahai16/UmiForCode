import G6 from '@antv/g6'
import { useRef, useState, memo } from 'react'
import { useEffect } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import { message, Switch, Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import style from './index.less'
import openNotification from '@/components/Notification'
import { useIntl } from 'umi'

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
function GraphLable() {
  const { formatMessage } = useIntl()

  const inputEditRef = useRef()
  const graphRef = useRef(null)

  const [graph, setGraph] = useState<any>(graphRef.current) // 设置画布
  const [editFlag, setEditFlag] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [currentType, setCurrentType] = useState(null)
  const [currentId, setCurrentId] = useState(null)
  const [edit, setEdit] = useState<boolean>(false)
  const [defaultFontSize, setDefaultFontSize] = useState<number>(14)
  const [fontSize, setFontSize] = useState<number>(14)
  const [treeData, setTreeData] = useState(initData)

  const saveLocal = (): void => {
    localStorage.setItem('localGuideData', JSON.stringify(treeData))
  }

  const recoverData = (): void => {
    const Data = localStorage.getItem('localGuideData')
    setTreeData(JSON.parse(Data as string))
  }

  const destroyData = (): void => {
    localStorage.removeItem('localGuideData')
  }

  const isHasLoaclData = (): void => {
    if (localStorage.getItem('localGuideData') != null) {
      openNotification(recoverData, destroyData)
    }
  }

  const addItem = (target: any) => {
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
    graph?.addChild(data, currentId)
    setTreeData(graph?.findDataById('1'))
    saveLocal()
    graph?.paint()
    graph?.fitView()
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
    graph?.addChild(data, target.parent)
    setTreeData(graph?.findDataById('1'))
    saveLocal()
    graph?.paint()
    graph?.fitView()
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
      setEdit(false)
    } else {
      graph.setMode('edit')
      setEdit(true)
    }
  }
  const textShow = () => {
    // 编辑文本是否显示
    setEditFlag(!editFlag)
  }

  const textChange = (event) => {
    // 设置改变的文本内容
    const val = event.target.value
    setEditValue(val)
  }

  const setGraphObj = () => {
    const graph = new G6.TreeGraph({
      container: 'container',
      width: 1300,
      height: 800,
      fitView: true,
      modes: {
        default: [
          // {
          //   type: 'collapse-expand',
          //   onChange: function onChange(item, collapsed) {
          //     // const data = item.get('model').data;
          //     // data.collapsed = collapsed;
          //     const model = item!.getModel()
          //     model.collapsed = collapsed
          //     return true
          //   }
          // },
          'drag-canvas',
          'zoom-canvas'
        ],
        edit: []
      },
      defaultNode: {
        type: 'rect',
        size: [80, 30]
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#002649',
          cursor: 'default'
        },
        labelCfg: {
          position: 'middle',
          style: {
            textAlign: 'center',
            textBaseline: 'middle',
            fontStyle: 'normal'
          }
        }
      },
      nodeStateStyles: {
        selected: {
          stroke: '#002649',
          lineWidth: 1,
          shadowBlur: 5,
          fill: '#F5F5F7',
          cursor: 'pointer'
        }
      },
      // 布局
      layout: {
        type: 'mindmap',
        direction: 'LR',
        getHeight: () => {
          return 16
        },
        getWidth: () => {
          return 16
        },
        getVGap: () => {
          return 10
        },
        getHGap: () => {
          return 100
        },
        getSide: () => {
          return 'right'
        }
      }
    })

    graph.on('node:click', (evt) => {
      const { item } = evt
      const model = item!.getModel()
      const mode = graph.getCurrentMode()
      if (mode === 'edit') {
        // 编辑模式 显示红框
        // 清除其他节点的选中状态
        if (currentId && currentId !== model.id) {
          const oldItem = graph.findById(currentId)
          oldItem && graph.clearItemStates(oldItem, ['selected'])
        }
        const { states } = item._cfg
        if (states.includes('selected')) {
          graph.setItemState(item, 'selected', false)
          graph.setItemState(item, 'unselected', true)
          setCurrentId(null)
          setCurrentType(null)
        } else {
          graph.setItemState(item, 'selected', true)
          graph.setItemState(item, 'unselected', false)
          setCurrentId(model.id)
          setCurrentType('node')
        }
      }
    })

    graph.on('node:dblclick', (evt) => {
      const { x, y } = evt?.item?.calculateBBox()
      const realPosition = evt.currentTarget.getClientByPoint(x, y)
      const { item } = evt
      const model = item?.getModel()
      const mode = graph.getCurrentMode()
      if (mode === 'edit') {
        // 显示input编辑框  设置目标节点id 类型 初始化input样式
        textShow()
        setCurrentId(model.id)
        setCurrentType('node')
        initEdit(model, 'node', realPosition)
        saveLocal()
      }
    })

    graph.on('node:drag', (evt) => {
      const { item, clientX, clientY } = evt
      const point = graph.getPointByClient(clientX, clientY)
      const model = item.getModel()
      item.toFront()
      item.updatePosition(point)

      if (model.id !== '1') {
        let source = item.getNeighbors('source')
        source = source[0]
        const targetEdges = source.getEdges()
        // 需要调整连接点的边
        let tartgetEdge = targetEdges.filter((i) => {
          const m = i.getModel()
          if (m.target === model.id) {
            return i
          }
        })
        tartgetEdge = tartgetEdge[0]
        // 调整边的model
        const tM = tartgetEdge.getModel()
        // 调整边连接的终点坐标
        const tEndPoint = tM.endPoint
        // 调整边源节点  tM.sourceNode存在 但是获取不到 玄学
        const sNode = graph.findById(tM.source)
        // 获取源节点离终点坐标 最近的锚点
        const sLinkPoint = sNode.getLinkPoint(tEndPoint)
        // 获取最近的锚点的索引
        const sAnchorIndex = sLinkPoint.anchorIndex
        // 更新目标边的源锚点索引
        graph.update(
          tartgetEdge,
          {
            sourceAnchor: sAnchorIndex
          },
          true
        )
      }
      graph.update(item, model)
      graph.paint()
    })

    graphRef.current = graph
    setGraph(graphRef.current)
  }

  const renderGraph = () => {
    graph.clear() // 清除画布
    graph.data(cloneDeep(treeData)) // 传递数据
    graph.render() // 渲染画布
    graph.fitView() // 适应视图
  }

  const initEdit = (target, type, position) => {
    const edit = inputEditRef.current
    setEditValue(() => '')
    edit.value = target.label
    if (type === 'node') {
      edit.style.left = `${position.x + 1}px`
      edit.style.top = `${position.y + 1}px`
      edit.style.width = `${target.size[0] - 3}px`
      edit.style.height = `${target.size[1] - 3}px`
      edit.style.fontSize = `${fontSize}px`
      edit.style.borderRadius = `6px`
      edit.style.background = `#F5F5F7`
    }
    edit.focus()
  }

  useEffect(() => {
    setGraphObj() // 初始化画布
    isHasLoaclData() //检查是否有本地缓存数据
  }, [])

  useEffect(() => {
    if (graph && treeData) {
      renderGraph() // 渲染画布
    }
  }, [treeData, graph])

  useEffect(() => {
    // 当编辑文本的内容改变时  更新数据的label
    // 根据文本的字数 修改节点的宽度
    if (!editFlag && currentId) {
      const item = graph.findById(currentId)
      const model = item.getModel()
      const fontSize = model.labelCfg.style.fontSize
      if (editValue) {
        graph.updateItem(
          item,
          {
            label: editValue,
            size: [(editValue.length + 2) * fontSize, model.size[1]]
          },
          true
        )
        setTreeData(treeData)
      }
    }
  }, [editFlag, currentId, editValue])

  // document.onkeydown = (e) => {
  //   // 键盘按下操作
  //   e.preventDefault()
  //   const { keyCode } = e
  //   if (keyCode === 9 && currentId) {
  //     // tab键 添加子节点
  //     addChildItem()
  //   }
  //   if (keyCode === 13 && currentId) {
  //     // 回车时 找到目标节点 显示文本编辑框
  //     const model = graph.findDataById(currentId)
  //     textShow()
  //     setCurrentId(model.id)
  //     setCurrentType('node')
  //     initEdit(model, 'node')
  //   }

  //   if (keyCode === 8 && currentId) {
  //     // 按下Backspace按钮时删除节点
  //     if (currentId === '1') {
  //       message.warning('根节点不能删除～')
  //       return
  //     }
  //     graph.removeChild(currentId)
  //     graph.paint()
  //     setTreeData(graph.findDataById('1'))
  //   }
  // }

  return (
    <div>
      <div className={style.barWrap}>
        <div className={style.editBtn}>
          {formatMessage({ id: 'hotelStudyGuide.启用编辑' })}：
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={() => {
              changeModeToEdit()
            }}
          />
        </div>
        <div className={edit ? style.editBtnBar : style.editBtnBarHidden}>
          {formatMessage({ id: 'hotelStudyGuide.添加节点' })}：
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            size={'small'}
            style={{ marginRight: 20 }}
            onClick={addPeerItem}
          >
            {formatMessage({ id: 'hotelStudyGuide.添加同级节点' })}
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            size={'small'}
            onClick={addChildItem}
          >
            {formatMessage({ id: 'hotelStudyGuide.添加子节点' })}
          </Button>
        </div>
      </div>
      <div>
        <div id={'container'}>
          <input
            type="text"
            ref={inputEditRef}
            className={classNames(
              style.inputEdit,
              !editFlag && style.inputEditHidden
            )}
            onChange={textChange}
            onBlur={textShow}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(GraphLable)

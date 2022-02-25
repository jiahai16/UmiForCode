import { Tag, Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import style from './index.less'
import React from 'react'

class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: ''
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag)
    console.log(tags)
    this.setState({ tags })
    this.props?.setTagToForm({
      tags: tags
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    console.log(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    })
    this.props?.setTagToForm({
      tags: tags
    })
  }

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value })
    this.props?.setTagToForm({
      tags: tags
    })
  }

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags]
      newTags[editInputIndex] = editInputValue

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: ''
      }
    })
    this.props?.setTagToForm({
      tags: tags
    })
  }

  saveInputRef = (input) => {
    this.input = input
  }

  saveEditInputRef = (input) => {
    this.editInput = input
  }

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } =
      this.state
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className={style.tagInput}
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            )
          }

          const isLongTag = tag.length > 10

          const tagElem = (
            <Tag
              className={style.editTag}
              key={tag}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  this.setState(
                    { editInputIndex: index, editInputValue: tag },
                    () => {
                      this.editInput.focus()
                    }
                  )
                  e.preventDefault()
                }}
              >
                {isLongTag ? `${tag.slice(0, 10)}...` : tag}
              </span>
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {tags.length < 4 && (
          <>
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                className={style.tagInput}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className={style.siteTagPlus} onClick={this.showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </>
        )}
      </>
    )
  }
}

export default EditableTagGroup

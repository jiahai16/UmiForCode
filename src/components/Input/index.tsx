import './index.less'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'
import { useState } from 'react'
import { useEffect } from 'react'

type inputPropsType = InputProps & {
  // TODO:可以继续添加自己想要的结构
  width: Number | String
}

export default function MyInput({
  value = '',
  onChange = (val: any) => {},
  width = 222,
  ...otherProps
}: inputPropsType) {
  // TODO:
  const [innerValue, setInnerValue] = useState(value)

  function handleChange(e: any) {
    const val: any = e.target.value
    setInnerValue(val)
    onChange && onChange(val)
  }

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  return (
    <Input
      className="input-class"
      style={{width}}
      value={innerValue}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

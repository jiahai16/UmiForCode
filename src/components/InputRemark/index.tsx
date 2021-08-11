import Input from 'Input'
import { useState } from 'react'

export default function InputRemark({value = '' || [] || {}, width = 220, record = {}, onBlur = (option:any) => {} } ) {
  const [isEdit, setIsEdit] = useState(false)

  const handleBlur = (e:any, record: any) => {
    setIsEdit(false)
    onBlur && onBlur(e, record)
  }

  if (isEdit) {
    return (
      <Input
        width={width}
        autoFocus
        value={value}
        onBlur={(e) => handleBlur(e, record)}
      />
    )
  }

  return <span onClick={() => setIsEdit(true)}>{value}</span>
}

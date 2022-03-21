import { useState } from 'react'
import { Avatar, Upload } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import style from './index.less'

import ImgCrop from 'antd-img-crop'

const AvaImg = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [avaImgData, setAvaImgData] = useState(user?.img)

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: avaImgData
    }
  ])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleAvaChange = (avaKey) => {
    setAvaImgData(avaKey)
  }

  return (
    <div>
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <div className={style.avaList}>
        <div className={style.avaImg} style={{ background: '#81ecec' }}>
          <img
            src='http://101.43.25.47/user/img/default/001.JPG'
            className={style.avaUrl}
            onClick={() => handleAvaChange('man1')}
          />
        </div>
        <div
          className={style.avaImg}
          style={{ marginLeft: 14, background: '#74b9ff' }}
        >
          <img
            src='http://101.43.25.47/user/img/default/002.JPG'
            className={style.avaUrl}
            onClick={() => handleAvaChange('woman1')}
          />
        </div>
        <div
          className={style.avaImg}
          style={{ marginLeft: 14, background: '#ff7675' }}
        >
          <img
            src='http://101.43.25.47/user/img/default/003.JPG'
            className={style.avaUrl}
            onClick={() => handleAvaChange('woman2')}
          />
        </div>
        <div
          className={style.avaImg}
          style={{ marginLeft: 14, background: '#74b9ff' }}
        >
          <img
            src='http://101.43.25.47/user/img/default/004.JPG'
            className={style.avaUrl}
            onClick={() => handleAvaChange('woman3')}
          />
        </div>
      </div>
    </div>
  )
}

export default AvaImg

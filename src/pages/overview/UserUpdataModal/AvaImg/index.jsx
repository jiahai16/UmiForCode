import { useState } from 'react'
import { Avatar, Upload, message } from 'antd'
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

  const handleAvaChange = (avaKey) => {
    setAvaImgData(avaKey)
  }

  const uploadProps = {
    beforeUpload: (file) => {
      const next = ['png', 'jpg', 'jpeg', 'svg'].some((item) =>
        file.type.includes(item)
      )
      if (!next) {
        message.error(`${file.name} 不是图片类型`)
      }
      return next ? true : Upload.LIST_IGNORE
    },
    onChange: (info) => {
      setFileList(info.fileList)
      if (info.fileList.length !== 0) {
        if (info?.file?.response?.code === 200) {
          message.success('图片上传成功')
        } else if (info?.file?.response && info?.file?.response?.code !== 200) {
          message.error(info?.file?.response?.resultMsg)
        }
      }
    },
    action: '/core-api/user/uploadImg'
  }
  return (
    <div>
      <ImgCrop rotate>
        <Upload listType="picture-card" fileList={fileList} {...uploadProps}>
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <div className={style.avaList}>
        <div className={style.avaImg} style={{ background: '#81ecec' }}>
          <img
            src="http://101.43.25.47/user/img/default/001.JPG"
            className={style.avaUrl}
            onClick={() =>
              handleAvaChange('http://101.43.25.47/user/img/default/001.JPG')
            }
          />
        </div>
        <div
          className={style.avaImg}
          style={{ marginLeft: 14, background: '#74b9ff' }}
        >
          <img
            src="http://101.43.25.47/user/img/default/002.JPG"
            className={style.avaUrl}
            onClick={() =>
              handleAvaChange('http://101.43.25.47/user/img/default/002.JPG')
            }
          />
        </div>
        <div
          className={style.avaImg}
          style={{ marginLeft: 14, background: '#ff7675' }}
        >
          <img
            src="http://101.43.25.47/user/img/default/003.JPG"
            className={style.avaUrl}
            onClick={() =>
              handleAvaChange('http://101.43.25.47/user/img/default/003.JPG')
            }
          />
        </div>
        <div
          className={style.avaImg}
          style={{ marginLeft: 14, background: '#74b9ff' }}
        >
          <img
            src="http://101.43.25.47/user/img/default/004.JPG"
            className={style.avaUrl}
            onClick={() =>
              handleAvaChange('http://101.43.25.47/user/img/default/004.JPG')
            }
          />
        </div>
      </div>
    </div>
  )
}

export default AvaImg

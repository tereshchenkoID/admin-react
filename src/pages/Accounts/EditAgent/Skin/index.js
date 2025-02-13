import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import classNames from 'classnames'

import { postData } from 'hooks/useRequest'
import { setToastify } from 'store/actions/toastifyAction'

import Button from 'components/Button'
import Debug from 'modules/Debug'
import Create from './Create'
import Update from './Update'

import style from './index.module.scss'

const Skin = ({ data, inherit, setUpdate }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [tab, setTab] = useState(0)
  const [filter, setFilter] = useState(data.skin[tab])
  const [skin, setSkin] = useState(null)
  const isDisabled = inherit === '1'

  const handlePropsChange = (index, value) => {
    setSkin((prevFilter) =>
      prevFilter.map((item, i) =>
        i === index ? { ...item, value: value } : item
      )
    );
  }

  const handleResetForm = () => {
    setFilter(data.skin[tab])
    handleLoadSkin(data.skin[tab].id)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', data.id)
    formData.append('username', data.username)
    formData.append('skinId', filter.id)
    formData.append('skinName', filter.name)
    formData.append('data', JSON.stringify(skin))
    formData.append('inherit', inherit)

    postData('accounts/edit/skin/', formData).then(json => {
      if (json.code === '0') {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        )
        setUpdate(true)
        setFilter(data.skin[tab])
        handleLoadSkin(data.skin[tab].id)
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  const handleLoadSkin = (id) => {
    const formData = new FormData()
    formData.append('id', id)

    postData('settings/skin/', formData).then(json => {
      setSkin(json.data.skin)

      if (json.code === '0') {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        )
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  return (
    <>
      <Debug data={filter} />
      <div className={style.tab}>
        <button
          type={'button'}
          className={classNames(style.link, tab === 0 && style.active)}
          aria-label={'Create'}
          onClick={() => {
            setTab(0)
            setFilter(data.skin[0])
          }}
        >
          {t('create')}
        </button>
        <button
          type={'button'}
          className={classNames(style.link, tab === 1 && style.active)}
          aria-label={'Update'}
          onClick={() => {
            setTab(1)
            setFilter(data.skin[1])
          }}
        >
          {t('update')}
        </button>
      </div>

      <form className={style.block} onSubmit={handleSubmit}>
        {
          tab === 0 &&
          <Create 
            skin={skin}
            handleLoadSkin={handleLoadSkin}
            handlePropsChange={handlePropsChange}
            isDisabled={isDisabled}
            filter={filter}
            setFilter={setFilter}
          />
        }
        {
          tab === 1 &&
          <Update 
            skin={skin}
            handleLoadSkin={handleLoadSkin}
            handlePropsChange={handlePropsChange}
            isDisabled={isDisabled}
            filter={filter}
            setFilter={setFilter}
          />
        }
        <div className={style.actions}>
          <Button 
            type={'submit'} 
            classes={'primary'} 
            placeholder={tab === 0 ? t('save') : t('update')} 
          />
          <Button
            type={'reset'}
            placeholder={t('cancel')}
            onChange={handleResetForm}
          />
        </div>
      </form>
    </>
  )
}

export default Skin

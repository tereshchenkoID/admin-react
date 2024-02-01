import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { setAuth } from 'store/actions/authAction'
import { setToastify } from 'store/actions/toastifyAction'

import { postData } from 'helpers/api'

import Field from 'components/Field'
import Paper from 'components/Paper'
import Button from 'components/Button'
import Password from 'components/Password'

import style from './index.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const initialValue = {
    username: 'admin',
    password: 'qwe123',
  }

  const [filter, setFilter] = useState(initialValue)

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter(prevData => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const handleResetForm = () => {
    setFilter(initialValue)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', filter.username)
    formData.append('password', filter.password)

    postData(`login/`, formData).then(json => {
      if (json.code === '0') {
        sessionStorage.setItem('authToken', JSON.stringify(json))
        dispatch(setAuth(json))
        dispatch(
          setToastify({
            type: 'success',
            text: t('successfully_logged'),
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
    <div className={style.block}>
      <Paper headline={t('login')} classes={['sm']}>
        <form onSubmit={handleSubmit} className={style.form}>
          <Field
            type={'text'}
            placeholder={t('username')}
            data={filter.username}
            onChange={value => handlePropsChange('username', value)}
            required={true}
          />
          <Password
            placeholder={t('password')}
            data={filter.password}
            onChange={value => handlePropsChange('password', value)}
            required={true}
          />
          <div className={style.actions}>
            <Button
              type={'submit'}
              classes={'primary'}
              placeholder={t('login')}
            />
            <Button
              type={'reset'}
              placeholder={t('cancel')}
              onChange={handleResetForm}
            />
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default Login

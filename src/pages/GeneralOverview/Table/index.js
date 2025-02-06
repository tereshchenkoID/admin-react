import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { postData } from 'helpers/api'
import { convertFixed } from 'helpers/convertFixed'

import Dropdown from 'actions/Dropdown'

import style from './index.module.scss'

const Option = ({
  t,
  data,
  filter,
  handlePropsChange,
  config,
  config_2,
  cmd,
  setCmd,
}) => {
  const [table, setTable] = useState(null)
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (id, username, event) => {
    if (table && event) {
      setActive(!active)
    } else {
      setLoading(true)
      const formData = new FormData()
      formData.append('id', id)
      formData.append('username', username)
      formData.append('date-from', filter['date-from'])
      formData.append('date-to', filter['date-to'])

      postData('financialOverview/', formData).then(json => {
        if (json.status === 'OK') {
          setTable(json.data)
          setActive(true)
          setLoading(false)
          setCmd(false)
        }
      })
    }
  }

  const handleReset = () => {
    setTable(null)
    setActive(false)
  }

  useEffect(() => {
    if (cmd === 'submit') {
      if (data.id === filter.agent.id) {
        handleReset()
        handleSubmit(filter.agent.id, filter.agent.username, false)
      }
    }

    if (cmd === 'reset') {
      handleReset()
      setCmd(false)
    }
  }, [cmd])

  return (
    <>
      <div className={classNames(style.row, style.sm, active && style.active)}>
        <div className={style.cell}>
          <Dropdown
            data={active}
            action={() => handleSubmit(data.id, data.username, true)}
            loading={loading}
          />
        </div>
        <div className={style.cell}>
          {data.username || filter.agent.username}
        </div>
      </div>
      {active && (
        <div className={style.wrapper}>
          <div className={style.overflow}>
            <div className={style.table}>
              <div className={classNames(style.row, style.lg, style.headline)}>
                {config_2.map((el, idx) => (
                  <div key={idx} className={style.cell}>
                    {t(el.text)}
                  </div>
                ))}
              </div>
              {table &&
                table.days?.map((day, days_idx) => (
                  <React.Fragment key={days_idx}>
                    {day.report.length > 0 ? (
                      day.report.map((report, report_idx) => (
                        <div
                          key={report_idx}
                          className={classNames(style.row, style.lg)}
                        >
                          {config_2.map((key, value_idx) => (
                            <div key={value_idx} className={style.cell}>
                              {key.key === 'date-from' ? (
                                report_idx === 0 ? (
                                  <>
                                    <div>{day['date-from']}</div>
                                    <div>{day['date-to']}</div>
                                  </>
                                ) : (
                                  ''
                                )
                              ) : key.key !== 'date-from' &&
                                key.key !== 'currency' ? (
                                convertFixed(report[key.key])
                              ) : (
                                report[key.key]
                              )}
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className={classNames(style.row, style.wide)}>
                        <div className={style.cell}>
                          <div>{day['date-from']}</div>
                          <div>{day['date-to']}</div>
                        </div>
                        <div className={style.cell}>
                          {t('no_matching_records_found')}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
          {data.clients &&
            data.clients.map((el, idx) => (
              <Option
                key={idx}
                t={t}
                data={el}
                filter={filter}
                handlePropsChange={handlePropsChange}
                config={config}
                config_2={config_2}
                cmd={cmd}
                setCmd={setCmd}
              />
            ))}
        </div>
      )}
    </>
  )
}

const Table = ({ data, filter, config_1, config_2, cmd, setCmd }) => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={classNames(style.row, style.sm, style.headline)}>
        <div className={style.cell} />
        {config_1.map((el, idx) => (
          <div key={idx} className={style.cell}>
            {t(el.text)}
          </div>
        ))}
      </div>
      {data.map((el, idx) => (
        <Option
          key={idx}
          t={t}
          data={el}
          config_1={config_1}
          config_2={config_2}
          filter={filter}
          cmd={cmd}
          setCmd={setCmd}
        />
      ))}
    </div>
  )
}

export default Table

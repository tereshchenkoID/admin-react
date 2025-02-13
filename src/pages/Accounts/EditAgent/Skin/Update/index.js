import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Select from 'components/Select'
import ColorPicker from '../ColorPicker'

const Update = ({
  isDisabled,
  handlePropsChange,
  handleLoadSkin,
  skin,
  filter,
  setFilter
}) => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)

  useEffect(() => {
    handleLoadSkin(filter.id)
  }, [filter])

  if(!skin) return

  return (
    <>
      <Select
        placeholder={t('skin')}
        options={
          settings.skins.map(item => ({
            value: item.id,
            label: item.name,
          }))
        }
        data={filter.id}
        onChange={(value) => setFilter(settings.skins.find(item => item.id === value))}
        classes={[isDisabled && 'disabled']}
      />
      {
        skin?.map((el, idx) =>
          <ColorPicker
            key={idx}
            data={el}
            isDisabled={isDisabled || el.visible === '0'}
            onChange={(value) => handlePropsChange(idx, value)}
          />
        )
      }
    </>
  )
}

export default Update

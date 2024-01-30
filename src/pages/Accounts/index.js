import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {service} from "constant/config";

import {convertOptions} from "helpers/convertOptions";

import Debug from "modules/Debug";
import Agents from "modules/Agents";
import Paper from "components/Paper";
import Select from "components/Select";
import Button from "components/Button";
import Table from "./Table";

import style from './index.module.scss';

const config_1 = [
	{
		key: 'username',
		text: 'username'
	},
	{
		key: 'full_name',
		text: 'full_name'
	},
	{
		key: 'credits',
		text: 'credits',
	},
	{
		key: 'commission',
		text: 'commission',
	},
	{
		key: 'currency',
		text: 'currency'
	},
	{
		key: 'locked',
		text: 'locked'
	}
]

const config_2 = [
	{
		key: 'shops',
		text: 'shops'
	}
]

const Accounts = () => {
	const { t } = useTranslation()
	const {agents} = useSelector((state) => state.agents)
	const {settings} = useSelector((state) => state.settings)
  const [search, setSearch] = useState(false)

	const initialValue = {
		'agent': {
			'id': agents[0].id,
			'username': agents[0].username
		},
		'locked': '',
		'currency': ''
	}
	const [filter, setFilter] = useState(initialValue)
	const [data, setData] = useState(agents)

	const handleSubmit = (event) => {
		event && event.preventDefault()
		setData(searchFilter(agents[0]))
    setSearch(true)
	}

	const searchFilter = (node) => {
		const s = {
			id : node.id
		}
		const t = {
			id : filter.agent.id
		}

		if (filter.locked) {
			s.locked = Number(node.locked)
			t.locked = filter.locked
		}
		if (filter.currency) {
			s.currency = node.currency
			t.currency = filter.currency
		}

		if (JSON.stringify(s) === JSON.stringify(t)) {
			return [node]
		}

		if (node.clients) {
			let results = [];
			for (const client of node.clients) {
				results = results.concat(searchFilter(client));
			}
			return results;
		}

		return [];
	};

	const handleResetForm = () => {
		setFilter(initialValue)
		setData(agents)
    setSearch(false)
	}

	const handlePropsChange = (fieldName, fieldValue) => {
		setFilter((prevData) => ({
			...prevData,
			[fieldName]: fieldValue,
		}))
	}

  useEffect(() => {
    if (search) {
      setData(searchFilter(agents[0]))
    }
    else {
      setData(agents)
    }
  }, [agents]);

  return (
    <>
      <Paper headline={t('account_search')}>
        <Debug data={filter} />
        <form onSubmit={handleSubmit}>
          <div className={style.grid}>
            <div>
              <Agents
                data={filter.agent}
                options={agents}
                onChange={(value) => handlePropsChange('agent', value)}
              />
            </div>
            <div>
              <Select
                placeholder={t('locked')}
                options={convertOptions(service.YES_NO)}
                data={filter.locked}
                onChange={(value) => handlePropsChange('locked', value)}
              />
            </div>
            <div>
              <Select
                placeholder={t('currency')}
                options={
                  settings.currencies.map(currency => ({
                    value: currency,
                    label: currency
                  }))
                }
                data={filter.currency}
                onChange={(value) => handlePropsChange('currency', value)}
              />
            </div>
          </div>
          <div className={style.actions}>
            <Button
              type={'submit'}
              classes={'primary'}
              placeholder={t("search")}
            />
            <Button
              type={'reset'}
              placeholder={t("cancel")}
              onChange={handleResetForm}
            />
          </div>
        </form>
      </Paper>
      <Paper>
        <Table
          data={data}
          filter={filter}
          config_1={config_1}
          config_2={config_2}
          handleDataChange={setData}
        />
      </Paper>
    </>
  )
}

export default Accounts;

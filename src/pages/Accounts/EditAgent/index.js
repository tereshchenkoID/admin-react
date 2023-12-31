import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import Currency from "./Currency";
import General from "./General";
import Shop from "./Shop";
import Logo from "./Logo";

import style from './index.module.scss';

const getContent = (active, data) => {
	switch (active) {
		case 0:
			return <General data={data} />
		case 1:
			return <Shop data={data} />
		case 2:
			return <Logo data={data} />
		case 3:
			return <Currency data={data} />
		default:
			return null
	}
}

const EditAgent = ({data}) => {
	const { t } = useTranslation()
	const [active, setActive] = useState(2)
	
	return (
		<div className={style.block}>
			<div className={style.header}>
				<button
					className={
						classNames(
							style.link,
							active === 0 && style.active,
						)
					}
					onClick={() => setActive(0)}
				>
					{t('general')}
				</button>
				<button
					className={
						classNames(
							style.link,
							active === 1 && style.active,
						)
					}
					onClick={() => setActive(1)}
				>
					{t('shop')}
				</button>
				<button
					className={
						classNames(
							style.link,
							active === 2 && style.active,
						)
					}
					onClick={() => setActive(2)}
				>
					{t('logo')}
				</button>
				<button
					className={
						classNames(
							style.link,
							active === 3 && style.active,
						)
					}
					onClick={() => setActive(3)}
				>
					{t('currency')}
				</button>
			</div>
			<div className={style.body}>
				{getContent(active, data)}
			</div>
		</div>
    );
}

export default EditAgent;

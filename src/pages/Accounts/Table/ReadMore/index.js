import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import style from './index.module.scss';

const ReadMore = ({data}) => {
	const { t } = useTranslation()
	const [active, setActive] = useState(false)
	
	return (
        <div
			className={
				classNames(
					style.block,
					active && style.active
				)
			}
		>
			<ul className={style.list}>
				{
					Object.entries(data).map(([key, value]) =>
						<li key={key}>{key} {value}</li>
					)
				}
			</ul>
			<button
				className={style.button}
				type={'button'}
				onClick={() => setActive(!active)}
			>
				{
					active
						?
							t('less_more')
						:
							t('read_more')
				}
			</button>
		</div>
    );
}

export default ReadMore;

import React from "react";
import {useTranslation} from "react-i18next";

import Button from "components/Button";

const GeneratePassword = ({data, action, list}) => {
	const { t } = useTranslation()
	
	const generatePassword = () => {
		const newData = data
		const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
		let newPassword = ''
		
		for (let i = 0; i < 8; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			newPassword += charset.charAt(randomIndex);
		}
		
		list.forEach(el =>
			newData[el] = newPassword
		)
		
		action(() => ({
			...newData
		}))
	};
	
	return (
		<Button
			type={'button'}
			classes={'primary'}
			placeholder={t('generate_password')}
			onChange={() => {
				generatePassword()
			}}
		/>
	);
}

export default GeneratePassword;

import {useRef, useState} from 'react';

import classNames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import style from './index.module.scss';

const Field = ({
	type,
	placeholder,
	data,
	onChange,
	classes= null,
	required = false
}) => {
	const [show, setShow] = useState(false)
	const inputRef = useRef(null)
	
	const onFocus = () => {
		inputRef.current.focus();
	}
	
	return (
        <div
			className={
				classNames(
					style.block,
					style[type],
					style[classes]
				)
			}
		>
			<input
				ref={inputRef}
				className={style.input}
				type={show ? 'text' : type}
				value={data}
				onChange={(e) => {
					onChange(e.currentTarget.value)
				}}
				required={required}
			/>
			<label
				className={style.label}
				onClick={onFocus}
			>
				{placeholder}
				{
					required &&
					<span>*</span>
				}
			</label>
			{
				type === 'password' &&
				<button
					onClick={() => setShow(!show)}
					className={style.eye}
					type={'button'}
				>
					{
						show
							?
								<FontAwesomeIcon icon="fa-solid fa-eye"/>
							:
								<FontAwesomeIcon icon="fa-solid fa-eye-slash"/>
					}
				</button>
			}
        </div>
    );
}

export default Field;

import React, { Fragment } from "react";
import classnames from "classnames";

export default function Input (props){
	const {
		label,
		className,
		type,
		placeholder,
		field,
		name,
		isMandatory,
		value,
		disabled,
		withLabel,
		...attr
	} = props;

	const validateInput = (event) => {
		//when user unput enter
		if (event.keyCode == 13) return event.preventDefault();
		console.log(type)
		if (type === "number") {
			//not allowed when user input `e` and type number
			return event.keyCode == 69 ? event.preventDefault() : true;
		}
		return true;
	};

	const labelClasses = classnames(
		"block text-grey-darker text-sm font-bold mb-2",
		isMandatory ? "is-mandatory" : "",
	);

	const contentClasses = classnames("w-full",type === 'numberphone'&&"relative")
	const inputClasses = classnames("appearance-none border rounded w-full py-2 px-3 text-grey-darker",type === 'numberphone'&&"input-numberphone")
	return (
		<Fragment>
			<div className={contentClasses}>
				{withLabel ?? (
						<label className={labelClasses}>{label}</label>
				)}
			
				<input
					className={inputClasses}
					name={name}
					type={type === 'numberphone' ? 'number' :  type }
					value={value}
					placeholder={placeholder}
					onKeyDown ={validateInput}
					disabled={disabled}
					{...attr}
					{...field}
				/>
				{type === 'numberphone' && (<span className="input-numberphone__span">+62 | </span>)}
				
			</div>

		</Fragment>
	);
};


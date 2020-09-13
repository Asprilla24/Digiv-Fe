import React from "react";
import classnames from "classnames";
import { Field } from "formik";
import  {Input,TextArea}  from "@components/element/input";
import  SelectAutoComplete  from "@components/element/selectAutoComplete";

const FormField = (props) => {
	const {
		name,
		inputType = "input",
		className,
		label,
		placeholder,
		disabled = false,
		...attr
	} = props;

	const classes = classnames(className, "field");
    let ElementInput

	const getElemenInput = () => {
		switch (inputType) {
			case 'selectAutoComplete':
				return SelectAutoComplete
			case 'textArea':
				return TextArea
			case "input":
			case "hidden":
			case "password":
			default:
				return Input
		
		}
	};

	ElementInput = getElemenInput()


	return (
		<Field
			name={name}
			render={(fieldProps) => {
				const { field, form } = fieldProps;

				return (
					<div className={classes}>
						<ElementInput
							label={label}
							type={inputType}
							disabled={disabled}
							placeholder={placeholder}
							name={name}
							{...field}
							{...attr}
						/>
						{form.errors[field.name] && form.touched[field.name] ? (
							<p className='text-xl mt-1 text-red-600 text-base'>{form.errors[field.name]}</p>
						) : null}
					</div>
				);
			}}
		/>
	);
};

export default FormField;

import * as yup from "yup";
import MESSAGES from "@constants/message.constant";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const loginValidation = yup.object().shape({
	email: yup
		.string()
		.email(MESSAGES.WRONG_EMAIL_FORMAT)
		.required(MESSAGES.REQUIRED_FIELD),
	password: yup.string().required(MESSAGES.REQUIRED_FIELD),
});


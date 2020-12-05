import {maxLength, minLength, regex, required} from "react-admin";

export const passwordRule = [required(), minLength(6), maxLength(32), regex(/^[0-9a-zA-Z-.]+$/)];
export const userRules = {
    username: passwordRule,
    password: passwordRule
}

export default userRules;

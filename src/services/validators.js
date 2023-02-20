/* eslint-disable import/prefer-default-export */

export function validateEmail(value) {
    return /^[^@]+@[^@]+$/.test(value);
}

export function validatePhone(str) {
    const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    return vnf_regex.test(str);
}


export function validateUsername(username) {

    console.log(username)

    const isEmail = validateEmail(username);
    const isPhone = validatePhone(username);

    return isEmail || isPhone ? true : false;
}
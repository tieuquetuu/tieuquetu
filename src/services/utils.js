// application
import randomstring from "randomstring";
import moment from 'moment';
import 'moment/locale/vi';
import {
    format as formatUrl,
    parse as parseUrl
} from "url";
moment.locale('vi');

export function baseUrl(url) {
    if (/^\/([^/]|$)/.test(url)) {

        if (process.env.BASE_PATH) {
            return `${process.env.BASE_PATH}${url}`;
        }

        /*return `https://drinkocany.com${url}`;*/
    }

    return url;
}

export function browserBaseUrl(url) {
    if (isBrowser()) {
        return `${window.location.origin}${url}`
    }
    return url
}

export function getCategoryPath(category) {
    return category ? [...getCategoryPath(category.parent), category] : [];
}

export function getCategoryParents(category) {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : [];
}

export function isArrayOfStrings(value) {
    if (!Array.isArray(value)) {
        return false;
    }

    return !value.map((x) => typeof x !== 'string').includes(true);
}

export function isArrayOfNumbers(value) {
    if (!Array.isArray(value)) {
        return false;
    }

    return !value.map((x) => typeof x !== 'number').includes(true);
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

export function getRandomString(length = 10) {
    return randomstring.generate(length);
}

export function normalizeHref(href) {
    const result = {
        ...(parseUrl(typeof href === 'string' ? href : formatUrl(href), true)),
    };

    delete result.host;
    delete result.href;
    delete result.path;
    delete result.search;

    result.query = result.query || {};

    return result;
}

export function normalizeLinkHref(data) {
    const result = typeof data === 'string' ? { href: data } : data;

    return {
        ...result,
        href: normalizeHref(result.href),
        as: normalizeHref(result.as || result.href),
    };
}

export function momentDatetime({ date, format }) {
    return moment(date).format(format);
}

export function isBrowser() {
    const flag = typeof window !== 'undefined';
    return flag;
}


export function delayResponse(input, time = 500) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    }).then(() => (input instanceof Promise ? input : input()));
}
// application
import { baseUrl } from '@/services/utils';
// import { ILanguage } from '@/interfaces/language';
// data
import dataShopLanguages, { dataShopDefaultLocale } from '@/data/shopLanguages';

export function getDefaultLocale() {
    return dataShopDefaultLocale;
}

export function getAllLanguages() {
    return dataShopLanguages;
}

export function getDefaultLanguage() {
    const language = getAllLanguages().find((language) => language.locale === getDefaultLocale());

    if (!language) {
        throw new Error('Default language not found.');
    }

    return language;
}

export function getLanguageByPath(path) {
    return getAllLanguages().find((language) => {
        const rg = new RegExp(`^\\/${language.locale}(\\/|$)`);

        return rg.test(path);
    }) || null;
}

export function getLanguageByLocale(locale) {
    return getAllLanguages().find((language) => language.locale === locale) || null;
}

async function loadTranslation(locale) {
    if (process.browser) {
        return fetch(baseUrl(`/i18n/${locale}.json`)).then((response) => response.json());
    }

    return (await import(`../../../public/i18n/${locale}.json`)).default;
}

export async function loadMessages(locale) {
    const baseMessages = locale === getDefaultLocale()
        ? Promise.resolve({})
        : loadTranslation(getDefaultLocale());
    const mainMessages = loadTranslation(locale);

    return { ...await baseMessages, ...await mainMessages };
}

export function removePrefix(path) {
    const languages = getAllLanguages();

    for (let i = 0; i < languages.length; i += 1) {
        const language = languages[i];
        const rg = new RegExp(`^\\/${language.locale}(\\/|$)`);

        if (rg.test(path)) {
            return path.substr(language.locale.length + 1);
        }
    }

    return path;
}

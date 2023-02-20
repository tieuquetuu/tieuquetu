// react
import { useContext, useMemo } from 'react';
// application
import { getAllLanguages } from '@/services/i18n/utils';
import { LanguageLocaleContext, LanguageSetLocaleContext } from '@/services/i18n/context';

export function useLocale() {
    return useContext(LanguageLocaleContext);
}

export function useSetLocale() {
    return useContext(LanguageSetLocaleContext);
}

export function useLanguage() {
    const locale = useLocale();

    return useMemo(() => getAllLanguages().find((language) => language.locale === locale), [locale]);
}

export function useDirection() {
    const { direction } = useLanguage();

    return direction;
}

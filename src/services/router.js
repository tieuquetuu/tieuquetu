/* eslint-disable import/prefer-default-export */

// react
import { useMemo } from 'react';
// third-party
import { NextRouter, useRouter } from 'next/router';
import { UrlObject } from 'url';
// application
import { getDefaultLocale } from '@/services/i18n/utils';
import { normalizeHref, normalizeLinkHref } from '@/services/utils';
import { useLocale } from '@/services/i18n/hooks';


export function hrefToRouterArgs(linkHref) {
    const { href, as, shallow } = normalizeLinkHref(linkHref);

    return [href, as, { shallow }];
}

function normalizeRouterArgs(args, locale) {
    const [url, as, options] = args;
    const normalizedUrl = normalizeHref(url);
    const normalizedAs = normalizeHref(as || url);

    normalizedUrl.query = {
        ...normalizedUrl.query,
    };

    normalizedAs.pathname = locale === getDefaultLocale()
        ? normalizedAs.pathname
        : `/${locale}${normalizedAs.pathname}`;

    return [normalizedUrl, normalizedAs, options];
}

export function useOriginalRouter() {
    return useRouter();
}

export function useAppRouter() {
    const original = useRouter();
    const locale = useLocale();
    const mimic = useMemo(() => ({
        push(...args) {
            return original.push(
                ...normalizeRouterArgs(args, locale),
            );
        },
        replace(...args) {
            return original.replace(
                ...normalizeRouterArgs(args, locale),
            );
        },
    }), [original, locale]);

    return useMemo(() => Object.setPrototypeOf(mimic, original), [mimic, original]);
}

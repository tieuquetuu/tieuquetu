// react
import React, { PropsWithChildren } from 'react';
// third-party
import { IntlShape, useIntl } from 'react-intl';

let intlRef = null;

export function globalIntl() {
    return intlRef;
}

function GlobalIntlProvider(props) {
    const intl = useIntl();
    const { children } = props;

    intlRef = intl;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default GlobalIntlProvider;

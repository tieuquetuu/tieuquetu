import React, { Fragment } from 'react'
import {AppBar, Toolbar, Typography} from "@mui/material";

function Layout(props) {

    const {
        children,
        ...otherProps
    } = props;

    return(<Fragment>
        {/* Header */}
        <AppBar>
            <Toolbar>
                <Typography variant={'h1'} component={'span'}>
                    Logo
                </Typography>
            </Toolbar>
        </AppBar>

    </Fragment>)
}

export default Layout;
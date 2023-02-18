import React, { Fragment } from 'react'
import {AppBar, Toolbar, Typography} from "@mui/material";

function Layout(props) {

    const {
        children,
        ...otherProps
    } = props;

    return(<Fragment>
        {/* Header */}
        <AppBar color={'primary'}>
            <Toolbar>
                <Typography variant={'h6'} component={'span'}>
                    Logo
                </Typography>
            </Toolbar>
        </AppBar>

    </Fragment>)
}

export default Layout;
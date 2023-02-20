import React, { Fragment } from 'react'
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

function Layout(props) {

    const {
        children,
        ...otherProps
    } = props;

    const { data: session } = useSession()

    return(<Fragment>
        {/* Header */}
        {/*<AppBar color={'primary'}>
            <Toolbar>
                <Typography variant={'h6'} component={'span'}>
                    Logo
                </Typography>
            </Toolbar>
        </AppBar>*/}
    </Fragment>)
}

export default Layout;
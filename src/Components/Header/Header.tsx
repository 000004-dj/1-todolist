import React, {memo} from "react";
import {AppBar, Toolbar, IconButton, Typography, Button} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export const Header = memo(() => {
    return (

        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    TRELLO
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

    )
})
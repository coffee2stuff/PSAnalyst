import React from 'react';

import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';

export class MainNavigationComponent extends React.Component<any, any> {
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            PSAnalyst: Personality Analyst (Beta)
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { HomePage, LoginPage } from './ui/pages';

import history from './utils/history';
import { ROUTE_HOME, ROUTE_LOGIN } from './utils';

export class App extends React.Component<any, any> {
    render() {
        return (
            <MuiThemeProvider theme={this.generateTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={ROUTE_HOME} component={HomePage} />
                        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }

    private generateTheme = () =>
        createMuiTheme({
            palette: {
                primary: {
                    main: '#094074'
                }
            }
        });
}

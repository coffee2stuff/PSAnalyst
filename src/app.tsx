import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { HomePage, LoginPage, SignUpPage } from './ui/pages';

import history from './utils/history';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_SIGN_UP } from './utils';

export class App extends React.Component<any, any> {
    render() {
        return (
            <MuiThemeProvider theme={this.generateTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={ROUTE_HOME} component={HomePage} />
                        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
                        <Route exact path={ROUTE_SIGN_UP} component={SignUpPage} />
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
                },
                background: {
                    default: '#ffffff'
                }
            }
        });
}

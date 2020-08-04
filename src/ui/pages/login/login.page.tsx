import React from 'react';
import './login.page.css';

import { Button, Grid, TextField } from '@material-ui/core';

import { FirebaseRepo } from '../../../firebase';
import { ROUTE_HOME } from '../../../utils';

interface LoginPageProps {
    history: any;
}

interface LoginPageState {
    email: string;
    password: string;
}

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    private readonly repository = new FirebaseRepo();

    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={(event) => this.handleTextFieldChange('email', event)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={(event) => this.handleTextFieldChange('password', event)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="login-page-button"
                            onClick={this.handleLogin}
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private handleTextFieldChange(field: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (field === 'email') {
            this.setState({ email: event.target.value });
        } else if (field === 'password') {
            this.setState({ password: event.target.value });
        } else {
            return;
        }
    }

    private async handleLogin() {
        const result = await this.repository.performLogin(this.state.email, this.state.password);
        result ? this.props.history.push(ROUTE_HOME) : alert('Authentication error');
    }
}

import React from 'react';
import './sign-up.page.css';

import { Grid, TextField, Button } from '@material-ui/core';

import { FirebaseRepo } from '../../firebase';
import { ROUTE_HOME } from '../../utils';

interface SignUpPageProps {
    history: any;
}

interface SignUpPageState {
    displayName: string;
    email: string;
    password: string;
}

export class SignUpPage extends React.Component<SignUpPageProps, SignUpPageState> {
    private readonly repository = new FirebaseRepo();

    constructor(props: SignUpPageProps) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: ''
        };

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    render() {
        return (
            <div>
                <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={3}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            required
                            fullWidth
                            id="username"
                            label="Display name"
                            value={this.state.displayName}
                            onChange={(event) => this.handleTextFieldChange('username', event)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            onClick={this.handleSignUp}
                        >
                            Create account
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private handleTextFieldChange(field: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const eventValue: string = event.target.value;
        switch (field) {
            case 'username': {
                this.setState({ displayName: eventValue });
                break;
            }
            case 'email': {
                this.setState({ email: eventValue });
                break;
            }
            case 'password': {
                this.setState({ password: eventValue });
                break;
            }
            default: {
                break;
            }
        }
    }

    private async handleSignUp() {
        const result: boolean = await this.repository.createNewAccount(
            this.state.displayName,
            this.state.email,
            this.state.password
        );
        result ? this.props.history.push(ROUTE_HOME) : alert('Sign up error');
    }
}

import React from 'react';
import './home.page.css';
import { retrieveFromLocalStorage, ACCESS_TOKEN, ROUTE_LOGIN } from '../../../utils';
import { MainNavigationComponent, MenuListComponent } from '../../components';
import { Grid } from '@material-ui/core';

interface HomePageProps {
    history: any;
}

export class HomePage extends React.Component<HomePageProps, any> {
    constructor(props: HomePageProps) {
        super(props);
        if (retrieveFromLocalStorage(ACCESS_TOKEN) === null) {
            this.props.history.push(ROUTE_LOGIN);
        }
    }

    render() {
        return (
            <div>
                <MainNavigationComponent />
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                    justify="center"
                    style={{ minHeight: '100vh', paddingTop: '80px' }}
                >
                    <Grid item xs={3}>
                        <MenuListComponent />
                    </Grid>
                    <Grid item xs={9}>
                        <div>bruh...</div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

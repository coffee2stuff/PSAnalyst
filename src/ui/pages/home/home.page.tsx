import React from 'react';
import './home.page.css';
import { retrieveFromLocalStorage, ACCESS_TOKEN, ROUTE_LOGIN } from '../../../utils';
import { MainNavigationComponent } from '../../components';

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
            </div>
        );
    }
}

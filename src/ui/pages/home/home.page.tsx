import React from 'react';
import './home.page.css';
import { retrieveFromLocalStorage, ACCESS_TOKEN, ROUTE_LOGIN } from '../../../utils';
import { MainNavigationComponent, MenuListComponent } from '../../components';
import { Grid, Stepper, Step, StepLabel } from '@material-ui/core';

interface HomePageProps {
    history: any;
}

interface HomePageState {
    activeStepIndex: number;
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
    private readonly steps: Array<string> = [
        'Upload text for personality analysis',
        'Await results',
        'Store results via one of the export methods'
    ];

    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            activeStepIndex: 0
        };

        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleBackStep = this.handleBackStep.bind(this);

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
                        <div style={{ marginRight: '24px' }}>
                            <Stepper activeStep={this.state.activeStepIndex} alternativeLabel>
                                {this.steps.map((label: string, index: number) => {
                                    return (
                                        <Step key={index}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private handleNextStep = (currentIndex: number) => this.setState({ activeStepIndex: currentIndex + 1 });
    private handleBackStep = (currentIndex: number) => this.setState({ activeStepIndex: currentIndex - 1 });
}

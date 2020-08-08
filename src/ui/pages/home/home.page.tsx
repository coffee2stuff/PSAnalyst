import React from 'react';
import './home.page.css';
import { retrieveFromLocalStorage, ACCESS_TOKEN, ROUTE_LOGIN } from '../../../utils';
import { MainNavigationComponent, MenuListComponent } from '../../components';
import { Grid, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core';

interface HomePageProps {
    history: any;
}

interface HomePageState {
    activeStepIndex: number;
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
    private readonly steps: Array<string> = [
        'Upload text for personality analysis',
        'Verifying your file before processing starts',
        'Performing personality analysis',
        'View and export results'
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
                            <Typography variant="h4" style={{ marginTop: '24px' }}>
                                Welcome!
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '12px' }}>
                                Welcome to <em>PSAnalyst</em>, a personality analysis tool that enables you to gain
                                personality insights into your writing using IBM Watson, a state-of-the-art collection
                                of AI tools ranging from image recognition, speech-to-text, to natural language
                                processing.
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '8px' }}>
                                Upload a text file below, which will be sent for processing. Currently, the only file
                                format that's acceptable is plain TXT, so please make sure you're uploading proper file
                                type beforehand.
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '8px' }}>
                                The application is in beta.
                            </Typography>
                            <Typography variant="h5" style={{ marginTop: '24px' }}>
                                How to use it
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '8px' }}>
                                A meaningful personality profile can be created only where sufficient data of suitable
                                quantity and quality is provided. Because language use varies naturally from document to
                                document and from time to time, a small sample of text might not be representative of an
                                individual's overall language patterns. You are limited with 20 MB of input content.
                                Typically, the best results come at around 3000 words of input, and more content does
                                not contribute to the accuracy of the profile. Ideally you would therefore want to send
                                a sample text, such as your motivational letter, or any sort of a document indicative of
                                your personal writing style, for further analysis.
                            </Typography>
                            <Typography variant="h5" style={{ marginTop: '24px' }}>
                                File upload
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '12px' }}>
                                Upload file by clicking the button below. Before the analysis begins, your document will
                                be checked locally for appropriate size, number of words, etc.
                            </Typography>
                            <Button style={{ marginTop: '24px', background: '#094074' }}>
                                <span style={{ color: '#ffffff' }}>Upload file</span>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private handleNextStep = (currentIndex: number) => this.setState({ activeStepIndex: currentIndex + 1 });
    private handleBackStep = (currentIndex: number) => this.setState({ activeStepIndex: currentIndex - 1 });
}

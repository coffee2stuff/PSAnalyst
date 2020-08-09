import React, { ChangeEvent } from 'react';
import './home.page.css';
import { retrieveFromLocalStorage, ACCESS_TOKEN, ROUTE_LOGIN, Pair } from '../../../utils';
import { MainNavigationComponent, MenuListComponent } from '../../components';
import { Grid, Stepper, Step, StepLabel, Typography, Button, CircularProgress } from '@material-ui/core';
import { FirebaseRepo } from '../../../firebase/repositories';
import { FileModel } from '../../../firebase/models';
import { ProfileModel } from '../../../api/models';
import { IBMInsightsLite } from '../../../api';

interface HomePageProps {
    history: any;
}

interface HomePageState {
    activeStepIndex: number;
    file: FileModel;
    isAnalysisComplete: boolean;
    analysisResults: ProfileModel | null;
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
    private repository = new FirebaseRepo();

    private readonly steps: Array<string> = [
        'Upload text for personality analysis',
        'Performing personality analysis',
        'View and export results'
    ];

    constructor(props: HomePageProps) {
        super(props);
        this.state = {
            activeStepIndex: 0,
            file: { userID: '', fileName: '', size: 0, isAdequateForAnalysis: false, contents: '' },
            isAnalysisComplete: false,
            analysisResults: null
        };

        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleBackStep = this.handleBackStep.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

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
                            <div style={{ marginTop: '24px' }}>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="text/plain"
                                    style={{ display: 'none' }}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleFileUpload(event)}
                                />
                                <label htmlFor="file-upload">
                                    <Button style={{ background: '#094074', color: '#ffffff' }} component="span">
                                        Upload file
                                    </Button>
                                </label>
                            </div>
                            {this.state.activeStepIndex === 1 ? (
                                <div>
                                    <div style={{ margin: '24px 0 16px 0' }}>
                                        <CircularProgress />
                                    </div>
                                    <span>
                                        Uploading file {this.state.file.fileName}, size (in bytes){' '}
                                        {this.state.file.size}, which{' '}
                                        {this.state.file.isAdequateForAnalysis
                                            ? `will most likely produce good results (number of words: ${
                                                  this.state.file.contents.split(' ').length
                                              })`
                                            : 'might not be able to produce sufficient memory profile (due to short length)'}
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private readonly handleNextStep = (currentIndex: number) => this.setState({ activeStepIndex: currentIndex + 1 });
    private handleBackStep = (currentIndex: number) => this.setState({ activeStepIndex: currentIndex - 1 });

    private readonly handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        if (files !== null) {
            const selectedFile: File = files[0];
            const selectedFileContents: string = await selectedFile.text();
            const file: FileModel = {
                userID: retrieveFromLocalStorage(ACCESS_TOKEN) ?? '',
                fileName: selectedFile.name,
                size: selectedFile.size,
                isAdequateForAnalysis: this.analyzeFileContents(selectedFileContents),
                contents: selectedFileContents
            };
            this.setState({ file: file });
            const documentID: string | undefined = await this.repository.uploadFileForProcessing(file);
            if (documentID !== undefined) {
                this.handleNextStep(this.state.activeStepIndex);
            }
            await this.createRequest();
            this.handleNextStep(this.state.activeStepIndex);
        }
    };

    private async createRequest() {
        const credentials: Pair<string, string> = this.repository.retrieveIBMCredentials();
        const insights = new IBMInsightsLite(credentials.getFirst(), credentials.getSecond());
        const results = await insights.createRequest(this.state.file.contents);
        console.log(results);
        this.setState({
            isAnalysisComplete: true,
            analysisResults: results
        });
    }

    private analyzeFileContents = (fileContents: string): boolean => {
        const length: number = fileContents.split(' ').length;
        return length >= 1200 && length <= 3000;
    };
}

import * as axios from 'axios';
import { ProfileModel } from './models';

export class IBMInsightsLite {
    private readonly version: string = '2017-10-13';

    private readonly baseURL: string;
    private readonly apiKey: string;
    private readonly requestURL: string;

    constructor(base: string, key: string) {
        this.baseURL = base;
        this.apiKey = key;
        this.requestURL = this.constructURL();
    }

    async createRequest(contents: string): Promise<ProfileModel> {
        return (
            await axios.default.post<ProfileModel>(this.requestURL, contents, {
                auth: {
                    username: 'apikey',
                    password: this.apiKey
                },
                responseType: 'json',
                headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*'
                }
            })
        ).data;
    }

    private constructURL(): string {
        return this.baseURL + `/v3/profile?version=${this.version}`;
    }
}

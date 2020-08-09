import { FirebaseProvider } from '../providers';
import { persistLocalStorage, ACCESS_TOKEN, Pair } from '../../utils';
import { FileModel } from '../models';

interface IFirebaseRepo {
    performLogin(email: string, password: string): Promise<boolean>;
    createNewAccount(displayName: string, email: string, password: string): Promise<boolean>;
}

export class FirebaseRepo implements IFirebaseRepo {
    private provider = FirebaseProvider.getInstance();

    async performLogin(email: string, password: string): Promise<boolean> {
        if (this.emailValidation(email) && password.length >= 8) {
            const userID: string | undefined = await this.provider.loginWithEmailAndPassword(email, password);
            if (userID !== undefined) {
                this.persistAccessToken(userID);
                return true;
            }
            return false;
        }
        return false;
    }

    async createNewAccount(displayName: string, email: string, password: string): Promise<boolean> {
        if (this.emailValidation(email) && this.isNotEmpty(displayName) && password.length >= 8) {
            const userID: string | undefined = await this.provider.signUpWithEmailAndPassword(
                displayName,
                email,
                password
            );
            if (userID !== undefined) {
                this.persistAccessToken(userID);
                return true;
            }
            return false;
        }
        return false;
    }

    async uploadFileForProcessing(file: FileModel) {
        return await this.provider.createDocumentRoot(file.userID, file);
    }

    retrieveIBMCredentials(): Pair<string, string> {
        return new Pair<string, string>(
            this.provider.fetchRemoteConfigParameter('ibm_base_url'),
            this.provider.fetchRemoteConfigParameter('ibm_access_token')
        );
    }

    private persistAccessToken = (token: string) => {
        persistLocalStorage(ACCESS_TOKEN, token);
    };

    private emailValidation = (email: string): boolean => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    };

    private isNotEmpty = (input: string): boolean => input.length > 0;
}

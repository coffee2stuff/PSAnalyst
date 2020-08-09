import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/remote-config';

import { firebaseConfig } from '../../utils';

export class FirebaseProvider {
    private static instance: FirebaseProvider;

    static getInstance(): FirebaseProvider {
        if (!FirebaseProvider.instance) {
            FirebaseProvider.instance = new FirebaseProvider();
        }
        return FirebaseProvider.instance;
    }

    private readonly app: firebase.app.App;
    private readonly auth: firebase.auth.Auth;
    private readonly firestore: firebase.firestore.Firestore;
    private readonly remoteConfig: firebase.remoteConfig.RemoteConfig;
    private readonly fetchTimeout: number = 3600000;

    private constructor() {
        this.app = firebase.initializeApp(firebaseConfig);
        this.auth = this.app.auth();
        this.firestore = this.app.firestore();
        this.remoteConfig = this.app.remoteConfig();
        this.remoteConfig.settings = {
            fetchTimeoutMillis: Math.floor(1.5 * this.fetchTimeout),
            minimumFetchIntervalMillis: this.fetchTimeout
        };
        this.remoteConfig.fetchAndActivate().then(() => console.log('Remote Config active'));
    }

    async loginWithEmailAndPassword(email: string, password: string): Promise<string | undefined> {
        try {
            const user = await this.auth.signInWithEmailAndPassword(email, password);
            return user.user?.uid;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async signUpWithEmailAndPassword(
        displayName: string,
        email: string,
        password: string
    ): Promise<string | undefined> {
        try {
            const user = await this.auth.createUserWithEmailAndPassword(email, password);
            await user.user?.updateProfile({ displayName: displayName });
            return user.user?.uid;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async createDocumentRoot<T>(collection: string, document: T): Promise<string | undefined> {
        try {
            const docReference = await this.firestore.collection(collection).add(document);
            return docReference.id;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    fetchRemoteConfigParameter(key: string): string {
        return this.remoteConfig.getString(key);
    }
}

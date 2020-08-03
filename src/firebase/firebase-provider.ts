import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../utils';

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

    private constructor() {
        this.app = firebase.initializeApp(firebaseConfig);
        this.auth = this.app.auth();
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
}

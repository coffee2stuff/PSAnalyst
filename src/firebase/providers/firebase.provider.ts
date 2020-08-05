import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig, Pair } from '../../utils';
import { CurrentUserModel } from '../models';

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

    private constructor() {
        this.app = firebase.initializeApp(firebaseConfig);
        this.auth = this.app.auth();
        this.firestore = this.app.firestore();
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

    returnCurrentUser(): CurrentUserModel {
        const user: firebase.User | null = this.auth.currentUser;
        const displayName: string | null = user !== null ? user.displayName : '';
        const email: string | null = user !== null ? user.email : '';
        return {
            displayName: displayName !== null ? displayName : '',
            email: email !== null ? email : ''
        };
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

    async getDocumentById<T>(collectionDocumentPair: Pair<string, string>): Promise<T | undefined> {
        try {
            const docRef = await this.firestore
                .collection(collectionDocumentPair.getFirst())
                .doc(collectionDocumentPair.getSecond())
                .get();
            return docRef.exists ? (docRef.data() as T) : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getDocumentsRoot<T>(collection: string): Promise<Array<T> | undefined> {
        try {
            const docRef = await this.firestore.collection(collection).get();
            return !docRef.empty ? docRef.docs.map((doc) => doc.data() as T) : undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async updateDocumentRoot<T>(collectionDocumentPair: Pair<string, string>, document: T): Promise<void> {
        try {
            await this.firestore
                .collection(collectionDocumentPair.getFirst())
                .doc(collectionDocumentPair.getSecond())
                .update(document);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteDocumentRoot(collectionDocumentPair: Pair<string, string>): Promise<void> {
        try {
            await this.firestore
                .collection(collectionDocumentPair.getFirst())
                .doc(collectionDocumentPair.getSecond())
                .delete();
        } catch (error) {
            console.log(error);
        }
    }
}

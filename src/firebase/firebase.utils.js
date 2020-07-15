import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyA6OHHTCU3fr8ZW7tVbRz_IddoPoUwzFbo",
    authDomain: "crwn-db-16b8f.firebaseapp.com",
    databaseURL: "https://crwn-db-16b8f.firebaseio.com",
    projectId: "crwn-db-16b8f",
    storageBucket: "crwn-db-16b8f.appspot.com",
    messagingSenderId: "711129510570",
    appId: "1:711129510570:web:bf1b120595a14a831296d3",
    measurementId: "G-KE6TQ712XF",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

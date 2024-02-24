import { onAuthStateChanged } from "firebase/auth";



export default function useruid(auth) {
    return new Promise((resolve) => {
        // Check if a user is signed in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                console.log(uid);
                resolve(uid);
            } else {
                // No user is signed in
                resolve("not signed");
            }
        });
    });
}
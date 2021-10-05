import { firebaseConfig } from "services/PokeDb";
const apiKey = firebaseConfig.apiKey;

class AuthApi {

    signUpIn = async ({ isSignUp, email, password }) => {
        const url = isSignUp ?
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}` :
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        const res = await (await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
        })).json();

        if (res.error) {
            throw new Error(res.error?.message ?? "Unknown error: response error doesn't contain message field");
        } else {
            const { idToken, localId, email, email:username } = res;
            if (!idToken) throw Error(`${isSignUp ? "signup" : "signin"} query didn't return idToken`)
            
            return {
                idToken,
                localId,
                email,
                username
            };
        }
    }

    getUser = async ({ idToken }) => {
        const res = await (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idToken
            })
        })).json()

        if (res.error) {
            throw new Error(res.error?.message ?? "WRONG_RESPONSE: user query response didn't provide error.message");
        } else {
            const { localId, email: username, email, createdAt } = res.users[0];

            if (!localId) throw new Error("WRONG_RESPONSE: user query response didn't provide user's localId");

            return {
                localId,
                username,
                email,
                createdAt: parseInt(createdAt)
            };
        }
    }
}

const authApi = new AuthApi();
export default authApi;

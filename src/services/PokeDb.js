import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fetchJSON } from "./fetchTools";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCd83qPtS90EbdQFQocu2fZ2olhjMI8K_w",
  authDomain: "zaratustrah-thegame.firebaseapp.com",
  databaseURL: "https://zaratustrah-thegame-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zaratustrah-thegame",
  storageBucket: "zaratustrah-thegame.appspot.com",
  messagingSenderId: "1004634499057",
  appId: "1:1004634499057:web:a8e568b2b88c4855e10650"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const dbPokemonsPath = "pokemons";

class PokeDb {

  constructor({ userLocalId, userIdToken }) {
    this.db = app.database();
    this._userLocalId = userLocalId;
    this._userIdToken = userIdToken;
  }

  chekRESTApiErr(res) {
    if (!res) return;
    if (res.error) {
      throw new Error(res.error);
    }
  }


  getPokemonOnce = async () => {
    //return await this.db.ref(dbPokemonsPath).once("value").then((snapshot) => snapshot.val());
    const res = await fetchJSON(`${firebaseConfig.databaseURL}/${this._userLocalId}/${dbPokemonsPath}.json?auth=${this._userIdToken}`);
    this.chekRESTApiErr(res);
    return res;
  }

  onPokemonSocket = (onLoad) => {
    this.db.ref(dbPokemonsPath).on("value", (snapshot) => { onLoad(snapshot.val()) });
  }

  offPokemonSocket = () => {
    this.db.ref(dbPokemonsPath).off();
  }

  prepBeforeSave(pokemon) {
    const data = { ...pokemon };
    delete data.selected;
    return data;
  }


  addPokemon = async (pokemon) => {
    const res = await fetchJSON(`${firebaseConfig.databaseURL}/${this._userLocalId}/${dbPokemonsPath}.json?auth=${this._userIdToken}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemon)
    });
    this.chekRESTApiErr(res);

    return res;
  }
}

export default PokeDb;

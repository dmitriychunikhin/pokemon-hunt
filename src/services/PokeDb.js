import firebase from "firebase/compat/app";
import "firebase/compat/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
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

  constructor() {
    this.db = app.database();
  }

  getPokemonOnce = async () => {
    return await this.db.ref(dbPokemonsPath).once("value").then((snapshot) => snapshot.val());
  }

  getPokemonSocket = (onLoad) => {
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

  postPokemon = async (uid, pokemon) => {
    const data = this.prepBeforeSave(pokemon);
    await this.db.ref(`${dbPokemonsPath}/${uid}`).set(data);
  }

  postPokemonBulk = async (pokemons) => {

    const data = Object.entries(pokemons).reduce((acc, [uid, pok]) => {
      acc[uid] = this.prepBeforeSave(pok);
      return acc;
    }, {});

    await this.db.ref(`${dbPokemonsPath}`).set(data);
  }


  addPokemon = async (pokemon) => {
    const key = this.db.ref().child(dbPokemonsPath).push().key;
    await this.db.ref(`${dbPokemonsPath}/${key}`).set(pokemon);
  }
}


export default PokeDb;


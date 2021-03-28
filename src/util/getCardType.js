import firebase from 'firebase/app';
import 'firebase/storage'
import 'axios'
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyCybxn6L5skhY1tlwatXqeFQpQtaiCDyaY",
    authDomain: "cryptoz-nfts.firebaseapp.com",
    projectId: "cryptoz-nfts",
    storageBucket: "cryptoz-nfts.appspot.com",
    messagingSenderId: "10817006083",
    appId: "1:10817006083:web:b785e46a76800de4747c36"
};

const app = firebase.initializeApp(firebaseConfig)
const storage = app.storage()
const bucketRef = storage.refFromURL('gs://cryptoz-nfts.appspot.com')

const getCardType = async (cardId) => {
    // const cardType = await import("../card_types/" + cardId + ".json")

    // return {
    //     ...cardType.default
    // }
    const downloadUrl = await bucketRef.child(`${cardId}.json`).getDownloadURL()
    const result = await axios.get(downloadUrl)
    return result.data
}

export default getCardType
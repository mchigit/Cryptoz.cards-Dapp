import firebase from 'firebase/app';
import 'firebase/storage'
import 'axios'
import axios from 'axios';

const cardTypeBaseUrl = `https://cryptoz.cards/services/card_types`

const getCardType = async (cardId) => {
    const result = await axios.get(`${cardTypeBaseUrl}/${cardId}.json`);
    
    return result.data
}

export default getCardType
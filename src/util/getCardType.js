const getCardType = async (cardId) => {
  try {
    const response = await fetch(`https://zoombies.world/services/card_types/${cardId}.json`);
    const cardType = await response.json()
    return cardType
  } catch (err) {
    console.error(err);
  }
};

export default getCardType;

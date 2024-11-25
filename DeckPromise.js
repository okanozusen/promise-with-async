const favoriteNumber = 7;
async function getFavoriteNumberFact() {
  const response = await fetch(`http://numbersapi.com/${favoriteNumber}?json`);
  const data = await response.json();
  console.log(data.text);
  document.body.innerHTML += `<p>${data.text}</p>`;
}
getFavoriteNumberFact();

const numbers = [3, 5, 10];
async function getMultipleNumberFacts() {
  const response = await fetch(`http://numbersapi.com/${numbers.join(",")}?json`);
  const data = await response.json();
  for (let num in data) {
    console.log(data[num]);
    document.body.innerHTML += `<p>${data[num]}</p>`;
  }
}
getMultipleNumberFacts();

async function getFourFacts() {
  const promises = [
    fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json()),
    fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json()),
    fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json()),
    fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json())
  ];
  const facts = await Promise.all(promises);
  facts.forEach(fact => {
    console.log(fact.text);
    document.body.innerHTML += `<p>${fact.text}</p>`;
  });
}
getFourFacts();

async function drawSingleCard() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
  const data = await response.json();
  const card = data.cards[0];
  console.log(`${card.value} of ${card.suit}`);
}
drawSingleCard();

async function drawTwoCards() {
  const deckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const deck = await deckResponse.json();
  const deckId = deck.deck_id;

  const card1Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const card1Data = await card1Response.json();
  const card1 = card1Data.cards[0];
  console.log(`${card1.value} of ${card1.suit}`);

  const card2Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const card2Data = await card2Response.json();
  const card2 = card2Data.cards[0];
  console.log(`${card2.value} of ${card2.suit}`);
}
drawTwoCards();

async function setupCardDrawing() {
  const deckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const deck = await deckResponse.json();
  const deckId = deck.deck_id;

  document.body.innerHTML += '<button id="draw-card">Draw a Card</button>';
  document.body.innerHTML += '<div id="cards"></div>';

  document.getElementById('draw-card').addEventListener('click', async () => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();

    if (data.cards.length === 0) {
      alert('No more cards in the deck!');
      return;
    }

    const card = data.cards[0];
    const cardHtml = `<p>${card.value} of ${card.suit}</p><img src="${card.image}" alt="${card.value} of ${card.suit}">`;
    document.getElementById('cards').innerHTML += cardHtml;
  });
}
setupCardDrawing();

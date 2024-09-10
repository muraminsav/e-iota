/* eslint-disable no-irregular-whitespace */
// useEffect(() => {
//   fetch('http://localhost:3000', {
//     method: 'GET',
//     mode: 'cors',
//   })
//     .then((x) => x.json())
//     .then((data) => setMessage(data.data))
//     .then(() => console.log(message))
//     .catch((e) => console.log(e));
// });

//   _cap_difficulty: "easy"
// ​
// _cap_gameHasStartedCode: "IVNB"
// ​
// _cap_mode: "original"
// ​
// _cap_pencils: '{"gameCode":"IVNB","pencilMarks":{"46":[5,8]}}'
// ​
// _cap_playerName: "dd"
// ​
// _cap_recentGameCode: "IVNB"
// ​
// "_cap_settings__colors-disabled": "true"
// ​
// "_cap_settings__dark-mode": "true"
// ​
// "_cap_settings__notifications-enabled-v2": "false"

// ​
// _cap_visibility: "private"
// ​
// _capuid: "2259e8b6-1599-46a4-a51c-dbec0e63e029"
// ​
// length: 13
// ​
// "usdoku:pen": "f07717b1-12d5-4dd1-9e6d-708c704b7865-0824"
// ​
// "usdoku:shield": "1:589b09cacf65440fb760ada82e44f53f"

const Player = {
  name: 'str',
  isMyTurn: true,
  socketID: 'str',
  score: 0,
  hand: [Card, Card, Card],
  playedCards: [Card],
};
const Card = {
  id: 'id',
  inHand: true,
  coordinate: [null, null],
  face: { color: 'blue', shape: 'square', value: 4 },
  neighbors: { right: null, left: null, top: null, bottom: null },
};
const Game = {
  players: [Player, Player],
  gameId: 'str',
  deck: [],
  grig: {
    onTable: [
      [[false][true][false]],
      [[true][Card][true]],
      [[false][true][false]],
    ],
  },
};
const session = {
  isPublic: true,
  roomId: 'str',
  players: [Player],
  gameState: Game,
};
session;

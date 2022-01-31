'use strict';

const socketio = require('socket.io-client');
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:';

// const wurd = socketio.connect(`${URL}${PORT}/wurd`);
const wurd = socketio.connect(`https://wurdgame.herokuapp.com/wurd`);


const uuid = require('uuid').v4;
const randomWords = require('random-words');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let idGen = uuid();
let userName = randomWords();

console.log('Generated ID is: ' + idGen);
console.log('Generated userName is: ' + userName);


const player = {
  name: userName,
  playerId: idGen,
};

// connect client/player
wurd.on('connect', (payload) => {
  payload = player;
  console.log('PLAYER:', payload);
  wurd.emit('join', payload);
});

wurd.on('gamestatus', (status) => {
  console.log(status);
});

wurd.on('gamestart', async (payload) => {
  console.log('********* ROUND START! *********');
  getWord(payload);
});

wurd.on('playagain', payload => {
  console.log(payload);
  playagain();
});



// have player re-arrange string

function getWord(payload) {
  //take letters from payload
  let letters = payload.letters;
  readline.question(`You have 30 seconds to form these letters into the longest word you can from ${letters}\n`, answer => {
    console.log(`you entered ${answer}!`);
    console.log('Answer after readline.close(): ', answer);
    payload.answer = answer;
    payload.userName = userName;
    console.log(payload);

    wurd.emit('submit', payload);
  });
}

function playagain() {
  readline.question(`PLAY AGAIN? Y OR N...\n`, answer => {
    if (answer.toUpperCase() === 'Y' || answer.toUpperCase() === 'YES') {
      console.log('YOU ENTERED: ', answer);
      wurd.emit('newround', player);
    } else if (answer.toUpperCase() === 'N' || answer.toUpperCase() === 'NO') {
      console.log('YOU HAVE DISCONNECTED FROM WURDGAME, GOODBYE!');
      wurd.disconnect(player);
    } else {
      console.log('NOT AN EXPECTED REPONSE: ', answer);

      playagain();
    }
  });
}
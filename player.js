'use strict';

const socketio = require('socket.io-client');
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:3000';

const wurd = socketio.connect(`${URL}${PORT}/wurd`); // might need fixin'

const uuid = require('uuid').v4;
const randomWords = require('random-words');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let idGen = uuid();
let userName = randomWords();

console.log("Generated ID is: " + idGen);
console.log("Generated userName is: " + userName);


const player = {
  name: userName,
  playerId: idGen,
};

// connect client/player
wurd.on('connection', (player) => {
  console.log(player);
  wurd.emit('playerinfo', player);
});


// have player re-arrange string

function get_word(letters) {

  readline.question(`Form these letters into the longest word you can from ${letters}`, answer => {
    console.log(`you entered ${answer}!`)
    readline.close()
  })
  return answer
}


// create and connect client and display to player
wurd.on('receivestring', (payload) => {
  console.log(payload);
});




// player re-enters strings which is accepted as an arg

const answer = getWord(payload.letters);

// arg is checked against the pool of letters
// if passes continue

if (!payload.letters.includes(answer)) {
  console.log('Stop cheating! You may only use the letters provided')
} else {
  payload.letters = answer;
  wurd.emit('player answer', payload)
}


// receive string from hub
// emit new string to hub

// payload includes new string and clientId
// emit new string to hub

// payload includes new string and clientId